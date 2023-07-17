# Generated by Django 4.1.7 on 2023-07-17 12:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('product', '0009_alter_product_inventory_updated_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('inventory_updated_date', models.DateTimeField(blank=True, default=django.utils.timezone.now, null=True)),
                ('added', models.BooleanField(default=False)),
                ('unit', models.CharField(max_length=10)),
                ('standard_size', models.IntegerField()),
                ('use_days', models.IntegerField()),
                ('current_inventory', models.IntegerField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='product.productcategory')),
            ],
            options={
                'verbose_name': 'User Product',
                'verbose_name_plural': 'User Products',
            },
        ),
    ]