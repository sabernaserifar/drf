from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

router = SimpleRouter()
router.register(r"purchases", views.PurchaseViewSet, basename="purchases")
router.register(r"orders", views.OrderViewSet, basename="orders")
router.register(r"runs", views.RunViewSet, basename="runs")
router.register(r"input_runs", views.InputRunViewSet, basename="input_runs")
router.register(r"operations", views.OperationViewSet, basename="operations")
router.register(r"input_operations", views.InputOperationViewSet, basename="input_operations")
router.register(r"inputorders", views.InputOrderViewSet, basename="inputorders")
# router.register(r"purchaseItem", views.PurchaseItemViewSet, basename="purchaseItem")
router.register(r"inventories", views.InventoryViewSet, basename="inventories")
router.register(r"sensors", views.SensorFileViewSet, basename="sensors")
router.register(r"sensor_readings", views.RegisterDataViewSet, basename="sensor_readings")
router.register(r"sensorfile_operations", views.SensorFileOperationViewSet, basename="sensorfile_operations")

router.register(r"file_uploads", views.FileUploadViewSet, basename="file_uploads")




urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('inventories/', views.InventoryViewSet.as_view(), name='inventories-list'),
    path('', include(router.urls)),
    # path('sensors/', views.RegisterData.as_view(), name='sensors'),

    # path('purchases/', views.PurchaseList.as_view(), name='purchase-list'),
    # path('purchases/<int:pk>/', views.PurchaseDetail.as_view(), name='purchase-detail'),
    path('inventory_filter/', views.InventoryFilterViewSet.as_view(), name='inventory_filter'),
    path('user/create/', views.CustomUserCreate.as_view(), name="create_user"),
    path('user/logout/blacklist/', views.BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    # path('users/', views.UserList.as_view(), name='user-list'),
    # path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('userid/', views.UserID),
    path('', views.api_root)
]


