# Generated by Django 3.2.13 on 2023-02-13 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('like', '0002_auto_20221203_1732'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='like',
            name='unique_like',
        ),
        migrations.AddConstraint(
            model_name='like',
            constraint=models.UniqueConstraint(condition=models.Q(('deleted__isnull', True)), fields=('user', 'content_type', 'object_id'), name='unique_like'),
        ),
    ]
