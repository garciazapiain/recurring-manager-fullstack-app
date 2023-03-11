"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.views.generic import TemplateView
from django.contrib import admin
from django.urls import path,include               
from rest_framework import routers                 
from product import views    
from product.views import add_product
from product.views import csrf_token

router = routers.DefaultRouter()                   
router.register(r'products', views.ProductView, 'product')  
router.register(r'productcategories', views.ProductCategoryView, 'product')  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/products/add/', add_product, name='add_product'), 
    path('api/csrf_token/', csrf_token, name='csrf_token'),  
    path('', views.home, name='home')
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]
