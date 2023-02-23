from django.shortcuts import render
from .serializers import ProductSerializer 
from .serializers import ProductCategorySerializer 
from rest_framework import viewsets      
from .models import Product                 
from .models import ProductCategory    
from .forms import ProductForm

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

def index(request):
    return HttpResponse("Welcome to my recurring manager app!")

def home(request):
    return render(request, 'frontend/public/index.html')