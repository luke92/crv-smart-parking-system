# Generated by Django 2.2.16 on 2020-10-11 21:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camaras', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='camaras',
            name='height',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='camaras',
            name='matrix_camera_column',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='camaras',
            name='matrix_camera_row',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='camaras',
            name='width',
            field=models.IntegerField(default=0),
        ),
    ]
