# Generated by Django 3.2.13 on 2023-02-13 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_report', '0002_auto_20221203_2239'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='userreport',
            name='unique_user_report',
        ),
        migrations.AddConstraint(
            model_name='userreport',
            constraint=models.UniqueConstraint(condition=models.Q(('deleted__isnull', True)), fields=('user', 'reported_user'), name='unique_user_report'),
        ),
    ]
