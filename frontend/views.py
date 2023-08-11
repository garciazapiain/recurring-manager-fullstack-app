from django.shortcuts import render
from django.contrib.auth.views import LoginView
from django.conf import settings
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.urls import reverse

import os


def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def product_library(request, *args, **kwargs):
    return render(request, 'frontend/product_library.html')

class CustomLoginView(LoginView):
    template_name = 'frontend/login.html'
    success_url = '/'

    def get_success_url(self):
        return self.success_url

def register(request):
    template_path = os.path.join(settings.BASE_DIR, 'frontend/templates/frontend', 'register.html')
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