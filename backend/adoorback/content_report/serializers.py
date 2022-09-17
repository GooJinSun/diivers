from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from content_report.models import ContentReport
from adoorback.serializers import AdoorBaseSerializer


class ContentReportSerializer(serializers.ModelSerializer):
    target_type = serializers.SerializerMethodField()
    target_id = serializers.SerializerMethodField()

    def get_target_type(self, obj):
        return obj.post.target_type

    def get_target_id(self, obj):
        return obj.post.object_id

    class Meta:
        model = ContentReport
        fields = ['target_type', 'target_id']
