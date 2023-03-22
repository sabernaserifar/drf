from rest_framework import permissions
from rest_framework import viewsets, status
from rest_framework.response import Response

from api.models import Operation, InputOperation, Inventory
from api.serializers import RunSerializer, InputRunSerializer


class RunViewSet(viewsets.ModelViewSet):
    queryset = Operation.objects.all()
    serializer_class = RunSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class InputRunViewSet(viewsets.ModelViewSet):
    queryset = InputOperation.objects.all()
    serializer_class = InputRunSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        inventory_instance = Inventory.objects.get(id=instance.inventory_id)
        inventory_instance.quantity += instance.amount
        inventory_instance.save()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)