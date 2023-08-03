from django.db import migrations
from django.utils import timezone

def add_product(apps, schema_editor):
    Product = apps.get_model('product', 'Product')
    ProductCategory = apps.get_model('product', 'ProductCategory')
    admin_user_id = 1  # You may need to change this to the actual ID of the admin user

    category = ProductCategory.objects.get(name='Cleaning')

    Product.objects.create(
        author_id=admin_user_id,
        title='Migration test2',
        created_date=timezone.now(),
        category=category,
        unit='Piece',
        added=False,
        standard_size=1,
        use_days=1,
        image=None
    )

class Migration(migrations.Migration):

    dependencies = [
        ('product', '0019_auto_20230803_1041')
    ]

    operations = [
        migrations.RunPython(add_product),
    ]
