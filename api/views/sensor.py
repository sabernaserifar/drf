# not sure about the right import
from api.models import Equipment, SensorReading, FileUpload, SensorFileOperation, Operation, EquipmentType
import csv
import pandas as pd
import pytz
from typing import Dict, List
from rest_framework import viewsets, status, views
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser, BaseParser, FileUploadParser
import datetime

from django.shortcuts import redirect, render, get_object_or_404



from rest_framework import permissions
from rest_framework import viewsets, status
from rest_framework.response import Response

# from api.models import SensorFile
from api.serializers import SensorReadingSerializer, SensorFileSerializer, SensorFileOperationSerializer

class CSVTextParser(BaseParser):
    """
    A CSV parser for DRF APIViews.
    Based on the RFC 4180 text/csv MIME type, but extended with
    a dialect.
    https://tools.ietf.org/html/rfc4180
    """
    media_type = 'text/csv'

    def parse(self, stream, media_type=None, parser_context=None) -> List[List]:
        """
        Return a list of lists representing the rows of a CSV file.
        """
        # return list(csv.reader(stream, dialect='excel'))

        charset = 'utf-8'
        media_type_params = dict([param.strip().split('=') for param in media_type.split(';')[1:]])
        charset = media_type_params.get('charset', 'utf-8')
        dialect = media_type_params.get('dialect', 'excel')
        txt = stream.read().decode(charset)
        csv_table = list(csv.reader(txt.splitlines(), dialect=dialect))
        return csv_table


class SensorFileOperationViewSet(viewsets.ModelViewSet):
    queryset = SensorFileOperation.objects.all()
    serializer_class = SensorFileOperationSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SensorReadingViewSet(viewsets.ModelViewSet):
    queryset = SensorReading.objects.all()
    serializer_class = SensorReadingSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = [CSVTextParser]

    def create(self, request, *args, **kwargs):

        content_type = request.content_type.split(';')[0].strip()
        encoding = 'utf-8'
        serializer = self.get_serializer(data=request.data)
        print('Got 1st serializer')
        serializer.is_valid(raise_exception=True)
        print('Got sensor file 1 validated ')
        self.perform_create(serializer)

        


        headers = self.get_success_headers(serializer.data)

        # Read the file and store in database



     
        # return Response(sensor_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class SensorFileViewSet(viewsets.ModelViewSet):
    queryset = FileUpload.objects.all()
    serializer_class = SensorFileSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser]
    

    def create(self, request, *args, **kwargs):
        print(request.FILES)
        print(request.FILES.get('file_uploaded'))
        print(request.FILES.get('Second_file'))
         
        
        file_uploaded = {'upload': request.FILES.get('file_uploaded')}
        serializer = self.get_serializer(data=file_uploaded)
        serializer.is_valid(raise_exception=True)        
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



def is_valid_queryparam(param):
    return param != '' and param is not None


def filter(request):
    qs = SensorReading.objects.all()
    sensor_labels = request.GET.getlist('sensor[]')
    date_min = request.GET.get('date_min')
    date_max = request.GET.get('date_max')

    if is_valid_queryparam(date_min):
        qs = qs.filter(time__gte=date_min)

    if is_valid_queryparam(date_max):
        qs = qs.filter(time__lt=date_max)


    results = []
    
    if is_valid_queryparam(sensor_labels): 
        for label in sensor_labels:
            sensor_id = Equipment.objects.filter(label=label).first().id
            results.append(qs.filter(sensor_id=sensor_id))
    else:
        results.append(qs)

    return results


def is_there_more_data(request):
    offset = request.GET.get('offset')
    if int(offset) > SensorReading.objects.all().count():
        return False
    return True


def infinite_filter(request):
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')
    return SensorReading.objects.all()[int(offset): int(offset) + int(limit)]


class RegisterDataViewSet(viewsets.ModelViewSet):
    queryset = SensorReading.objects.all()
    serializer_class = SensorReadingSerializer
    permissions_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser]

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True

        return super(RegisterDataViewSet, self).get_serializer(
            *args, **kwargs
        )

    def build_objects_list(self, data_file, parent_id, file_id):
        time_format = '%Y-%m-%d %H:%M:%S.%f'
        objects = []
        for i in range(len(data_file)):
            item = data_file[i]
            try:
                sensor_name = item[0].strip()
                sensor_id = Equipment.objects.filter(label=sensor_name).first().id
            except:
                return f'The sensor "{sensor_name}" at row {i+1} is not recognized.'

            try:
                timestamp = datetime.datetime.strptime(item[1].strip(), time_format).replace(
                tzinfo=datetime.timezone.utc)
            except:
                return f'The timestamp "{item[1].strip()}" at row {i+1} is not valid.'

            
            try:
                value = round(float(item[2].strip()), 4)
            except:
                return f'The value "{value}" at row {i+1} is not valid number.'
        
            objects.append({
                'operation': parent_id,
                'input_file': file_id, 
                'sensor': sensor_id,
                'time': timestamp,
                'value': value,
                'unit': 0
            })
        
        return objects

    # def _build_object(self, )



    def _build_sensor_objects(self, data, parent_id, file_id):

        df = pd.DataFrame(data[1:], columns=data[0])

        # Dataframe cleanup 

        timestamp_cols = [col for col in df.columns if 'Timestamp'.upper() in col.upper()]

        if not timestamp_cols or len(timestamp_cols) > 1:
            return f'There are {len(timestamp_cols)} columns that includes the "Timestamp" string. There should be only one.'

        df = df.set_index(timestamp_cols[0])
        timestamp = timestamp_cols[0]
        # Drop invalid values and round to 4 
        for col in df.columns:
            if not col in timestamp_cols: 
                df[col] = pd.to_numeric(df[col], errors='coerce')
        df = df.dropna().round(4)

        # data_dict = df.to_dict()
        objects = []
        undefined_sensors = []
        time_format = '%Y-%m-%d %H:%M:%S.%f'

        for col in df.columns:
            sensor_label = col.strip() 
            sensor = Equipment.objects.filter(label=sensor_label)
            # types = EquipmentType.objects.last()
            # sensor_object = Equipment.objects.create(equipment_type=types, label=sensor_label)
            if sensor:
                sensor_id = sensor.first().id
                for i in range(df.shape[0]):
                    # timestamp = df.index[i].strftime(time_format).tz_convert(pytz.timezone('UTC'))
                    objects.append({
                            'operation': parent_id,
                            'input_file': file_id, 
                            'sensor': sensor_id,
                            'time': df.index[i],
                            'value': df[col].iloc[i],
                        })
        # for col in df.columns:
        #     sensor_label = col.strip() 
        #     sensor = Equipment.objects.filter(label=sensor_label)
            
        #     if True:
        #         sensor_id = 1 #sensor.first().id
        #         sensor_objects = df[[col, timestamp]].apply(lambda x: {
        #                                 'operation': parent_id,
        #                                 'input_file': file_id, 
        #                                 'sensor': sensor_id,
        #                                 'time': x[timestamp],
        #                                 'value': sensor_id
        #                                 })

        #         objects.append(sensor_objects)


                # objects.append(.values.tolist()) 

                # for value in values:
                #     objects.append({
                #         'operation': parent_id,
                #         'input_file': file_id, 
                #         'sensor': sensor_id,
                #         'time': df.index,
                #         'value': value,
                #     })
            else:
                undefined_sensors.append(sensor_label)

        return objects, undefined_sensors
    
    
    def create(self, request, *args, **kwargs):
        # Check if the  file was uploaded 
        if request.FILES.get('sensor_file') is None:
            msg = 'Sensor text/csv file was not found.'
            return Response({'file': msg }, status=status.HTTP_404_NOT_FOUND)

        try:
            parent_id = int(request.data['parent_file'])
        except:
            msg = 'Request does not have the ID for the parent of uploaded file.'
            return Response({'file': msg }, status=status.HTTP_404_NOT_FOUND)

        csv_file = request.FILES.get('sensor_file')
        try:
            parser = CSVTextParser()
            with csv_file.open() as opened_csv_file:
                csv_data = parser.parse(opened_csv_file, media_type=parser.media_type)
                file_object = FileUpload.objects.create(upload=csv_file)
        except:
            msg = f'{csv_file.name} is not a valid text/csv file.'
            return Response({'file': msg}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)


        objects, _ = self._build_sensor_objects(csv_data, parent_id, file_object.id)

        if isinstance(objects, str):
            # Remove the object file and the storage 
            file_object.upload.delete()
            file_object.delete()
            return Response({'file': objects}, status=status.HTTP_400_BAD_REQUEST) 

        try:
            SensorFileOperation.objects.create(
                operation=Operation.objects.filter(id=parent_id).first(),
                fileupload=file_object)      
        except:
            return Response({'sensor_file': 'Could not create sensor file operation object'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=objects)
        serializer.is_valid(raise_exception=True)        
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    def get_queryset(self):
        qs = filter(self.request)
        return qs

    def list(self, request):
        categorized_data = []
        if not request.GET.getlist('sensor[]'):
            return Response(categorized_data)
        querysets = self.get_queryset()
        for queryset in querysets:
            serializer = self.get_serializer(queryset, many=True)
            # Now find the unique sensors 
            for label in request.GET.getlist('sensor[]'):
                categorized_data.append([label, serializer.data])
        return Response(categorized_data)

