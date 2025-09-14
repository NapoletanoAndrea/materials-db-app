from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'items', views.ItemsViewSet, basename='items')


urlpatterns = [
    path('', include(router.urls)),
    path('analyze-image/', views.AnalyzeImageWithAI.as_view(), name="analyze-image")
]
