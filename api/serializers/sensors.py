from rest_framework import serializers
from api.models import SensorReading, FileUpload
from django.db import IntegrityError
from rest_framework.exceptions import ValidationError

class SensorFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        fields = '__all__'

class BulkCreateUpdateListSerializer(serializers.ListSerializer):
    def create(self, validated_data):

        result = [self.child.create(attrs) for attrs in validated_data]

        try:
            self.child.Meta.model.objects.bulk_create(result)
        except IntegrityError as e:
            raise ValidationError(e)

        return result

class SensorReadingSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        instance = SensorReading(**validated_data)

        if isinstance(self._kwargs["data"], dict):
            instance.save()

        return instance

    class Meta:
        model = SensorReading
        fields = '__all__'
        list_serializer_class = BulkCreateUpdateListSerializer