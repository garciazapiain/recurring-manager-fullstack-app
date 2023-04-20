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
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        author_id = self.request.user.id
        return Product.objects.filter(author_id=author_id)

class ProductCategoryView(viewsets.ModelViewSet):  
    serializer_class = ProductCategorySerializer   
    queryset = ProductCategory.objects.all() 

# @login_required
# def add_product(request):
#     breakpoint()
#     if request.method == 'POST':
#         form = ProductForm(request.POST)
#         if form.is_valid():
#             product = form.save(commit=False)  # don't save yet
#             product.author_id = request.user.id  # set the author to the current user
#             product.save()  # now save the product with the author set
#             return HttpResponseRedirect('/products/')
#     else:
#         form = ProductForm()

#     return render(request, 'add_product.html', {'form': form})

from django.http import HttpResponse

def home(request):
    template_path = os.path.join(settings.BASE_DIR, 'frontend', 'build', 'index.html')
    return render(request, template_path)

def csrf_token(request):
    return JsonResponse({'csrfToken': request.COOKIES['csrftoken']})

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
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, template_path, {'form': form})

from django.contrib.auth.views import LoginView

class CustomLoginView(LoginView):
    template_name = 'login.html'
    success_url = '/'

    def get_success_url(self):
        return self.success_url

from django.http import JsonResponse

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