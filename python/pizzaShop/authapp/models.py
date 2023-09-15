from django.db import models

from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _

from phonenumber_field.modelfields import PhoneNumberField


# class CustomUserManager(BaseUserManager):

#     def create_user(self, email, password, **extra_fields):
#         if not email:
#             return ValueError(_("Email should be provided"))
#         email = self.normalize_email(email)
#         new_user = self.model(email=email, **extra_fields)
#         new_user.set_password(password)
#         new_user.save()
#     def create_superuser(self, username, password, **extra_fields):
#         # extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         extra_fields.setdefault('is_active', True)

#         # if extra_fields.get('is_staff') is not True:
#         #     return ValueError("is_staff must be set to True for this user")
#         if extra_fields.get('is_superuser') is not True:
#             return ValueError("is_superuser must be set to True for this user")
#         if extra_fields.get('is_active') is not True:
#             return ValueError("is_active must be set to True for this user")
#         return self.create_user('username', 'password', **extra_fields)




class User(AbstractUser):
#     username = models.CharField(max_length=15,unique=True)
#     email = models.EmailField(max_length=30,unique=True)
#     phone_number = PhoneNumberField()

# #    USERNAME_FIELD = 'email'

#     REQUIRED_FIELDS = ['phone_number']

#     objects = CustomUserManager()

    def __str__(self) -> str:
        return self.email
