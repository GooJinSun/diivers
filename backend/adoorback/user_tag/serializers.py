from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.urls import reverse

from user_tag.models import UserTag
from adoorback.settings.base import BASE_URL
from adoorback.serializers import AdoorBaseSerializer

User = get_user_model()


class UserTagSerializer(serializers.ModelSerializer):
    tagged_user = serializers.SerializerMethodField()
    tagged_username = serializers.SerializerMethodField()

    def validate(self, attrs):
        if len(attrs.get('offset')) == -1:
            raise serializers.ValidationError('offset이 -1입니다')
        if len(attrs.get('length')) == 0:
            raise serializers.ValidationError('username length가 -1입니다')
        return attrs

    def get_tagged_user(self, obj):
        # FIXME: must change to username after merging userpage url change branch
        return BASE_URL + reverse('user-detail', kwargs={'pk': obj.tagged_user.id})

    def get_tagged_username(self, obj):
        return obj.tagged_user.username

    class Meta:
        model = UserTag
        fields = ['id', 'tagged_user', 'tagged_username', 'offset', 'length']
        validators = []
