from django.db.models import Q, Count
from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView


from api.models import Inventory
from api.serializers import InventorySerializer



def is_valid_queryparam(param):
    return param != '' and param is not None


def filter(request):
    qs = Inventory.objects.all()
    id = request.GET.get('id')
    content_type = request.GET.get('content_type')
    title_query = request.GET.get('title')
    date_min = request.GET.get('date_min')
    date_max = request.GET.get('date_max')
    quantity = request.GET.get('quantity')
    unit = request.GET.get('unit')

    if is_valid_queryparam(id):
        qs = qs.filter(id=id)
        
    if is_valid_queryparam(content_type):
        qs = qs.filter(content_type__model__icontains=content_type)

    if is_valid_queryparam(title_query):
        qs = qs.filter(title__icontains=title_query)

    if is_valid_queryparam(date_min):
        qs = qs.filter(updated__gte=date_min)

    if is_valid_queryparam(date_max):
        qs = qs.filter(updated__lt=date_max)

    if is_valid_queryparam(unit):
        qs = qs.filter(unit__icontains=unit)

    if is_valid_queryparam(quantity):
        # return values 5% more or less
        lower = f'{0.95*float(quantity)}'
        upper = f'{1.05*float(quantity)}'
        qs = qs.filter(quantity__gte=lower)
        qs = qs.filter(quantity__lte=upper)

    return qs


def is_there_more_data(request):
    offset = request.GET.get('offset')
    if int(offset) > Inventory.objects.all().count():
        return False
    return True


def infinite_filter(request):
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')
    return Inventory.objects.all()[int(offset): int(offset) + int(limit)]


class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]


    def get_queryset(self):
        qs = filter(self.request)
        return qs

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)