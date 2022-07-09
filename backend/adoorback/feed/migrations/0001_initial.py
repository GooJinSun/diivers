# Generated by Django 3.2.13 on 2022-07-09 07:44

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('content', models.TextField(validators=[django.core.validators.MinLengthValidator(1, 'content length must be greater than 1')])),
                ('selected_date', models.DateTimeField(null=True)),
                ('is_admin_question', models.BooleanField(default=False)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_set', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['id'],
                'base_manager_name': 'objects',
            },
        ),
        migrations.CreateModel(
            name='ResponseRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='feed.question')),
                ('requestee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_response_request_set', to=settings.AUTH_USER_MODEL)),
                ('requester', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_response_request_set', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Response',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('content', models.TextField(validators=[django.core.validators.MinLengthValidator(1, 'content length must be greater than 1')])),
                ('share_with_friends', models.BooleanField(default=True)),
                ('share_anonymously', models.BooleanField(default=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='response_set', to=settings.AUTH_USER_MODEL)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='response_set', to='feed.question')),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('content', models.TextField(validators=[django.core.validators.MinLengthValidator(1, 'content length must be greater than 1')])),
                ('author_id', models.IntegerField()),
                ('object_id', models.IntegerField()),
                ('share_with_friends', models.BooleanField(default=True)),
                ('share_anonymously', models.BooleanField(default=True)),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
            ],
            options={
                'ordering': ['-id'],
                'base_manager_name': 'objects',
            },
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('content', models.TextField(validators=[django.core.validators.MinLengthValidator(1, 'content length must be greater than 1')])),
                ('share_with_friends', models.BooleanField(default=True)),
                ('share_anonymously', models.BooleanField(default=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='article_set', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddIndex(
            model_name='responserequest',
            index=models.Index(fields=['-id'], name='feed_respon_id_774d20_idx'),
        ),
        migrations.AddConstraint(
            model_name='responserequest',
            constraint=models.UniqueConstraint(fields=('requester', 'requestee', 'question'), name='unique_response_request'),
        ),
        migrations.AddIndex(
            model_name='response',
            index=models.Index(fields=['-id'], name='feed_respon_id_1e1912_idx'),
        ),
        migrations.AddIndex(
            model_name='post',
            index=models.Index(fields=['-id'], name='feed_post_id_6ecf03_idx'),
        ),
        migrations.AddIndex(
            model_name='article',
            index=models.Index(fields=['-id'], name='feed_articl_id_9bae57_idx'),
        ),
    ]
