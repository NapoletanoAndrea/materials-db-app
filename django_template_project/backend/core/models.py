from django.db import models

# Create your models here.


class ExampleModel(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name if self.name else "Unnamed ExampleModel"

    class Meta:
        verbose_name = "Example Model"
        verbose_name_plural = "Example Models"
        ordering = ['name']
