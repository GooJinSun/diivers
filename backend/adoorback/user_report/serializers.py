from rest_framework import serializers
from django.contrib.auth import get_user_model

from user_report.models import UserReport
from adoorback.serializers import AdoorBaseSerializer

User = get_user_model()


class UserReportSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    reported_user_id = serializers.IntegerField()

    def validate(self, data):
        if data.get('reported_user_id') == data.get('user_id'):
            raise serializers.ValidationError('본인은 신고할 수 없어요...')
        return data

    class Meta:
        model = UserReport
        fields = ['user_id', 'reported_user_id']
        validators = [
            UniqueTogetherValidator(
                queryset=UserReport.objects.all(),
                fields=['user_id', 'reported_user_id']
            )
        ]
