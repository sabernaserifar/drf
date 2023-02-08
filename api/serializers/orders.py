from rest_framework import serializers

from api.models import Inventory, Order, InputOrder
from .inventories import TaggedInventorySerializer


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


class OrderSerializer(serializers.ModelSerializer):
    tags = TaggedInventorySerializer(many=True, required=False)
    input_order = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
