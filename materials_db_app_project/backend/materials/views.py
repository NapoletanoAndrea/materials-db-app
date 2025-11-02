from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, generics, viewsets
from ai_core.services import analyze_image
from . import models, serializers

# Create your views here.


class AnalyzeImageWithAI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        image_file = request.FILES.get("image")
        if not image_file:
            return Response({"error": "No image uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        # Read the file into memory
        image_bytes = image_file.read()

        # Call your AI function with bytes
        result, token_count = analyze_image(image_bytes=image_bytes)

        return Response({
            "result": result,
            "token_count": token_count
        })


class ItemsViewSet(viewsets.ModelViewSet):
    queryset = models.Item.objects.all()
    serializer_class = serializers.ItemSerializer
    lookup_field = 'uuid'

    def get_permissions(self):
        if self.request.method in ['GET', 'HEAD', 'OPTIONS']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer

    def get_permissions(self):
        if self.request.method in ['GET', 'HEAD', 'OPTIONS']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
