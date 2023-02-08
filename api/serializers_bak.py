from rest_framework import serializers
from .models import Inventory, Purchase, Order, InputOrder

from django.contrib.auth.models import User
from api.models import NewUser
from generic_relations.relations import GenericRelatedField
from django.contrib.contenttypes.models import ContentType


# TODO: given the size of the models, we might need to split to seperate files

class InventorySerializer(serializers.ModelSerializer):
    # class Meta:
    #     model = Inventory
    #     fields = '__all__'
    # content_object = GenericRelatedField({
    #     Purchase: PurchaseSerializer(),
    # })

    content_object = GenericRelatedField({
        Purchase: serializers.HyperlinkedRelatedField(
            queryset=Purchase.objects.all(),
            view_name='purchases-detail',
        ),
        Order: serializers.HyperlinkedRelatedField(
            queryset=Order.objects.all(),
            view_name='orders-detail',
        ),
    }, required=False)

    content_type = serializers.SlugRelatedField(
        queryset=ContentType.objects.all(),
        slug_field='model',
    )
    class Meta:
        model = Inventory
        fields = '__all__'
        # exclude = ('content_object',)
        # fields = ('title', 'content_object')


class InputOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputOrder
        fields = '__all__'

    def update(self, instance, validated_data):
        inventory_instance = Inventory.objects.get(id=instance.inventory_id)
        current_amount = instance.amount
        if 'amount' in validated_data:
            update_quantity = inventory_instance.quantity + current_amount - validated_data['amount']
            if update_quantity >= 0.0:
                inventory_instance.quantity = update_quantity
                inventory_instance.save()
                for attr, value in validated_data.items():
                    setattr(instance, attr, value)
                instance.save()
            else:
                err_msg = {
                    'amount': [f'A value less than {inventory_instance.quantity + current_amount} is required.']
                }
                raise serializers.ValidationError(err_msg)

        return instance

class TaggedItemSerializer(serializers.ModelSerializer):
   class Meta:
        model = Inventory
        fields = '__all__'


# class TaggedObjectRelatedField(serializers.RelatedField):
#     def to_representation(self, value):
#         if isinstance(value, Purchase):
#             serializer = PurchaseSerializer(value)
#         else:
#             raise Exception('Unexpected type of tagged object')
#         return serializer.data
#

class PurchaseSerializer(serializers.ModelSerializer):
    #purchases = serializers.PrimaryKeyRelatedField(many=True)
    #purchase_items = serializers.StringRelatedField(many=True, required=False)
    # purchase_items = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    #tags = TaggedObjectRelatedField(many=True, queryset=Inventory.objects.all())
    tags = TaggedItemSerializer(many=True, required=False)
    class Meta:
        model = Purchase
        fields = '__all__'
        #fields = ('id', 'title', 'description', 'tags')


class OrderSerializer(serializers.ModelSerializer):
    #purchases = serializers.PrimaryKeyRelatedField(many=True)
    #purchase_items = serializers.StringRelatedField(many=True, required=False)
    # purchase_items = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    #tags = TaggedObjectRelatedField(many=True, queryset=Inventory.objects.all())
    tags = TaggedItemSerializer(many=True)
    input_order = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Order
        fields = '__all__'
        #fields = ('id', 'title', 'description', 'tags')


# class PurchaseItemSerializer(serializers.ModelSerializer):
#     #Purchase = PurchaseSerializer()
#     parent_id = serializers.IntegerField(required=False)
#     class Meta:
#         model = PurchaseItem
#         fields = '__all__'
#         extra_kwargs = {
#             'purchase': {'allow_null': True, 'required': False}
#         }
#
#     def create(self, validated_data):
#         validated_data.pop('parent_id', None)
#         return super().create(validated_data)


# class UserSerializer(serializers.ModelSerializer):
#     purchases = serializers.PrimaryKeyRelatedField(many=True, view_name='purchase-detail', read_only=True)
#
#     class Meta:
#         model = User
#         fields = ['url', 'id', 'username', 'purchases']


# class CustomUserSerializer(serializers.ModelSerializer):
#     """
#     Currently unused in preference of the below.
#     """
#     email = serializers.EmailField(required=True)
#     user_name = serializers.CharField(required=True)
#     password = serializers.CharField(min_length=8, write_only=True)
#
#     class Meta:
#         model = NewUser
#         fields = ('email', 'user_name', 'password')
#         extra_kwargs = {'password': {'write_only': True}}
#
#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         # as long as the fields are the same, we can just use this
#         instance = self.Meta.model(**validated_data)
#         if password is not None:
#             instance.set_password(password)
#         instance.save()
#         return instance