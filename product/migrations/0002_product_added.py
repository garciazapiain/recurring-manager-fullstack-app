# Generated by Django 4.1.4 on 2022-12-16 05:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='added',
            field=models.BooleanField(default=False),
        ),
    ]