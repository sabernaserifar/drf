from rest_framework import permissions
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser

from api.models import FileUpload
from api.serializers import FileUploadSerializer


class FileUploadViewSet(viewsets.ModelViewSet):
    queryset = FileUpload.objects.all()
    serializer_class = FileUploadSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser]
    

    def create(self, request, *args, **kwargs):
        
        # Check if the  file was uploaded 
        if request.FILES.get('upload_file') is None:
            msg = 'File was not found.'
            return Response({'upload_file': msg }, status=status.HTTP_404_NOT_FOUND)   

        serializer = self.get_serializer(data={'upload': request.FILES.get('upload_file')})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    def update(self, request, *args, **kwargs):
        if request.FILES.get('upload_file'):
            partial = kwargs.pop('partial', False)
            instance = self.get_object()    
            instance.upload.delete()            
            serializer = self.get_serializer(instance, data={'upload': request.FILES.get('upload_file')}, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}
        else:
            instance = self.get_object() 
            serializer = self.get_serializer(instance)
        
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
        
