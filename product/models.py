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
    created_date = models.DateTimeField(default=timezone.now)
    inventory_updated_date = models.DateTimeField(blank=True, null=True)
    category = models.ForeignKey(ProductCategory, on_delete=models.DO_NOTHING)
    added=  models.BooleanField(default=False)
    unit = models.CharField(max_length=10)
    standard_size = models.CharField(max_length=10)
    use_days = models.CharField(max_length=10)
    current_inventory = models.CharField(max_length=10)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
