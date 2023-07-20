# Create your tests here.
from django.contrib.auth.models import User
from django.test import TestCase, Client
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate
from .models import Product, ProductCategory, UserProduct
from .views import ProductView, UserProductView
from .serializers import ProductSerializer
from django.urls import reverse
import json

class ProductViewTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.client = Client()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.other_user = User.objects.create_user(username='otheruser', password='otherpassword')
        self.category = ProductCategory.objects.create(name='Cleaning')  # Create ProductCategory instance
        self.product1 = Product.objects.create(
            title='Product 1',
            author=self.user,
            category=self.category,
            unit='unit',
            standard_size=10,
            use_days=5,
            current_inventory=100
        )
        self.product2 = Product.objects.create(
            title='Product 2',
            author=self.other_user,
            category=self.category,
            unit='unit',
            standard_size=10,
            use_days=5,
            current_inventory=100
            )
    def test_authentication_required(self):
        request = self.factory.get('/products/')
        view = ProductView.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_queryset_filtering(self):
        self.client.login(username='testuser', password='testpassword')
        request = self.factory.get('/products/')
        force_authenticate(request, user=self.user)
        view = ProductView.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], self.product1.title)
    
    def test_add_to_user_product(self):
        self.client.login(username='testuser', password='testpassword')
        current_inventory = 50

        pk_value = self.product1.pk

        # Simulate a PUT request to add the product to the user's products
        url = reverse('add-to-user-product', kwargs={'pk': pk_value})

        # Send the data as JSON using the 'content_type' argument
        response = self.client.put(url, data=json.dumps({'current_inventory': current_inventory}), content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if the UserProduct was created with the correct data
        user_product = UserProduct.objects.filter(author=self.user, master_product=self.product1).first()
        self.assertIsNotNone(user_product)
        self.assertEqual(user_product.title, self.product1.title)
        self.assertEqual(user_product.category, self.product1.category)
        self.assertEqual(user_product.added, True)
        self.assertEqual(user_product.unit, self.product1.unit)
        self.assertEqual(user_product.standard_size, self.product1.standard_size)
        self.assertEqual(user_product.use_days, self.product1.use_days)
        self.assertEqual(user_product.current_inventory, current_inventory)

class UserProductViewTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.client = Client()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.other_user = User.objects.create_user(username='otheruser', password='otherpassword')
        self.category = ProductCategory.objects.create(name='Cleaning')  # Create ProductCategory instance
        self.user_product = UserProduct.objects.create(
            title='User Product',
            author=self.user,
            category=self.category,
            unit='unit',
            standard_size=10,
            use_days=5,
            current_inventory=100
        )
    
    def test_queryset_filtering(self):
        self.client.login(username='testuser', password='testpassword')
        request = self.factory.get('/userproducts/')
        force_authenticate(request, user=self.user)
        view = UserProductView.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], self.user_product.title)

    def test_update_inventory(self):
        self.client.login(username='testuser', password='testpassword')
        new_inventory_value = 50

        url = reverse('userproduct-update-inventory', kwargs={'pk': self.user_product.pk})

        # Simulate a PUT request to update the inventory of the user product
        data = {'current_inventory': new_inventory_value}
        response = self.client.put(url, data=json.dumps({'current_inventory': new_inventory_value}), content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if the UserProduct was updated with the correct data
        updated_user_product = UserProduct.objects.get(pk=self.user_product.pk)
        self.assertEqual(updated_user_product.current_inventory, new_inventory_value)

    def test_update_inventory_unauthenticated(self):
        # Simulate a PUT request to update the inventory without authentication
        new_inventory_value = 50
        self.url = reverse('userproduct-update-inventory', kwargs={'pk': self.user_product.pk})
        data = {'current_inventory': new_inventory_value}
        response = self.client.put(self.url, data=data)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
