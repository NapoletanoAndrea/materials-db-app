from django.db import models
from users.models import User
import uuid

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


class Condition(models.TextChoices):
    BAD = 'bad'
    DECENT = 'decent'
    GOOD = 'good'
    AS_NEW = 'as_new'


class Item(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, related_name='items',
                                 on_delete=models.SET_NULL, blank=True, null=True)
    description = models.TextField()
    condition = models.CharField(choices=Condition.choices, default=Condition.GOOD)
    height = models.FloatField(blank=True, null=True)
    width = models.FloatField(blank=True, null=True)
    depth = models.FloatField(blank=True, null=True)
    weight = models.FloatField(blank=True, null=True)
    uploaded_by = models.ForeignKey(User, related_name='uploads',
                                    on_delete=models.SET_NULL, blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
