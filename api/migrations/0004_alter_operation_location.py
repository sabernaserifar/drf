# Generated by Django 3.2.7 on 2023-03-20 22:58

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20230314_0651'),
    ]

    operations = [
        migrations.AlterField(
            model_name='operation',
            name='location',
            field=models.TextField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
