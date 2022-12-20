from django.urls import path
from . import views

urlpatterns = [
    path('purchases/', views.PurchaseList.as_view(), name='purchase-list'),
    path('purchases/<int:pk>/', views.PurchaseDetail.as_view(), name='purchase-detail'),
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('', views.api_root)
]


