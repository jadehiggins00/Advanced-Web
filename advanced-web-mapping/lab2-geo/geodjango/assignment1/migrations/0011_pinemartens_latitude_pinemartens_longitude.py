# Generated by Django 4.2.5 on 2023-10-16 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assignment1', '0010_alter_pinemartens_sample_spa_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='pinemartens',
            name='latitude',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='pinemartens',
            name='longitude',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
