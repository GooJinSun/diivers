# Generated by Django 3.2.13 on 2023-02-12 08:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_user_language'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='date_of_birth',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='ethnicity',
            field=models.IntegerField(choices=[(0, '미국 원주민/알래스카 원주민 (American Indian/Alaska Native)'), (1, '아시아인 (Asian)'), (2, '흑인/아프리카계 미국인 (Black/African American)'), (3, '히스패닉/라틴계 미국인 (Hispanic/Latino)'), (4, '하와이 원주민/다른 태평양 섬 주민 (Native Hawaiian/Other Pacific Islander)'), (5, '백인 (White)')], null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='gender',
            field=models.IntegerField(choices=[(0, '여성'), (1, '남성'), (2, '트랜스젠더 (transgender)'), (3, '논바이너리 (non-binary/non-conforming)'), (4, '응답하고 싶지 않음')], null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='research_agreement',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='language',
            field=models.CharField(choices=[('ko', '한국어'), ('en', '영어')], default='ko', max_length=10),
        ),
    ]
