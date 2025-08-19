from django.urls import path, include, re_path
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from allauth.account.views import ConfirmEmailView

router = DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('self/', views.UpdateOwnAccountView.as_view(), name="user-self"),
    path("token/", TokenObtainPairView.as_view(), name="get-token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("v1/auth/", include("dj_rest_auth.urls")),
    path('v1/auth/registration/', include('dj_rest_auth.registration.urls')),
    re_path(
        r"^api/v1/auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$",
        ConfirmEmailView.as_view(),
        name="account_confirm_email",
    ),
]
