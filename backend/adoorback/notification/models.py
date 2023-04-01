from django.contrib.contenttypes.fields import GenericForeignKey
from django.db import models, transaction
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from adoorback.models import AdoorTimestampedModel

from firebase_admin.messaging import Message
from firebase_admin.messaging import Notification as FirebaseNotification
from fcm_django.models import FCMDevice
from safedelete.models import SafeDeleteModel
from safedelete.models import SOFT_DELETE_CASCADE
from safedelete.managers import SafeDeleteManager

User = get_user_model()


class NotificationManager(SafeDeleteManager):

    def visible_only(self, **kwargs):
        return self.filter(is_visible=True, **kwargs)

    def unread_only(self, **kwargs):
        return self.filter(is_read=False, **kwargs)

    def admin_only(self, **kwargs):
        admin = User.objects.filter(is_superuser=True).first()
        return self.filter(actor=admin, **kwargs)


def default_user():
    return User.objects.filter(is_superuser=True).first()


class Notification(AdoorTimestampedModel, SafeDeleteModel):
    user = models.ForeignKey(User, related_name='received_noti_set',
                             on_delete=models.CASCADE, null=True)
    actor = models.ForeignKey(User, related_name='sent_noti_set',
                              on_delete=models.CASCADE, null=True)

    # target: notification을 발생시킨 직접적인 원인(?)
    target_type = models.ForeignKey(ContentType,
                                    on_delete=models.PROTECT,
                                    null=True,
                                    related_name='targetted_noti_set')
    target_id = models.IntegerField(null=True)
    target = GenericForeignKey('target_type', 'target_id')

    # origin: target의 target (target의 target이 없을 경우 target의 직접적인 발생지)
    origin_type = models.ForeignKey(ContentType,
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    related_name='origin_noti_set')
    origin_id = models.IntegerField(null=True)
    origin = GenericForeignKey('origin_type', 'origin_id')

    # redirect: target의 근원지(?), origin != redirect_url의 모델일 경우가 있음 (e.g. reply)
    redirect_url = models.CharField(max_length=150)
    message = models.CharField(max_length=100)

    is_visible = models.BooleanField(default=True)
    is_read = models.BooleanField(default=False)

    objects = NotificationManager()

    _safedelete_policy = SOFT_DELETE_CASCADE

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
        ] 

    def __str__(self):
        return self.message


@transaction.atomic
@receiver(post_save, sender=Notification)
def send_firebase_notification(created, instance, **kwargs):
    if not created:
        return

    message = Message(
        notification = FirebaseNotification(
            title = 'Diivers',
            body = instance.message,
        ),
        data = {
            'url': instance.redirect_url
        }
    )

    try:
        FCMDevice.objects.filter(user_id = instance.user.id).send_message(message, False)
    except Exception as e:
        print("error while sending a firebase notification: ", e)
    