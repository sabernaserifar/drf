from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

router = SimpleRouter()
router.register(r"purchases", views.PurchaseViewSet, basename="purchases")
router.register(r"purchaseItem", views.PurchaseItemViewSet, basename="purchaseItem")



urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
    # path('purchases/', views.PurchaseList.as_view(), name='purchase-list'),
    # path('purchases/<int:pk>/', views.PurchaseDetail.as_view(), name='purchase-detail'),
    path('user/create/', views.CustomUserCreate.as_view(), name="create_user"),
    path('user/logout/blacklist/', views.BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('admin/create/', views.CreatePost.as_view(), name='createpost'),
    path('admin/edit/postdetail/<int:pk>/', views.AdminPostDetail.as_view(), name='admindetailpost'),
    path('admin/edit/<int:pk>/', views.EditPost.as_view(), name='editpost'),
    path('admin/delete/<int:pk>/', views.DeletePost.as_view(), name='deletepost'),
    # path('users/', views.UserList.as_view(), name='user-list'),
    # path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('userid/', views.UserID),
    # path('', views.api_root)
]


