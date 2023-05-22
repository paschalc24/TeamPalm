from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

# Manage User Accounts Using Django Auth
class AppUserManager(BaseUserManager):

	# Create a User Account
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user
	
	# Create an Admin Account
	def create_superuser(self, email, username=None, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email, password)
		user.is_superuser = True
		user.save()
		return user

# User Model - Extended from Django's BaseUser Model
class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True, null=True)
	username = models.CharField(max_length=50)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()
	def __str__(self):
		return self.username