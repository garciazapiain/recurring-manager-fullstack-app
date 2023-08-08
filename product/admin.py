from django.contrib import admin
from .models import Product, ProductCategory, UserProduct

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__', 'author', 'category')  
    list_filter = ('author',) 

class UserProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'author','category')  
    list_filter = ('author',)  

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductCategory)
admin.site.register(UserProduct, UserProductAdmin)
