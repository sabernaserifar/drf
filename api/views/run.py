from rest_framework import permissions
from rest_framework import viewsets

from api.models import Run
from api.serializers import RunSerializer


class RunViewSet(viewsets.ModelViewSet):
    queryset = Run.objects.all()
    serializer_class = RunSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        print(self.request)
        print("================")
        print(self.request.data)
        serializer.save()