from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from django.contrib.auth import get_user_model

from user_report.models import UserReport
from adoorback.serializers import AdoorBaseSerializer

User = get_user_model()


class UserReportSerializer(serializers.ModelSerializer):
    reported_user_id = serializers.IntegerField()

    class Meta:
        model = UserReport
        fields = ['reported_user_id']
