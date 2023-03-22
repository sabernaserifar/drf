from rest_framework import serializers
from api.models import FileUpload

  
class FileUploadSerializer(serializers.ModelSerializer):
    file_url = serializers.CharField(source='upload.url', required=False)

    class Meta:
        model = FileUpload
        fields = '__all__'
