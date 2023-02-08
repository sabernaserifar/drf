from rest_framework import serializers

from api.models import Purchase
from .inventories import TaggedInventorySerializer


class PurchaseSerializer(serializers.ModelSerializer):
    tags = TaggedInventorySerializer(many=True, required=False)

    class Meta:
        model = Purchase
        fields = '__all__'
