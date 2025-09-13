from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from ai_core.services import analyze_image

# Create your views here.


class AnalyzeImageWithAI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        image = request.data.get("image")
        return Response(analyze_image(image_url=image))
