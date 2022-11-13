from django.contrib.auth import get_user_model

import re

from adoorback.validators import USERNAME_REGEX

User = get_user_model()


def parse_user_tag_from_content(content):
    tagged_users = User.objects.none()
    word_indices = list()
    if not '@' in content:
        return tagged_users, word_indices

    words = content.split(' ')
    for i, word in enumerate(words):
        if word[0] != '@':
            continue

        # cut username by regex (exclude unallowed characters)
        tagged_username = re.compile(USERNAME_REGEX[1:-2]).match(word[1:]).group()
        try:
            tagged_users |= User.objects.filter(username=tagged_username)
            word_indices.append(i)
        except User.DoesNotExist:
            continue

    return tagged_users, word_indices
