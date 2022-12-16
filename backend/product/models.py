from django.conf import settings
from django.db import models
from django.utils import timezone

class ProductCategory(models.Model):
    name = models.CharField(max_length=60)

    def __str__(self):
        return self.name

class Product(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)
    category = models.ForeignKey(ProductCategory, on_delete=models.DO_NOTHING)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
