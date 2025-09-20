from django.contrib import admin
from . import models

# Register your models here.


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name_en", "name_it")
    search_fields = ["name_en", "name_it"]
    list_filter = ('name',)


class ItemAdmin(admin.ModelAdmin):
    list_display = ("id", "uuid", "name", "category")
    search_fields = ("uuid", "name", "category")


admin.site.register(models.Category, CategoryAdmin)
admin.site.register(models.Item, ItemAdmin)
