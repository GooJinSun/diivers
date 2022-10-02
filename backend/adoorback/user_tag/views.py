from django.db import transaction, IntegrityError
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

from user_tag.models import UserTag
from account.serializers import UserFriendshipStatusSerializer

from adoorback.permissions import IsOwnerOrReadOnly
from adoorback.content_types import get_generic_relation_type
from adoorback.validators import adoor_exception_handler

User = get_user_model()


class UserTagSearch(generics.ListAPIView):
    """
    List friends to tag
    """
    serializer_class = UserFriendshipStatusSerializer
    permission_classes = [IsAuthenticated]

    def get_exception_handler(self):
        return adoor_exception_handler

    def get_queryset(self):
        username = self.request.GET.get('query')
        user = self.request.user
        queryset = User.objects.none()
        if username:
            queryset = user.friends.filter(
                username__icontains=self.request.GET.get('query'))[:10]
            # queryset = queryset.order_by('username')
        return queryset