# not sure about the right import
from api.models import Sensor, SensorReading
import csv
import pandas as pd
from typing import Dict, List
from rest_framework import viewsets, status, views
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser, BaseParser


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


class RegisterData(views.APIView):
    parser_classes = (CSVTextParser, )
    # parser_classes = (CSVTextParser, FormParser, MultiPartParser)

    def post(self, request, version=None):
        """
        Recieves a request body containing CSV, using the `text/csv` content-type, 
        as in: https://tools.ietf.org/html/rfc4180
        
        Can also recieve a CSV file via 'multipart/form-data'.
        """
        content_type = request.content_type.split(';')[0].strip()
        encoding = 'utf-8'

        if content_type == 'text/csv':
            csv_table = request.data
            objects = []
            s1 = Sensor.objects.all().get(id=1)
            s2 = Sensor.objects.all().get(id=2)
            s3 = Sensor.objects.all().get(id=3)



            for i in range(0, len(csv_table)):
               
                data = csv_table[i]
                # print(i, data)
                if data[0] == 'sensorID2':
                    print('Found it =========================')
                    s_obj = s2
                elif data[0] == 'sensorID3':
                    s_obj = s3
                else:
                    s_obj = s1

                objects.append(SensorReading(
                    time = pd.Timestamp(data[1], tz='UTC'),
                    sensor=s_obj,
                    value=float(data[2]),
                ))

            # print(objects)
            SensorReading.objects.bulk_create(objects)
            print("DONE")
            
            # In this example, we just return the parsed CSV data structure,
            # but in a view with an associated model and/or serializer we could
            # do something more interesting with it (eg create a new database record).
            return Response(csv_table, status=status.HTTP_200_OK)
          
        elif content_type == 'multipart/form-data':
            fh = request.data.get('file', None)
            csv_table = fh.read().decode(encoding)
            return Response(csv_table, status=status.HTTP_200_OK)
        else:
            return Response(None, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # def post(self, request):
    #     print('OOOOOOOKKKKKK')
    #     print(self.request)
    #     for file in request.FILES.values():
    #         print(file)
    #         reader = csv.reader(file)
    #         objects = []
    #         for row in reader:
    #             objects.append(SensorReading(
    #               city=row[0],
    #               wheel_type=row[1],
    #               # and so on ..
    #             ))
    #         SensorReading.objects.bulk_create(objects)

    #     return Response({"success": "Good job, buddy"})