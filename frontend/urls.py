from django.urls import path
from .views import index, product_library, CustomLoginView, register

urlpatterns = [
    path('', index,name='index'),
    path('product-library/', product_library),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('register/', register, name='register'),
]