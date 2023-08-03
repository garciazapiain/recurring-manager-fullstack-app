from django.db import migrations
from django.utils import timezone

def add_products(apps, schema_editor):
    Product = apps.get_model('product', 'Product')
    ProductCategory = apps.get_model('product', 'ProductCategory')
    admin_user_id = 1  # You may need to change this to the actual ID of the admin user

    # Get or create the categories for each product
    cleaning_category, _ = ProductCategory.objects.get_or_create(name='Cleaning')
    toiletries_category, _ = ProductCategory.objects.get_or_create(name='Toiletries')
    cooking_category, _ = ProductCategory.objects.get_or_create(name='Cooking')
    electronics_category, _ = ProductCategory.objects.get_or_create(name='Electronics')
    beauty_category, _ = ProductCategory.objects.get_or_create(name='Beauty')
    office_category, _ = ProductCategory.objects.get_or_create(name='Office')
    health_category, _ = ProductCategory.objects.get_or_create(name='Health')

# Assuming you have the admin_user_id and ProductCategory objects for each category
# If not, you can get or create them as shown in the previous examples

    products_to_create = [
        Product(
            author_id=admin_user_id,
            title='Printer Paper',
            created_date=timezone.now(),
            category=office_category,
            unit='Pack',
            added=False,
            standard_size='500',
            use_days='250',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Supplements',
            created_date=timezone.now(),
            category=health_category,
            unit='Bottle',
            added=False,
            standard_size='90',
            use_days='30',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Toothpaste',
            created_date=timezone.now(),
            category=toiletries_category,
            unit='Mililiter',
            added=False,
            standard_size='150',
            use_days='45',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Cooking Oil',
            created_date=timezone.now(),
            category=cooking_category,
            unit='Liter',
            added=False,
            standard_size='1',
            use_days='100',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Face Wash',
            created_date=timezone.now(),
            category=beauty_category,
            unit='Mililiter',
            added=False,
            standard_size='200',
            use_days='30',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Staples',
            created_date=timezone.now(),
            category=office_category,
            unit='Pack',
            added=False,
            standard_size='100',
            use_days='200',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Shampoo',
            created_date=timezone.now(),
            category=toiletries_category,
            unit='Mililiter',
            added=False,
            standard_size='250',
            use_days='45',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Hand Soap',
            created_date=timezone.now(),
            category=toiletries_category,
            unit='Piece',
            added=False,
            standard_size='1',
            use_days='90',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Notebook',
            created_date=timezone.now(),
            category=office_category,
            unit='Piece',
            added=False,
            standard_size='1',
            use_days='365',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Dish Soap',
            created_date=timezone.now(),
            category=cleaning_category,
            unit='Mililiter',
            added=False,
            standard_size='500',
            use_days='200',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Deodorant',
            created_date=timezone.now(),
            category=toiletries_category,
            unit='Stick',
            added=False,
            standard_size='1',
            use_days='120',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Rice',
            created_date=timezone.now(),
            category=cooking_category,
            unit='Kilogram',
            added=False,
            standard_size='1',
            use_days='40',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Lip Balm',
            created_date=timezone.now(),
            category=beauty_category,
            unit='Stick',
            added=False,
            standard_size='1',
            use_days='90',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Sunscreen',
            created_date=timezone.now(),
            category=health_category,
            unit='Mililiter',
            added=False,
            standard_size='200',
            use_days='90',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Disinfectant Spray',
            created_date=timezone.now(),
            category=cleaning_category,
            unit='Mililiter',
            added=False,
            standard_size='250',
            use_days='120',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Hand Sanitizer',
            created_date=timezone.now(),
            category=toiletries_category,
            unit='Mililiter',
            added=False,
            standard_size='250',
            use_days='45',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Pasta',
            created_date=timezone.now(),
            category=cooking_category,
            unit='Kilograms',
            added=False,
            standard_size='1',
            use_days='50',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Mascara',
            created_date=timezone.now(),
            category=beauty_category,
            unit='Mililiter',
            added=False,
            standard_size='10',
            use_days='60',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Sticky Notes',
            created_date=timezone.now(),
            category=office_category,
            unit='Pack',
            added=False,
            standard_size='1',
            use_days='120',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Band-Aids',
            created_date=timezone.now(),
            category=health_category,
            unit='Pack',
            added=False,
            standard_size='1',
            use_days='365',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Glass Cleaner',
            created_date=timezone.now(),
            category=cleaning_category,
            unit='Bottle',
            added=False,
            standard_size='200',
            use_days='30',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Body Lotion',
            created_date=timezone.now(),
            category=beauty_category,
            unit='Mililiter',
            added=False,
            standard_size='200',
            use_days='60',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Coffee beans',
            created_date=timezone.now(),
            category=cooking_category,
            unit='Kilograms',
            added=False,
            standard_size='1',
            use_days='120',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Lipstick',
            created_date=timezone.now(),
            category=beauty_category,
            unit='Piece',
            added=False,
            standard_size='1',
            use_days='120',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Whiteboard Marker',
            created_date=timezone.now(),
            category=office_category,
            unit='Pack',
            added=False,
            standard_size='1',
            use_days='200',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Allergy Medicine',
            created_date=timezone.now(),
            category=health_category,
            unit='Box',
            added=False,
            standard_size='1',
            use_days='30',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Conditioner',
            created_date=timezone.now(),
            category=toiletries_category,
            unit='Mililiter',
            added=False,
            standard_size='250',
            use_days='120',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Body Wash',
            created_date=timezone.now(),
            category=beauty_category,
            unit='Mililiter',
            added=False,
            standard_size='300',
            use_days='120',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Ballpoint Pen',
            created_date=timezone.now(),
            category=office_category,
            unit='Piece',
            added=False,
            standard_size='1',
            use_days='250',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Hair Gel',
            created_date=timezone.now(),
            category=toiletries_category,
            unit='Mililiter',
            added=False,
            standard_size='150',
            use_days='250',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Nail Polish',
            created_date=timezone.now(),
            category=beauty_category,
            unit='Mililiter',
            added=False,
            standard_size='1',
            use_days='90',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Highlighter',
            created_date=timezone.now(),
            category=office_category,
            unit='Piece',
            added=False,
            standard_size='1',
            use_days='365',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Cough Syrup',
            created_date=timezone.now(),
            category=health_category,
            unit='Mililiter',
            added=False,
            standard_size='100',
            use_days='365',
            image=None,
        ),
        Product(
            author_id=admin_user_id,
            title='Vacuum Cleaner Bags',
            created_date=timezone.now(),
            category=cleaning_category,
            unit='Piece',
            added=False,
            standard_size='1',
            use_days='90',
            image=None,
        ), 
    ]

    Product.objects.bulk_create(products_to_create)


class Migration(migrations.Migration):

    dependencies = [
        # Adjust this to the correct dependency of the previous migration
        ('product', '0021_alter_product_unit'),
    ]

    operations = [
        migrations.RunPython(add_products),
    ]
