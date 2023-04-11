from rest_framework import serializers
from .models import Product
from .models import ProductCategory

class ProductSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')
    
    class Meta:
        model = Product
        fields = ('id', 'title', 'category', 'author', 'unit', 'added', 'standard_size', 'use_days', 'current_inventory', 'inventory_updated_date')

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'