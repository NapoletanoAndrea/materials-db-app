from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "first_name", "last_name", "date_joined",)
    search_fields = ['username']


admin.site.register(User, UserAdmin)
