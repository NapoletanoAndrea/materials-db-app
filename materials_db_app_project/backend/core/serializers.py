from .models import ExampleModel
from rest_framework import serializers


class ExampleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExampleModel
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']
