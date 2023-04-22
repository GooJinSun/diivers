from datetime import timedelta, datetime

from django.utils.timezone import make_aware
from django.contrib.auth import get_user_model
from django_cron import CronJobBase, Schedule
from django.db.models import Q

from account.algorithms.csv_writer import create_dormant_csv
from account.email import email_manager
from notification.models import Notification
from tracking.models import Visitor

User = get_user_model()


class SendSelectQuestionsNotiCronJob(CronJobBase):
    RUN_EVERY_MINS = 60 * 16  # every 16 hours

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'feed.algorithms.data_crawler.select_daily_questions'

    def do(self):
        print('=========================')
        print("Creating notifications for select questions...............")
        threshold_date = make_aware(datetime.now()) - timedelta(days=3)
        users = User.objects.filter(created_at__gt=threshold_date)
        admin = User.objects.filter(is_superuser=True).first()

        num_notis_before = Notification.objects.admin_only().count()

        for user in users:
            if user.question_history is None:
                Notification.objects.create(user=user,
                                            actor=admin,
                                            target=admin,
                                            origin=admin,
                                            message=f"{user.username}님, 답하고 싶은 질문을"
                                                    f" 고르고 취향에 맞는 질문을 추천 받아 보실래요?",
                                            redirect_url='/select-questions')
        num_notis_after = Notification.objects.admin_only().count()
        print(f'{num_notis_after - num_notis_before} notifications sent!')
        print('=========================')
        print("Cron job complete...............")
        print('=========================')


class SendAddFriendsNotiCronJob(CronJobBase):
    RUN_EVERY_MINS = 60 * 12  # every 12 hours

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'feed.algorithms.data_crawler.select_daily_questions'

    def do(self):
        print('=========================')
        print("Creating notifications for adding friends...............")
        threshold_date = make_aware(datetime.now()) - timedelta(days=3)
        users = User.objects.filter(created_at__gt=threshold_date)
        admin = User.objects.filter(is_superuser=True).first()

        num_notis_before = Notification.objects.admin_only().count()

        for user in users:
            if len(user.friend_ids) < 3:
                Notification.objects.create(user=user,
                                            actor=admin,
                                            target=admin,
                                            origin=admin,
                                            message=f"{user.username}님, 보다 재밌는 어도어 이용을 위해 친구를 추가해보세요!",
                                            redirect_url='/search')
        num_notis_after = Notification.objects.admin_only().count()
        print(f'{num_notis_after - num_notis_before} notifications sent!')
        print('=========================')
        print("Cron job complete...............")
        print('=========================')


class SendDormantInformEmailCronJob(CronJobBase):
    RUN_AT_TIMES = ['12:00']

    schedule = Schedule(run_every_mins=RUN_AT_TIMES)
    code = 'account.send_dormant_inform_email'

    def do(self):
        print('=========================')
        print("Sends users that have not visited for 11 months an informing email that the account will be dormant in 30 days.")
        today = make_aware(datetime.now())
        threshold_date = today - timedelta(days=335)
        visited_users = Visitor.objects.user_stats(threshold_date, today)
        inform_users = User.objects.filter(id__in=[x.id for x in set(User.objects.all()) - set(visited_users)]) \
            .filter(is_dormant=False) \
            .filter(Q(visit_history__isnull=False) | Q(created_at__lt=threshold_date))   # exclude those who did not ever visit since sign up

        for user in inform_users:
            # lang = user.language
            # translation.activate(lang)
            email_manager.send_dormant_inform_email(user)

        print(f'Successfully sent mail to {len(inform_users)} users.')
        print('=========================')
        print("Cron job complete...............")
        print('=========================')
        

class MakeUsersDormantCronJob(CronJobBase):
    RUN_AT_TIMES = ['00:00']

    schedule = Schedule(run_every_mins=RUN_AT_TIMES)
    code = 'account.make_users_dormant'

    def do(self):
        print('=========================')
        print("Make users that have not visited for 1 year dormant.")
        today = make_aware(datetime.now())
        threshold_date = today - timedelta(days=365)
        visited_users = Visitor.objects.user_stats(threshold_date, today)
        dormant_users = User.objects.filter(id__in=[x.id for x in set(User.objects.all()) - set(visited_users)]) \
            .filter(is_dormant=False) \
            .filter(Q(visit_history__isnull=False) | Q(created_at__lt=threshold_date))   # exclude those who did not ever visit since sign up

        create_dormant_csv(dormant_users)

        for user in dormant_users:
            user.is_dormant = True
            user.email = f'{user.id}@{user.id}.com'
            user.gender = None
            user.date_of_birth = None
            user.ethnicity = None
            user.save()

        print(f'Successfully made {len(dormant_users)} users dormant.')
        print('=========================')
        print("Cron job complete...............")
        print('=========================')
        