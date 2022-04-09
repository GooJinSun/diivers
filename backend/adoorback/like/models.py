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


class LikeManager(models.Manager):
    use_for_related_fields = True

    def comment_likes_only(self, **kwargs):
        return self.filter(content_type=get_comment_type(), **kwargs)

    def feed_likes_only(self, **kwargs):
        return self.exclude(content_type=get_comment_type(), **kwargs)


class Like(AdoorTimestampedModel):
    user = models.ForeignKey(User, related_name='like_set', on_delete=models.CASCADE)
    is_anonymous = models.BooleanField(default=False)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.IntegerField()
    target = GenericForeignKey('content_type', 'object_id')

    like_targetted_notis = GenericRelation(Notification,
                                           content_type_field='target_type',
                                           object_id_field='target_id')
    like_originated_notis = GenericRelation(Notification,
                                            content_type_field='origin_type',
                                            object_id_field='origin_id')
    objects = LikeManager()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'content_type', 'object_id'], name='unique_like'),
        ]
        ordering = ['id']

    def __str__(self):
        return f'{self.user} likes {self.content_type} ({self.object_id})'

    @property
    def type(self):
        return self.__class__.__name__


@transaction.atomic
@receiver(post_save, sender=Like)
def create_like_noti(instance, **kwargs):
    user = instance.target.author
    actor = instance.user
    origin = instance.target
    target = instance

    if user == actor:  # do not create notification for liker him/herself.
        return
    actor_name = '익명의 사용자가' if instance.is_anonymous else f'{actor.username}님이'

    if origin.type == 'Comment' and origin.target.type == 'Comment':  # if is reply
        message = f'{actor_name} 회원님의 댓글을 좋아합니다.'
        redirect_url = f'/{origin.target.target.type.lower()}s/' \
                       f'{origin.target.target.id}?anonymous={instance.is_anonymous}'
    elif origin.type == 'Comment':  # if is comment
        message = f'{actor_name} 회원님의 댓글을 좋아합니다.'
        redirect_url = f'/{origin.target.type.lower()}s/' \
                       f'{origin.target.id}?anonymous={instance.is_anonymous}'
    else:  # if is post
        message = f'{actor_name} 회원님의 게시글을 좋아합니다.'
        redirect_url = f'/{origin.type.lower()}s/{origin.id}?anonymous={instance.is_anonymous}'

    Notification.objects.create(actor=actor, user=user,
                                origin=origin, target=target,
                                message=message, redirect_url=redirect_url)
