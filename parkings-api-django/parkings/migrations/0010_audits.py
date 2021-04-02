# Generated by Django 2.2.16 on 2020-12-03 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parkings', '0009_reports'),
    ]

    operations = [
        migrations.CreateModel(
            name='Audits',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('idUser', models.IntegerField(default=0, null=True)),
                ('fecha', models.DateTimeField(default=0, null=True)),
                ('tipo', models.CharField(max_length=50, null=True)),
                ('operacion', models.CharField(max_length=50, null=True)),
                ('detalle', models.CharField(max_length=512, null=True)),
            ],
        ),
    ]