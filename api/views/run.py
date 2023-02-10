from rest_framework import permissions
from rest_framework import viewsets

from api.models import Run, InputRun
from api.serializers import RunSerializer, InputRunSerializer


class RunViewSet(viewsets.ModelViewSet):
    queryset = Run.objects.all()
    serializer_class = RunSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class InputRunViewSet(viewsets.ModelViewSet):
    queryset = InputRun.objects.all()
    serializer_class = InputRunSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]