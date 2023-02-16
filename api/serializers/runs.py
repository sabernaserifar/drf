import traceback
from rest_framework import serializers

from api.models import Inventory, Run, InputRun
from .inventories import TaggedInventorySerializer


class InputRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputRun
        fields = '__all__'

    
    def create(self, validated_data):
        inventory_instance = validated_data["inventory"]
        requested_amount = validated_data["amount"]
        
        if  inventory_instance.quantity < requested_amount:
            err_msg = {'amount': [f'A value less than {inventory_instance.quantity } is required.']}
            raise serializers.ValidationError(err_msg)
        
        # Update inventory 
        inventory_instance.quantity -= requested_amount
        inventory_instance.save()

        ModelClass =  InputRun
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
        requested_amount = validated_data['amount']

        if current_inventory_instance == new_inventory_instance:
            available_amount = current_inventory_instance.quantity + instance.amount
        else:
            available_amount = new_inventory_instance.quantity
                
        if available_amount < requested_amount:
            err_msg = {'amount': [f'A value less than {available_amount} is required.']}
            raise serializers.ValidationError(err_msg)

        # Return and update the amount in inventories   
        if current_inventory_instance == new_inventory_instance:
            current_inventory_instance.quantity = available_amount - requested_amount
            current_inventory_instance.save()
        else:
            current_inventory_instance.quantity += instance.amount
            current_inventory_instance.save()
            new_inventory_instance.quantity -= requested_amount
            new_inventory_instance.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
    

class RunSerializer(serializers.ModelSerializer):
    tags = TaggedInventorySerializer(many=True, required=False)
    # input_run = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    input_runs = InputRunSerializer(many=True, read_only=True)

    class Meta:
        model = Run
        fields = '__all__'
