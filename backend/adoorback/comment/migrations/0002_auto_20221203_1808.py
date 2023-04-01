# Generated by Django 3.2.13 on 2022-12-03 09:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='deleted',
            field=models.DateTimeField(db_index=True, editable=False, null=True),
        ),
        migrations.AddField(
            model_name='comment',
            name='deleted_by_cascade',
            field=models.BooleanField(default=False, editable=False),
        ),
    ]
