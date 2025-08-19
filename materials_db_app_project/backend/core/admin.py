from django.contrib import admin
from .models import ExampleModel


class ExampleModelAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description", 'created_at', 'updated_at')
    search_fields = ['name', 'description']
    list_filter = ('name',)


admin.site.register(ExampleModel, ExampleModelAdmin)
