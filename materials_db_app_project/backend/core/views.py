from django.shortcuts import render
from .models import ExampleModel
from .serializers import ExampleModelSerializer
from rest_framework import viewsets
from rest_framework.permissions import AllowAny


class ExampleViewSet(viewsets.ModelViewSet):
    queryset = ExampleModel.objects.all()
    serializer_class = ExampleModelSerializer
    permission_classes = [AllowAny]
