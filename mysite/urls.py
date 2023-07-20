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
from django.urls import path,include, re_path               
from rest_framework import routers                 
from product import views    
from product.views import get_user, CustomLoginView, ProductView, UserProductView
from django.contrib.auth import views as auth_views

router = routers.DefaultRouter()                   
router.register(r'products', views.ProductView, 'product')  
router.register(r'productcategories', views.ProductCategoryView, 'product')  
router.register(r'userproducts', views.UserProductView, 'product')  

urlpatterns = [
    path('', include(('frontend.urls', 'frontend'), namespace='frontend')),
    path('api/', include(router.urls)),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('register/', views.register, name='register'),
    path('admin/', admin.site.urls),
    path('api/auth/user/', get_user, name='get_user'),
    path('api/products/<int:pk>/add-to-user-product/', ProductView.as_view({'put': 'add_to_user_product'}), name='add-to-user-product'),
    path('api/userproducts/<int:pk>/update-inventory/', UserProductView.as_view({'put': 'update_inventory'}), name='userproduct-update-inventory'),
    path('api/userproducts/<int:pk>/update-details/', UserProductView.as_view({'put': 'update_details'}), name='userproduct-update-details'),
]

# Only add the re_path for non-admin URLs
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html')),]