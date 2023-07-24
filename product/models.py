from django.conf import settings
from django.db import models
from django.utils import timezone
from django.db.models import Q

class ProductCategory(models.Model):
    name = models.CharField(max_length=60)

    def __str__(self):
        return self.name

class Product(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    title = models.CharField(max_length=200)
    created_date = models.DateTimeField(default=timezone.now)
    inventory_updated_date = models.DateTimeField(blank=True, null=True, default=timezone.now)
    category = models.ForeignKey(ProductCategory, on_delete=models.DO_NOTHING)
    added=  models.BooleanField(default=False)
    unit = models.CharField(max_length=10)
    standard_size = models.IntegerField()
    use_days = models.IntegerField()
    current_inventory = models.IntegerField()
    image = models.CharField(max_length=200,null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title

def limit_master_product_choices():
    return Q(author_id=1)

class UserProduct(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    master_product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        null=True,
        limit_choices_to=limit_master_product_choices
    )
    title = models.CharField(max_length=200)
    created_date = models.DateTimeField(default=timezone.now)
    inventory_updated_date = models.DateTimeField(blank=True, null=True, default=timezone.now)
    category = models.ForeignKey(ProductCategory, on_delete=models.DO_NOTHING)
    added=  models.BooleanField(default=False)
    unit = models.CharField(max_length=10)
    standard_size = models.IntegerField()
    use_days = models.IntegerField()
    current_inventory = models.IntegerField()
    image = models.CharField(max_length=200, null=True)

    class Meta:
        verbose_name = 'User Product'
        verbose_name_plural = 'User Products'
