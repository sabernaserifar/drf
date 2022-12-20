from rest_framework import serializers
from .models import Purchase
from django.contrib.auth.models import User


class PurchaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Purchase
        fields = ['id', 'url', 'user', 'title', 'description', 'active', 'order_time', 'delivery_time']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    purchases = serializers.HyperlinkedRelatedField(many=True, view_name='purchase-detail', read_only=True)

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'purchases']