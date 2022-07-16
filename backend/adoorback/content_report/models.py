from django.db import models, transaction
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

from adoorback.models import AdoorTimestampedModel

User = get_user_model()


class ContentReport(AdoorTimestampedModel):
    user = models.ForeignKey()
