from django.contrib import admin
from .models import Product, ProductCategory, UserProduct

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__', 'author')  # Add 'author' to the list_display
    list_filter = ('author',)  # Add 'author' to the list_filter

class UserProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'author')  # Add 'author' to the list_display
    list_filter = ('author',)  # Add 'author' to the list_filter

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductCategory)
admin.site.register(UserProduct, UserProductAdmin)
