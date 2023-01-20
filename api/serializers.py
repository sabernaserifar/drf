from rest_framework import serializers
from .models import Purchase, PurchaseItem
from django.contrib.auth.models import User
from api.models import NewUser


class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'

class PurchaseItemSerializer(serializers.ModelSerializer):
    #Purchase = PurchaseSerializer()
    parent_id = serializers.IntegerField(required=False)
    class Meta:
        model = PurchaseItem
        fields = '__all__'
        extra_kwargs = {
            'purchase': {'allow_null': True, 'required': False},
            # 'Last_Name': {'allow_null': True, 'allow_blank': True, 'required': False},
            # 'First_Name': {'allow_null': True, 'required': False, 'allow_blank': True},
        }

    def create(self, validated_data):
        validated_data.pop('parent_id', None)
        return super().create(validated_data)


# class UserSerializer(serializers.ModelSerializer):
#     purchases = serializers.PrimaryKeyRelatedField(many=True, view_name='purchase-detail', read_only=True)
#
#     class Meta:
#         model = User
#         fields = ['url', 'id', 'username', 'purchases']


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance