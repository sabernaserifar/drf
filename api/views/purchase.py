from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response

from api.models import Purchase, PurchaseItem
from api.serializers import PurchaseSerializer, PurchaseItemSerializer  # , UserSerializer


class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# Purchase Item
class PurchaseItemViewSet(viewsets.ModelViewSet):
    serializer_class = PurchaseItemSerializer
    queryset = PurchaseItem.objects.all()

    def create(self, validated_data):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        parent_id = self.request.data['parent_id']
        instance = Purchase.objects.filter(id=parent_id).first()
        serializer.save(purchase=instance)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

