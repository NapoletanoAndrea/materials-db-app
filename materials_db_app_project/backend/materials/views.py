from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
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
    permission_classes = [IsAuthenticated]
