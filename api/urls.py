from django.urls import path
from . import views

urlpatterns = [
    path('purchases/', views.PurchaseList.as_view()),
    path('purchases/<int:pk>/', views.PurchaseDetail.as_view()),
]


