from rest_framework import serializers
import traceback

from api.models import Inventory, CustomerOrder, InputOrder, Customer, Delivery
from .inventories import TaggedInventorySerializer



class InputOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputOrder
        fields = '__all__'

    
    def create(self, validated_data):
        inventory_instance = validated_data["inventory"]
        requested_quantity = validated_data["quantity"]
        
        if  inventory_instance.quantity < requested_quantity:
            err_msg = {'quantity': [f'A value less than {inventory_instance.quantity } is required.']}
            raise serializers.ValidationError(err_msg)
        
        # Update inventory 
        inventory_instance.quantity -= requested_quantity
        inventory_instance.save()

        ModelClass =  InputOrder
        try:
            instance = ModelClass.objects.create(**validated_data)
        except TypeError:
            tb = traceback.format_exc()
            msg = (
                'Got a `TypeError` when calling `%s.%s.create()`. '
                'This may be because you have a writable field on the '
                'serializer class that is not a valid argument to '
                '`%s.%s.create()`. You may need to make the field '
                'read-only, or override the %s.create() method to handle '
                'this correctly.\nOriginal exception was:\n %s' %
                (
                    ModelClass.__name__,
                    ModelClass._default_manager.name,
                    ModelClass.__name__,
                    ModelClass._default_manager.name,
                    self.__class__.__name__,
                    tb
                )
            )
            raise TypeError(msg)
       
        return instance 
    
    def update(self, instance, validated_data):        
        current_inventory_instance = Inventory.objects.get(id=instance.inventory_id)
        new_inventory_instance = validated_data["inventory"]
        requested_quantity = validated_data['quantity']

        if current_inventory_instance == new_inventory_instance:
            available_quantity = current_inventory_instance.quantity + instance.quantity
        else:
            available_quantity = new_inventory_instance.quantity
                
        if available_quantity < requested_quantity:
            err_msg = {'quantity': [f'A value less than {available_quantity} is required.']}
            raise serializers.ValidationError(err_msg)

        # Return and update the quantity in inventories   
        if current_inventory_instance == new_inventory_instance:
            current_inventory_instance.quantity = available_quantity - requested_quantity
            current_inventory_instance.save()
        else:
            current_inventory_instance.quantity += instance.quantity
            current_inventory_instance.save()
            new_inventory_instance.quantity -= requested_quantity
            new_inventory_instance.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance


class CustomerOrderSerializer(serializers.ModelSerializer):
    tags = TaggedInventorySerializer(many=True, required=False)
    input_order = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # customer = serializers.SlugRelatedField(slug_field='name', queryset=Customer.objects.all())

    class Meta:
        model = CustomerOrder
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = '__all__'