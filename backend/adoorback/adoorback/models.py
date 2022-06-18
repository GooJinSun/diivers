from django.db import models
from django.core.validators import MinLengthValidator


class AdoorTimestampedModel(models.Model):
    class Meta:
        abstract = True

    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)


class AdoorModel(AdoorTimestampedModel):
    class Meta:
        abstract = True

    content = models.TextField(validators=[MinLengthValidator(1, "content length must be greater than 1")])

    def __str__(self):
        return self.content
