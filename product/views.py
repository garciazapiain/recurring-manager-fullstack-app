from django.shortcuts import render
from .serializers import ProductSerializer 
from .serializers import ProductCategorySerializer 
from rest_framework import viewsets      
from .models import Product                 
from .models import ProductCategory    
from .forms import ProductForm
from rest_framework.viewsets import ModelViewSet

class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer   
    queryset = Product.objects.all()
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_serializer_context(self):
        return {'request': self.request}

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def list(self, request):
        # your code here
        products = self.queryset
        serializer = self.serializer_class(products, many=True)
        return Response(serializer.data)

    def create(self, request):
        # your code here
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def as_view(self, actions=None, **kwargs):
        actions = {
            'get': 'list',
            'post': 'create',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }
        return super(ProductViewSet, self).as_view(actions=actions, **kwargs)

class ProductCategoryView(viewsets.ModelViewSet):  
    serializer_class = ProductCategorySerializer   
    queryset = ProductCategory.objects.all()
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_serializer_context(self):
        return {'request': self.request}

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def as_view(self, actions=None, **kwargs):
        actions = {
            'get': 'list',
            'post': 'create',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }
        return super().as_view(actions=actions, **kwargs) 

def add_product(request):
        if request.method == 'POST':
            form = ProductForm(request.POST)
            if form.is_valid():
                product = form.save()
                return HttpResponseRedirect('/products/')
        else:
            form = ProductForm()

        return render(request, 'add_product.html', {'form': form}) 
