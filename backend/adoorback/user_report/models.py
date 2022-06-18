from django.contrib.contenttypes.fields import GenericForeignKey
from django.db import models, transaction
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

from adoorback.content_types import get_comment_type
from adoorback.models import AdoorTimestampedModel
from notification.models import Notification

User = get_user_model()


class UserReport(AdoorTimestampedModel):
    """UserReport Model
    This model describes UserReport between users
    """
    user = models.ForeignKey(
        get_user_model(), related_name='filed_user_reports', on_delete=models.CASCADE)
    reported_user = models.ForeignKey(
        get_user_model(), related_name='received_user_report', on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'reported_user'], name='unique_user_report'),
        ]
        indexes = [
            models.Index(fields=['-created_at']),
        ]
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user} reported {self.reported_user}'

    @property
    def type(self):
        return self.__class__.__name__
