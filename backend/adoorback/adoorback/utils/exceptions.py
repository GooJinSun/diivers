from rest_framework.exceptions import APIException
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


class ExistingUsername(APIException):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "Username already exists"
    default_code = 'username_exists'


class LongUsername(APIException):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "Username is too long"
    default_code = 'username_too_long'


class InvalidUsername(APIException):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "Username is invalid"
    default_code = 'username_invalid'


class ExistingEmail(APIException):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "Email already exists"
    default_code = 'email_exists'


class InvalidEmail(APIException):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "Email is invalid"
    default_code = 'email_invalid'
