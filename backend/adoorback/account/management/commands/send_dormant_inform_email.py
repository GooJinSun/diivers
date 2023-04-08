from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError
from django.utils import translation

from account.email import email_manager


User = get_user_model()


class Command(BaseCommand):
    help = "Sends users that have not visited for 11 months an informing email that the account will be dormant in 30 days."

    def handle(self, *args, **options):
        inform_users = User.objects.all()  # TODO: find users that have not visited for 11 months
        for user in inform_users:
            lang = user.language  # TODO: need to store user language information beforehand
            translation.activate(lang)

            try:
                email_manager.send_dormant_inform_email(user)
            except Exception as e:
                raise CommandError(f'Failed to send email: {e}')  # TODO: report to developers somehow (may be email)

        self.stdout.write(
            self.style.SUCCESS(f'Successfully sent mail to {len(inform_users)} users.')
        )
