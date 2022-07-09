from django.contrib.auth import get_user_model
from django.test import Client
from rest_framework.test import APIClient
from rest_framework.utils import json
from test_plus.test import TestCase

from user_report.models import UserReport
from feed.models import Article, Question, Response
from adoorback.utils.seed import set_seed

User = get_user_model()
N = 10


class UserReportTestCase(TestCase):
    def setUp(self):
        set_seed(N)

    def test_user_report(self):
        user1 = self.make_user(username='user1')
        user2 = self.make_user(username='user2')
        user3 = self.make_user(username='user3')

        Article.objects.all().delete()
        Response.objects.all().delete()
        Question.objects.all().delete()

        # user1 creates article
        with self.login(username=user1.username, password='password'):
            data = {"content": "test content1", "share_anonymously": True}
            response = self.post('article-list', data=data, extra={'format': 'json'})
            self.assertEqual(response.status_code, 201)

        # user2 creates article
        with self.login(username=user2.username, password='password'):
            data = {"content": "test content2", "share_anonymously": True}
            response = self.post('article-list', data=data, extra={'format': 'json'})
            self.assertEqual(response.status_code, 201)

        # user3 reports user1
        with self.login(username=user3.username, password='password'):
            user_report = UserReport.objects.create(user_id=user3.id, reported_user_id=user1.id)

        with self.login(username=user3.username, password='password'):
            response = self.get('anonymous-feed-post-list')
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.data['count'], 1) # article of user1 is blocked

        with self.login(username=user2.username, password='password'):
            response = self.get('anonymous-feed-post-list')
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.data['count'], 2)
