# Generated by Django 4.1.7 on 2023-07-24 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0014_alter_userproduct_master_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='userproduct',
            name='image',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
