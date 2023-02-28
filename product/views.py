from django.shortcuts import render
from .serializers import ProductSerializer 
from .serializers import ProductCategorySerializer 
from rest_framework import viewsets      
from .models import Product                 
from .models import ProductCategory    
from .forms import ProductForm
from django.conf import settings
import os

class ProductView(viewsets.ModelViewSet):  
    serializer_class = ProductSerializer   
    queryset = Product.objects.all()

class ProductCategoryView(viewsets.ModelViewSet):  
    serializer_class = ProductCategorySerializer   
    queryset = ProductCategory.objects.all() 

def add_product(request):
        if request.method == 'POST':
            form = ProductForm(request.POST)
            if form.is_valid():
                product = form.save()
                return HttpResponseRedirect('/products/')
        else:
            form = ProductForm()

        return render(request, 'add_product.html', {'form': form}) 

from django.http import HttpResponse

def home(request):
    template_path = os.path.join(settings.BASE_DIR, 'frontend', 'build', 'index.html')
    return render(request, template_path)