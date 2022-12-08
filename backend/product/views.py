from django.shortcuts import render
from .serializers import ProductSerializer 
from .serializers import ProductCategorySerializer 
from rest_framework import viewsets      
from .models import Product                 
from .models import ProductCategory               

class ProductView(viewsets.ModelViewSet):  
    serializer_class = ProductSerializer   
    queryset = Product.objects.all() 

class ProductCategoryView(viewsets.ModelViewSet):  
    serializer_class = ProductCategorySerializer   
    queryset = ProductCategory.objects.all() 