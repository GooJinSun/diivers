from django.contrib.contenttypes.fields import GenericForeignKey
from django.db import models, transaction
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save

from like.models import Like
from notification.models import Notification
from adoorback.models import AdoorModel
from adoorback.utils.content_types import get_comment_type, get_generic_relation_type

from adoorback.utils.helpers import wrap_content

User = get_user_model()


class CommentManager(models.Manager):

    def comments_only(self, **kwargs):
        return self.exclude(content_type=get_comment_type(), **kwargs)

    def replies_only(self, **kwargs):
        return self.filter(content_type=get_comment_type(), **kwargs)


class Comment(AdoorModel):
    author = models.ForeignKey(User, related_name='comment_set', on_delete=models.CASCADE)
    is_private = models.BooleanField(default=False)
    is_anonymous = models.BooleanField(default=False)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.IntegerField()
    target = GenericForeignKey('content_type', 'object_id')

    replies = GenericRelation('self')
    comment_likes = GenericRelation(Like)
 
    comment_targetted_notis = GenericRelation(Notification,
                                              content_type_field='target_type',
                                              object_id_field='target_id')
    comment_originated_notis = GenericRelation(Notification,
                                               content_type_field='origin_type',
                                               object_id_field='origin_id')

    objects = CommentManager()

    @property
    def type(self):
        return self.__class__.__name__

    @property
    def liked_user_ids(self):
        return self.comment_likes.values_list('user_id', flat=True)

    class Meta:
        base_manager_name = 'objects'


@transaction.atomic
@receiver(post_save, sender=Comment)
def create_noti(instance, **kwargs):
    user = instance.target.author
    actor = instance.author
    origin = instance.target
    target = instance

    if user == actor:  # do not create notification for comment author him/herself.
        return
    if actor.id in user.user_report_blocked_ids: # do not create notification from/for blocked user
        return
    actor_name_ko = '익명의 사용자가' if instance.is_anonymous else f'{actor.username}님이'
    actor_name_en = 'An anonymous user' if instance.is_anonymous else f'{actor.username}'
    content_preview = wrap_content(instance.content)

    if origin.type == 'Comment':  # if is_reply
        message_ko = f'{actor_name_ko} 회원님의 댓글에 답글을 남겼습니다: "{content_preview}"'
        message_en = f'{actor_name_en} has replied to your comment: "{content_preview}"'
        redirect_url = f'/{origin.target.type.lower()}s/{origin.target.id}?anonymous={instance.is_anonymous}'
    else:  # if not reply
        origin_target_name_ko = '게시글' if origin.type == 'Article' else '답변'
        origin_target_name_en = 'post' if origin.type == 'Article' else 'answer'
        message_ko = f'{actor_name_ko} 회원님의 {origin_target_name_ko}에 댓글을 남겼습니다: "{content_preview}"'
        message_en = f'{actor_name_en} has commented on your {origin_target_name_en}: "{content_preview}"'
        redirect_url = f'/{origin.type.lower()}s/{origin.id}?anonymous={instance.is_anonymous}'

    Notification.objects.create(actor=actor,
                                user=user,
                                origin_id=origin.id,
                                origin_type=get_generic_relation_type(origin.type),
                                target_id=target.id,
                                target_type=get_comment_type(),
                                message_ko=message_ko,
                                message_en=message_en,
                                redirect_url=redirect_url)
