from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError
from django.utils import translation

from account.email import email_manager


User = get_user_model()


class Command(BaseCommand):
    help = "Make users that have not visited for 1 year dormant."

    def handle(self, *args, **options):
        users = User.objects.all()  # TODO: find users that have not visited for 1 year
        for user in users:
            user.is_dormant = True

        self.stdout.write(
            self.style.SUCCESS(f'Successfully made {len(users)} users dormant.')
        )
