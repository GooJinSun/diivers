from rest_framework import serializers
from django.contrib.auth import get_user_model

from user_tag.models import UserTag
from adoorback.serializers import AdoorBaseSerializer

User = get_user_model()

