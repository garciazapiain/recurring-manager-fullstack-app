# Generated by Django 4.1.7 on 2023-07-24 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0015_product_image_userproduct_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.CharField(max_length=1000, null=True),
        ),
    ]
