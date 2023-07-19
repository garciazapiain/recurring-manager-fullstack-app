from django.urls import path
from .views import index, product_library

urlpatterns = [
    path('', index,name='index'),
    path('product-library/', product_library),
  
]