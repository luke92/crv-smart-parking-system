# Generated by Django 2.2.16 on 2020-12-04 20:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parkings', '0010_audits'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='audits',
            name='idUser',
        ),
        migrations.AddField(
            model_name='audits',
            name='username',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
