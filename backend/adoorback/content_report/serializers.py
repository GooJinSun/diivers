from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from django.contrib.auth import get_user_model

from content_report.models import ContentReport
from adoorback.serializers import AdoorBaseSerializer

User = get_user_model()


class ContentReportSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    post_id = serializers.IntegerField()

    def validate(self, data):
        pass # 본인이 작성한 게시글을 신고 가능하게 할 것인지?

    class Meta:
        model = ContentReport
        fields = ['user_id', 'post_id']
        validators = [
            UniqueTogetherValidator(
                queryset=ContentReport.objects.all(),
                fields=['user_id', 'post_id']
            )
        ]
