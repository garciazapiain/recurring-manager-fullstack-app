from rest_framework import serializers
from .models import Product
from .models import ProductCategory
from .models import UserProduct
from datetime import datetime, timedelta, timezone

class ProductSerializer(serializers.ModelSerializer):
    product_added_user = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'title', 'category', 'author', 'unit', 'standard_size', 'use_days','product_added_user', 'image')
        read_only_fields = ('inventory_updated_date', 'product_added_user')

    def get_product_added_user(self, instance):
        user = self.context['request'].user
        if user.is_authenticated:
            return instance.userproduct_set.filter(author=user).exists()
        return False

    # def get_estimated_inventory(self, instance):
    #     last_inventory = int(instance.current_inventory)
    #     last_updated_date = instance.inventory_updated_date
    #     standard_size = int(instance.standard_size)
    #     use_days = int(instance.use_days)

    #     if last_updated_date is not None:
    #         today = datetime.now(timezone.utc)
    #         days_passed = (today - last_updated_date).days
    #         if days_passed < 0:
    #             days_passed = 0
    #         estimated_inventory = max(last_inventory - (days_passed // use_days) * standard_size, 0)
    #     else:
    #         estimated_inventory = 0  # Set a default value or handle it based on your requirements

    #     return estimated_inventory
    
    # def get_estimated_remaining_days(self, instance):
    #     estimated_inventory = self.get_estimated_inventory(instance)
    #     use_days = int(instance.use_days)
    #     standard_size = int(instance.standard_size)
    #     estimated_remaining_days = estimated_inventory * use_days // standard_size if estimated_inventory > 0 else 0
    #     return estimated_remaining_days

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'

class UserProductSerializer(serializers.ModelSerializer):
    estimated_inventory = serializers.SerializerMethodField()
    estimated_remaining_days = serializers.SerializerMethodField()
    class Meta:
        model = UserProduct
        fields = ('id', 'title', 'category', 'author', 'unit', 'added', 'standard_size', 'use_days', 'current_inventory', 'inventory_updated_date', 'estimated_inventory', 'estimated_remaining_days', 'master_product', 'image')
        read_only_fields = ('current_inventory', 'inventory_updated_date')
        
    def get_estimated_inventory(self, instance):
        last_inventory = int(instance.current_inventory)
        last_updated_date = instance.inventory_updated_date
        standard_size = int(instance.standard_size)
        use_days = int(instance.use_days)

        if last_updated_date is not None:
            today = datetime.now(timezone.utc)
            days_passed = (today - last_updated_date).days
            if days_passed < 0:
                days_passed = 0
            estimated_inventory = max(last_inventory - (days_passed // use_days) * standard_size, 0)
        else:
            estimated_inventory = 0  # Set a default value or handle it based on your requirements

        return estimated_inventory
    
    def get_estimated_remaining_days(self, instance):
        estimated_inventory = self.get_estimated_inventory(instance)
        use_days = int(instance.use_days)
        standard_size = int(instance.standard_size)
        estimated_remaining_days = estimated_inventory * use_days // standard_size if estimated_inventory > 0 else 0
        return estimated_remaining_days

