from django.contrib.contenttypes.models import ContentType
from generic_relations.relations import GenericRelatedField
from rest_framework import serializers

from api.models import Inventory, Purchase, Operation


class InventorySerializer(serializers.ModelSerializer):
    content_object = GenericRelatedField({
        Purchase: serializers.HyperlinkedRelatedField(
            queryset=Purchase.objects.all(),
            view_name='purchases-detail',
        ),
        Operation: serializers.HyperlinkedRelatedField(
            queryset=Operation.objects.all(),
            view_name='runs-detail',
        ),
    }, required=False)

    content_type = serializers.SlugRelatedField(
        queryset=ContentType.objects.all(),
        slug_field='model',
    )

    class Meta:
        model = Inventory
        fields = '__all__'


class TaggedInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'
