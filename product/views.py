from django.shortcuts import render, redirect
from .serializers import ProductSerializer 
from .serializers import ProductCategorySerializer 
from rest_framework import viewsets      
from .models import Product                 
from .models import ProductCategory    
from .forms import ProductForm
from django.conf import settings
from django.views.decorators.csrf import get_token
from django.http import JsonResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required

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

def csrf_token(request):
    return JsonResponse({'csrfToken': request.COOKIES['csrftoken']})

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username = username, password = password)
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
        template_path = os.path.join(settings.BASE_DIR, 'registration', 'register.html')
    return render(request, template_path, {'form': form})
