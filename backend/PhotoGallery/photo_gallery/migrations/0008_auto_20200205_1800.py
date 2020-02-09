# Generated by Django 3.0.2 on 2020-02-05 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photo_gallery', '0007_userdetails'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userdetails',
            name='avtar',
        ),
        migrations.AddField(
            model_name='userdetails',
            name='gender',
            field=models.CharField(default=1, max_length=10),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='userdetails',
            name='profile_picture',
            field=models.FileField(upload_to=''),
        ),
    ]
