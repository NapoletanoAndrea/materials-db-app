from django.contrib import admin
from . import models

# Register your models here.


class MaterialAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ["name"]


class ItemAdmin(admin.ModelAdmin):
    list_display = ("id", "uuid", "name", "material")
    search_fields = ("uuid", "name", "material")


admin.site.register(models.Material, MaterialAdmin)
admin.site.register(models.Item, ItemAdmin)
