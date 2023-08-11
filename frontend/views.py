from django.shortcuts import render
from django.contrib.auth.views import LoginView


def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def product_library(request, *args, **kwargs):
    return render(request, 'frontend/product_library.html')

class CustomLoginView(LoginView):
    template_name = 'frontend/login.html'
    success_url = '/'

    def get_success_url(self):
        return self.success_url