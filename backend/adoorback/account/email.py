from datetime import date, timedelta

import six
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import EmailMessage
from django.utils.translation import gettext_lazy as _

class ActivateTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (six.text_type(user.pk) + six.text_type(timestamp)) + six.text_type(user.is_active)


class EmailManager():
    activate_token_generator = ActivateTokenGenerator()
    pw_reset_token_generator = PasswordResetTokenGenerator()

    def send_verification_email(self, user):
        token = self.activate_token_generator.make_token(user)
        mail_title = _("이메일 인증을 완료해주세요")
        mail_to = [user.email]
        message_data = _("아래 링크를 클릭하면 회원가입 인증이 완료됩니다.\n\n회원가입 링크 : ")
        message_data += f"{settings.FRONTEND_URL}/activate/{user.id}/{token}\n\n"
        message_data += _("감사합니다.")
        email = EmailMessage(mail_title, message_data, to=mail_to)
        email.send()

    def send_reset_password_email(self, user):
        token = self.pw_reset_token_generator.make_token(user)
        mail_title = _("비밀번호 변경 링크입니다.")
        mail_to = [user.email]
        message_data = f"{user.username}"
        message_data += _("님, 아래 링크를 클릭하면 비밀번호 변경이 가능합니다.\n\n비밀번호 변경 링크 : ")
        message_data += f"{settings.FRONTEND_URL}/reset-password/{user.id}/{token}\n\n"
        message_data += _("감사합니다.")
        email = EmailMessage(mail_title, message_data, to=mail_to)
        email.send()

    def send_dormant_inform_email(self, user):
        mail_title = _("Diivers 장기 미접속 계정 휴면 전환 안내")
        mail_to = [user.email]
        dormant_date = (date.today() + timedelta(days=30)).isoformat()
        message_data = f"{user.username}"
        message_data += _("님, 장기간 Diivers 서비스 이용이 없으셨던 회원님의 계정이 휴면계정으로 전환될 예정입니다.\n \
                           저장된 개인정보는 안전하게 분리보관함을 안내드립니다.\n\n \
                           휴면 전환 예정일: ")
        message_data += f"{dormant_date}\n"
        message_data += _("분리보관 항목: 이메일 주소, 생년월일, 성별, 인종\n\n \
                           휴면 전환을 원치 않으시는 경우, ")
        message_data += f"{dormant_date}"
        message_data += _("이전에 Diivers를 방문하여 로그인해주시기 바랍니다.\n다이버스 바로가기 : ")
        message_data += f"{settings.FRONTEND_URL}\n\n"
        message_data += _("감사합니다.")
        email = EmailMessage(mail_title, message_data, to=mail_to)
        email.send()

    def check_activate_token(self, user, token):
        return self.activate_token_generator.check_token(user, token)

    def check_reset_password_token(self, user, token):
        return self.pw_reset_token_generator.check_token(user, token)

email_manager = EmailManager()
