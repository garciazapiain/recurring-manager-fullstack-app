from django.shortcuts import render


def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def product_library(request, *args, **kwargs):
    return render(request, 'frontend/product_library.html')