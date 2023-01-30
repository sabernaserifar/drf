from rest_framework import permissions
from rest_framework import viewsets

from api.models import InputOrder
from api.serializers import InputOrderSerializer


class InputOrderViewSet(viewsets.ModelViewSet):
    queryset = InputOrder.objects.all()
    serializer_class = InputOrderSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]