from django.contrib.contenttypes.fields import GenericForeignKey
from django.db import models, transaction
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save

from like.models import Like
from account.models import User
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
    
    @property
    def participants(self):
        return self.replies.values_list('author_id', flat=True).distinct()

    class Meta:
        base_manager_name = 'objects'


@receiver(post_save, sender=Comment)
def create_noti(instance, **kwargs):
    origin_author = instance.target.author
    actor = instance.author
    origin = instance.target
    target = instance

    actor_name_ko = '익명의 사용자가' if instance.is_anonymous else f'{actor.username}님이'
    actor_name_en = 'An anonymous user' if instance.is_anonymous else f'{actor.username}'
    content_preview = wrap_content(instance.content)

    # if is_reply
    if origin.type == 'Comment':
        redirect_url = f'/{origin.target.type.lower()}s/{origin.target.id}?anonymous={instance.is_anonymous}'
        # send a notification to the author of the origin comment
        if origin_author == actor:
            pass
        elif actor.id in origin_author.user_report_blocked_ids:
            pass
        else:
            Notification.objects.create(actor=actor,
                                        user=origin_author,
                                        origin_id=origin.id,
                                        origin_type=get_generic_relation_type(origin.type),
                                        target_id=target.id,
                                        target_type=get_comment_type(),
                                        message_ko=f'{actor_name_ko} 회원님의 댓글에 답글을 남겼습니다: "{content_preview}"',
                                        message_en=f'{actor_name_en} has replied to your comment: "{content_preview}"',
                                        redirect_url=redirect_url)
        # send a notification to the author of the feed where the origin comment commented
        feed_author = origin.target.author
        if feed_author == origin_author:
            pass
        elif feed_author == actor:
            pass
        elif actor.id in feed_author.user_report_blocked_ids:
            pass
        else:
            feed_type_ko = '게시글' if origin.target.type == 'Article' else '답변'
            feed_type_en = 'post' if origin.type == 'Article' else 'answer'
            Notification.objects.create(actor=actor,
                                        user=feed_author,
                                        origin_id=origin.id,
                                        origin_type=get_generic_relation_type(origin.type),
                                        target_id=target.id,
                                        target_type=get_comment_type(),
                                        message_ko=f'회원님의 {feed_type_ko}에 달린 댓글에 새로운 답글이 달렸습니다: "{content_preview}"',
                                        message_en=f'There\'s a new reply to the comment on your {feed_type_en}: "{content_preview}"',
                                        redirect_url=redirect_url)
        # send notifications to participants of the origin comment
        for participant_id in origin.participants:
            if participant_id == origin_author.id:
                continue
            if participant_id == feed_author.id:
                continue
            if participant_id == actor.id:
                continue
            participant = User.objects.get(id=participant_id)
            if actor.id in participant.user_report_blocked_ids:
                continue
            Notification.objects.create(actor=actor,
                                        user=participant,
                                        origin_id=origin.id,
                                        origin_type=get_generic_relation_type(origin.type),
                                        target_id=target.id,
                                        target_type=get_comment_type(),
                                        message_ko=f'회원님이 답글을 남긴 댓글에 새로운 답글이 달렸습니다: "{content_preview}"',
                                        message_en=f'There\'s a new reply in the comment thread where you left a reply: "{content_preview}"',
                                        redirect_url=redirect_url)

    # if not reply
    else:
        redirect_url = f'/{origin.type.lower()}s/{origin.id}?anonymous={instance.is_anonymous}'
        # send a notification to the author of the origin feed
        origin_target_name_ko = '게시글' if origin.type == 'Article' else '답변'
        origin_target_name_en = 'post' if origin.type == 'Article' else 'answer'
        if origin_author == actor:
            pass
        elif actor.id in origin_author.user_report_blocked_ids:
            pass
        else:
            Notification.objects.create(actor=actor,
                                        user=origin_author,
                                        origin_id=origin.id,
                                        origin_type=get_generic_relation_type(origin.type),
                                        target_id=target.id,
                                        target_type=get_comment_type(),
                                        message_ko = f'{actor_name_ko} 회원님의 {origin_target_name_ko}에 댓글을 남겼습니다: "{content_preview}"',
                                        message_en = f'{actor_name_en} has commented on your {origin_target_name_en}: "{content_preview}"',
                                        redirect_url=redirect_url)
        # send notifications to participants of the origin feed
        for participant_id in origin.participants:
            if participant_id == origin_author.id:
                continue
            if participant_id == actor.id:
                continue
            participant = User.objects.get(id=participant_id)
            if actor.id in participant.user_report_blocked_ids:
                continue
            Notification.objects.create(actor=actor,
                                        user=participant,
                                        origin_id=origin.id,
                                        origin_type=get_generic_relation_type(origin.type),
                                        target_id=target.id,
                                        target_type=get_comment_type(),
                                        message_ko=f'회원님이 댓글을 남긴 {origin_target_name_ko}에 새로운 댓글이 달렸습니다: "{content_preview}"',
                                        message_en=f'There\'s a new comment on the {origin_target_name_en} you commented on: "{content_preview}"',
                                        redirect_url=redirect_url)
