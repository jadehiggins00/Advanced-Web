# Generated by Django 5.0 on 2023-12-29 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bird_hides', '0005_user_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=128),
        ),
    ]