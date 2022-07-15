from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow authors of an article/comment to edit/delete it.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of objects to update/destroy.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


class IsShared(permissions.BasePermission):
    """
    Custom permission to only allow friends of author to view author profile.
    """

    def has_object_permission(self, request, view, obj):
        from django.contrib.auth import get_user_model
        User = get_user_model()

        if obj.type == 'Question' or obj.share_anonymously:
            return True
        elif obj.share_with_friends and User.are_friends(request.user, obj.author):
            return True
        else:
            return obj.author == request.user


class IsNotBlocked(permissions.BasePermission):
    """
    Custom permission to only display contents (of users) that are not blocked.
    """

    def has_object_permission(self, request, view, obj):
        from django.contrib.auth import get_user_model
        User = get_user_model()

        if obj.type in ['Question', 'Response', 'Article']:
            return obj.author.id not in request.user.user_report_blocked_ids
        else:
            return obj.id not in request.user.user_report_blocked_ids
