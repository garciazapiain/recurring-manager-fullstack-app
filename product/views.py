from django.shortcuts import render, redirect
from .serializers import ProductSerializer, ProductCategorySerializer, UserProductSerializer
from rest_framework import viewsets      
from .models import Product, ProductCategory, UserProduct             
from .forms import ProductForm
from django.conf import settings
from django.views.decorators.csrf import get_token
from django.http import JsonResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import datetime
from django.utils import timezone
from django.db.models import Q
from django.urls import reverse
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.views import LoginView

import os

class ProductView(viewsets.ModelViewSet):  
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Product.objects.filter(Q(author=user) | Q(author=1))
        return queryset
        
    @action(detail=True, methods=['put'])
    def add_to_user_product(self, request, pk=None):
        product = self.get_object()
        # Get the current_inventory value from the request body
        current_inventory = request.data.get('current_inventory')
        # Create a new UserProduct instance with the same values as the product
        user_product = UserProduct(
            author=request.user,
            master_product=product,
            title=product.title,
            created_date=product.created_date,
            inventory_updated_date=timezone.now(),
            category=product.category,
            added=True,
            unit=product.unit,
            standard_size=product.standard_size,
            use_days=product.use_days,
            current_inventory=current_inventory,
            image = product.image
        )
        
        # Save the new UserProduct instance
        user_product.save()
        
        # Serialize and return the UserProduct data
        serializer = UserProductSerializer(user_product)
        return Response(serializer.data)

class ProductCategoryView(viewsets.ModelViewSet):  
    serializer_class = ProductCategorySerializer   
    queryset = ProductCategory.objects.all() 

class UserProductView(viewsets.ModelViewSet):  
    serializer_class = UserProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = UserProduct.objects.filter(author=user) 
        return queryset
    
    @action(detail=True, methods=['put'])
    def update_inventory(self, request, pk=None):
        product = self.get_object()
        product.current_inventory = request.data.get('current_inventory')
        product.inventory_updated_date = timezone.now()
        product.save()
        serializer = self.get_serializer(product)
        return Response(serializer.data)

    @action(detail=True, methods=['put'])
    def update_details(self, request, pk=None):
        product = self.get_object()

        # Update the product details based on the data in the request
        product.title = request.data.get('title', product.title)
        product.current_inventory = request.data.get('current_inventory', product.current_inventory)
        product.standard_size = request.data.get('standard_size', product.standard_size)
        product.unit = request.data.get('unit', product.unit)
        product.use_days = request.data.get('use_days', product.use_days)
        product.inventory_updated_date = timezone.now()

        # Save the updated product
        product.save()

        # Serialize and return the updated product data
        serializer = self.get_serializer(product)
        return Response(serializer.data)

def register(request):
    template_path = os.path.join(settings.BASE_DIR, 'registration', 'register.html')
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username = username, password = password)
            login(request, user)
            return redirect(reverse('frontend:index'))
    else:
        form = UserCreationForm()
    return render(request, template_path, {'form': form})

class CustomLoginView(LoginView):
    template_name = 'login.html'
    success_url = '/'

    def get_success_url(self):
        return self.success_url

def get_user(request):
    if request.user.is_authenticated:
        user = {
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email
        }
        return JsonResponse(user)
    else:
        return JsonResponse({'error': 'User is not authenticated'})