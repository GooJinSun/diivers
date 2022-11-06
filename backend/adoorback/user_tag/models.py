from django.contrib.contenttypes.fields import GenericForeignKey
from django.db import models, transaction
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save
from django.db.models import Q, F
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

from adoorback.models import AdoorTimestampedModel
from notification.models import Notification

User = get_user_model()


class UserTagManager(models.Manager):
    use_for_related_fields = True


class UserTag(AdoorTimestampedModel):
    tagging_user = models.ForeignKey(User, related_name='tagging_set', on_delete=models.CASCADE)
    tagged_user = models.ForeignKey(User, related_name='tagged_set', on_delete=models.CASCADE)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.IntegerField()
    target = GenericForeignKey('content_type', 'object_id')

    offset = models.IntegerField(default=-1)
    length = models.IntegerField(default=0)

    user_tag_targetted_notis = GenericRelation(Notification,
                                               content_type_field='target_type',
                                               object_id_field='target_id')
    user_tag_originated_notis = GenericRelation(Notification,
                                                content_type_field='origin_type',
                                                object_id_field='origin_id')
    objects = UserTagManager()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['tagging_user', 'tagged_user', 'content_type', 'object_id', 'offset'], name='unique_user_tag'),
            # models.CheckConstraint(
            #     check=~Q(tagging_user=F('tagged_user')),
            #     name='tagging_user_and_tagged_user_cannot_be_equal'
            # )
        ]
        ordering = ['id']

    def __str__(self):
        return f'{self.tagging_user} tagged {self.tagged_user} in {self.content_type} ({self.object_id})'

    def clean(self):
        if self.target.type == 'Comment' and self.target.target.type == 'Comment':
            post = self.target.target.target
        elif self.target.type == 'Comment':
            post = self.target.target
        else:
            raise ValidationError(_('The target of a UserTag object must be Comment type.'))
        if post.share_anonymously:
            raise ValidationError(_('A UserTag object cannot be created in a comment of an anonymous post.'))
        
    @property
    def type(self):
        return self.__class__.__name__


@transaction.atomic
@receiver(post_save, sender=UserTag)
def create_user_tag_noti(instance, **kwargs):
    user = instance.tagged_user
    actor = instance.tagging_user
    origin = instance.target
    target = instance

    if user == actor:
        return

    actor_name = f'{actor.username}님이'

    if origin.type == 'Comment':
        if origin.target.type == 'Comment':  # if is reply
            post = origin.target.target
            message = f'{actor_name} 댓글에서 회원님을 언급했습니다.'
        else:
            post = origin.target
            message = f'{actor_name} 댓글에서 회원님을 언급했습니다.'
        if origin.target.author == user:
            return  # do not create noti if comment / reply notification will be sent
        if origin.is_private and origin.target.author != user:
            return  # do not create noti for private comment that tagged user has no permission to see
        if origin.is_anonymous or not User.are_friends(user, post.author):
            return  # do not create noti for anonymous comment or post that tagged user has no permission to see
        redirect_url = f'/{post.type.lower()}s/' \
                       f'{post.id}?anonymous=False'
    else:
        print("UserTag can only be created in comment or reply for now.")
        return

    Notification.objects.create(actor=actor, user=user,
                                origin=origin, target=target,
                                message=message, redirect_url=redirect_url)
