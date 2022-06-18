from django.contrib.auth import get_user_model
from django.test import Client
from rest_framework.test import APIClient
from rest_framework.utils import json
from test_plus.test import TestCase

from user_report.models import UserReport
from adoorback.utils.seed import set_seed

User = get_user_model()
N = 10