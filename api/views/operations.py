from rest_framework import permissions
from rest_framework import viewsets, status
from rest_framework.response import Response

from api.models import Operation, InputOperation, Inventory, FileUpload
from api.serializers import OperationSerializer, InputOperationSerializer
from rest_framework.parsers import MultiPartParser


class OperationViewSet(viewsets.ModelViewSet):
    queryset = Operation.objects.all()
    serializer_class = OperationSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser]
    
    def create(self, request, *args, **kwargs):
        # Check if the  file was uploaded 
        file_object = None
        if request.FILES.get('upload_file'):
            upload_file = request.FILES.get('upload_file')
            try:
                file_object = FileUpload.objects.create(upload=upload_file)
                request.data['supp_file'] = file_object.id
            except:
                msg = f'Could not create and save "{upload_file.name}" file.'
                return Response({'upload_file': msg}, status=status.HTTP_406_NOT_ACCEPTABLE)

        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        except Exception as e:
            # Remove the object file and the storage 
            if file_object:
                file_object.upload.delete()
                file_object.delete()
            raise(e)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
           
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


    def update(self, request, *args, **kwargs):

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        new_file_object = None
        old_file_object = None
        if request.FILES.get('upload_file'):
            result_file = request.FILES.get('upload_file')
            try:
                new_file_object = FileUpload.objects.create(upload=result_file)
                request.data['supp_file'] = new_file_object.id
            except:
                msg = f'Could not create and save "{result_file.name}" file.'
                return Response({'upload_file': msg}, status=status.HTTP_406_NOT_ACCEPTABLE)

            # Delete the older file
            old_file_object = instance.supp_file 

        try: 
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            # delete the older file 
            if old_file_object:
                old_file_object.upload.delete()
                old_file_object.delete()
        except Exception as e:
            # Remove the file that was just created 
            if new_file_object:
                new_file_object.upload.delete()
                new_file_object.delete()

        return Response(serializer.data)


class InputOperationViewSet(viewsets.ModelViewSet):
    queryset = InputOperation.objects.all()
    serializer_class = InputOperationSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        inventory_instance = Inventory.objects.get(id=instance.inventory_id)
        inventory_instance.quantity += instance.quantity
        inventory_instance.save()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)