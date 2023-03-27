from rest_framework import serializers
from api.models import Equipment, EquipmentType
from .maintenances import MaintenanceSerializer


class EquipmentSerializer(serializers.ModelSerializer):
    equipment_type = serializers.SlugRelatedField(
        slug_field='label', queryset=EquipmentType.objects.all())
    
    maintenances = MaintenanceSerializer(many=True, read_only=True)

    

    class Meta:
        model = Equipment
        fields = '__all__'