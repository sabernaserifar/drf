from rest_framework import serializers
from .models import Purchase
from django.contrib.auth.models import User


class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    purchases = serializers.PrimaryKeyRelatedField(many=True, queryset=Purchase.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'purchases']