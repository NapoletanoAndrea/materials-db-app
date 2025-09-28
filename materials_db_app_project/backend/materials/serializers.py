from rest_framework import serializers
from . import models


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = models.Item
        exclude = ['id']

    def get_category_name(self, obj):
        return obj.category.name if obj.category else None
