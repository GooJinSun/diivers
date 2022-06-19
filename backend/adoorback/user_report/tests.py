from django.contrib.auth import get_user_model
from django.test import Client
from rest_framework.test import APIClient
from rest_framework.utils import json
from test_plus.test import TestCase

from user_report.models import UserReport
from adoorback.utils.seed import set_seed

User = get_user_model()
N = 10


class UserReportTestCase(TestCase):
    def setUp(self):
        set_seed(N)

    def test_feed_count(self):
        self.assertEqual(Article.objects.count(), N)
        self.assertEqual(Question.objects.admin_questions_only().count(), N)
        self.assertEqual(Question.objects.custom_questions_only().count(), N)
        self.assertLessEqual(Question.objects.daily_questions().count(), 30)
        self.assertEqual(Response.objects.count(), N)
        self.assertEqual(Post.objects.count(), N * 4)

    def test_user_report(self):
        pass
