"""Django Model
Define Models for account APIs
"""
import secrets

from django.apps import apps
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models, transaction
from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

from adoorback.models import AdoorTimestampedModel
from adoorback.validators import AdoorUsernameValidator


def random_profile_color():
    # use random int so that initial users get different colors
    return '#{0:06X}'.format(secrets.randbelow(16777216))


class User(AbstractUser, AdoorTimestampedModel):
    """User Model
    This model extends the Django Abstract User model
    """
    username_validator = AdoorUsernameValidator()

    username = models.CharField(
        _('username'),
        max_length=20,
        unique=True,
        help_text=_('Required. 20 characters or fewer. Letters (alphabet & 한글), digits and _ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )
    email = models.EmailField(unique=True)
    question_history = models.CharField(null=True, max_length=500)
    profile_pic = models.CharField(default=random_profile_color, max_length=7)
    friends = models.ManyToManyField('self', symmetrical=True, blank=True)

    friendship_targetted_notis = GenericRelation("notification.Notification",
                                                 content_type_field='target_type',
                                                 object_id_field='target_id')
    friendship_originated_notis = GenericRelation("notification.Notification",
                                                  content_type_field='origin_type',
                                                  object_id_field='origin_id')

    class Meta:
        indexes = [
            models.Index(fields=['id']),
            models.Index(fields=['username']),
        ]
        ordering = ['id']

    @classmethod
    def are_friends(cls, user1, user2):
        return user2.id in user1.friend_ids or user1 == user2

    @property
    def type(self):
        return self.__class__.__name__

    @property
    def friend_ids(self):
        return list(self.friends.values_list('id', flat=True))

    @property
    def reported_user_ids(self):
        from user_report.models import UserReport
        return list(UserReport.objects.filter(user=self).values_list('reported_user_id', flat=True))

    @property
    def user_report_blocked_ids(self): # returns ids of users
        from user_report.models import UserReport
        return list(UserReport.objects.filter(user=self).values_list('reported_user_id', flat=True)) + list(UserReport.objects.filter(reported_user=self).values_list('user_id', flat=True))

    @property
    def content_report_blocked_ids(self): # returns ids of posts
        from content_report.models import ContentReport
        return list(ContentReport.objects.filter(user=self).values_list('post_id', flat=True))


class FriendRequest(AdoorTimestampedModel):
    """FriendRequest Model
    This model describes FriendRequest between users
    """
    requester = models.ForeignKey(
        get_user_model(), related_name='sent_friend_requests', on_delete=models.CASCADE)
    requestee = models.ForeignKey(
        get_user_model(), related_name='received_friend_requests', on_delete=models.CASCADE)
    accepted = models.BooleanField(null=True)

    friend_request_targetted_notis = GenericRelation("notification.Notification",
                                                     content_type_field='target_type',
                                                     object_id_field='target_id')
    friend_request_originated_notis = GenericRelation("notification.Notification",
                                                      content_type_field='origin_type',
                                                      object_id_field='origin_id')

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['requester', 'requestee', ], name='unique_friend_request'),
        ]
        indexes = [
            models.Index(fields=['-updated_at']),
        ]
        ordering = ['-updated_at']

    def __str__(self):
        return f'{self.requester} sent to {self.requestee} ({self.accepted})'

    @property
    def type(self):
        return self.__class__.__name__


@transaction.atomic
@receiver(m2m_changed)
def delete_friend_noti(action, pk_set, instance, **kwargs):
    if action == "post_remove":
        friend = User.objects.get(id=pk_set.pop())
        # remove friendship related notis from both users
        friend.friendship_targetted_notis.filter(user=instance).delete()
        instance.friendship_targetted_notis.filter(user=friend).delete()
        FriendRequest.objects.filter(requester=instance, requestee=friend).delete()
        FriendRequest.objects.filter(requester=friend, requestee=instance).delete()


@transaction.atomic
@receiver(post_save, sender=FriendRequest)
def create_friend_noti(created, instance, **kwargs):
    accepted = instance.accepted
    Notification = apps.get_model('notification', 'Notification')
    requester = instance.requester
    requestee = instance.requestee

    if requester.id in requestee.user_report_blocked_ids: # do not create notification from/for blocked user
        return

    if created:
        Notification.objects.create(user=requestee, actor=requester,
                                    origin=requester, target=instance,
                                    message=f'{requester.username}님이 친구 요청을 보냈습니다.',
                                    redirect_url=f'/users/{requester.id}')
        return
    elif accepted:
        Notification.objects.create(user=requestee, actor=requester,
                                    origin=requester, target=requester,
                                    message=f'{requester.username}님과 친구가 되었습니다.',
                                    redirect_url=f'/users/{requester.id}')
        Notification.objects.create(user=requester, actor=requestee,
                                    origin=requestee, target=requestee,
                                    message=f'{requestee.username}님과 친구가 되었습니다.',
                                    redirect_url=f'/users/{requestee.id}')
        # add friendship
        requester.friends.add(requestee)

    # make friend request notification invisible once requestee has responded
    instance.friend_request_targetted_notis.filter(user=requestee,
                                                   actor=requester).update(is_read=True,
                                                                           is_visible=False)
