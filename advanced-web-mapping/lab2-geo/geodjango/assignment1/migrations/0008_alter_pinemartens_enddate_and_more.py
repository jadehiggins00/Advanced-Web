# Generated by Django 4.2.5 on 2023-10-15 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assignment1', '0007_alter_pinemartens_datasettit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pinemartens',
            name='EndDate',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='pinemartens',
            name='RecordDate',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='pinemartens',
            name='StartDate',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='pinemartens',
            name='x_coord_IG',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='pinemartens',
            name='y_coord_IG',
            field=models.BigIntegerField(blank=True, null=True),
        ),
    ]
