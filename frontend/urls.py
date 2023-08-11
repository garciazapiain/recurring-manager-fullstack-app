from django.urls import path
from .views import index, product_library, CustomLoginView

urlpatterns = [
    path('', index,name='index'),
    path('product-library/', product_library),
    path('login/', CustomLoginView.as_view(), name='login'),
  
]