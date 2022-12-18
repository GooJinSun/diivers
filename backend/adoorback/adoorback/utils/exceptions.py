from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework import status


class InActiveUser(AuthenticationFailed):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "User is not active, please confirm your email"
    default_code = 'user_is_inactive'


class NoUsername(AuthenticationFailed):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "Username does not exist"
    default_code = 'username_does_not_exist'


class WrongPassword(AuthenticationFailed):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "Password is wrong"
    default_code = 'wrong_password'
