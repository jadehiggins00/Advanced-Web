<<<<<<< HEAD
# Generated by Django 4.2.5 on 2023-12-20 18:59
=======
<<<<<<< HEAD
# Generated by Django 4.2.5 on 2023-12-21 18:13
=======
# Generated by Django 4.2.5 on 2023-12-21 16:36
>>>>>>> 0130e62667ecc81662a9b993e1e9f060a744c636
>>>>>>> deploy-v2

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assignment1', '0014_user_profile'),
    ]

    operations = [
        migrations.CreateModel(
            name='BirdHides',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('location', django.contrib.gis.db.models.fields.PointField(null=True, srid=4326)),
            ],
        ),
    ]
