from rest_framework import permissions
from rest_framework import viewsets

from api.models import CustomerOrder, InputOrder
from api.serializers import InputOrderSerializer, OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = CustomerOrder.objects.all()
    serializer_class = OrderSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class InputOrderViewSet(viewsets.ModelViewSet):
    queryset = InputOrder.objects.all()
    serializer_class = InputOrderSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]