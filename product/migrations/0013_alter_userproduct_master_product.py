# Generated by Django 4.1.7 on 2023-07-17 12:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0012_alter_userproduct_master_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userproduct',
            name='master_product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='product.userproduct'),
        ),
    ]