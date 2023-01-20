from rest_framework import generics, permissions, serializers
from api.serializers import PurchaseSerializer, PurchaseItemSerializer #, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.contrib.auth.models import User
from api.models import Purchase, PurchaseItem, NewUser
from api.permissions import IsOwnerOrReadOnly
from rest_framework.generics import GenericAPIView
from rest_framework import mixins
from rest_framework import mixins, status, viewsets
from django.shortcuts import get_object_or_404

# from knox.views import LoginView
from rest_framework import viewsets
from rest_framework.decorators import action




class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permissions_classes = [permissions.AllowAny]
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)



# class PurchaseList(generics.ListCreateAPIView):
#     queryset = Purchase.objects.all()
#     serializer_class = PurchaseSerializer
#     # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
#
#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)
#
#
# class PurchaseDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Purchase.objects.all()
#     serializer_class = PurchaseSerializer
#     permission_classes = [IsOwnerOrReadOnly]
#
#     def get_object(self):
#         item = self.kwargs.get('pk')
#         return get_object_or_404(Purchase, title=item)

# class UserList(generics.ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
#
# class UserDetail(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
#

class CreatePost(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

class AdminPostDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

class EditPost(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PurchaseSerializer
    queryset = Purchase.objects.all()


    # def get_object(self):
    #     email = self.kwargs['author_email']
    #     print(email)
    #     userID = NewUser.objects.all().filter(email=email)[0].id
    #     print(userID)
    #     obj = Purchase.objects.all().filter(author=)
    #     return obj



class DeletePost(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PurchaseSerializer
    queryset = Purchase.objects.all()


# @api_view(['GET'])
# def api_root(request, format=None):
#     return Response({
#         # 'users': reverse('user-list', request=request, format=format),
#         'purchases': reverse('purchase-list', request=request, format=format)
#     })



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

