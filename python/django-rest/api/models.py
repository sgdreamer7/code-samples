from django.db import models
from django.contrib.auth.models import AbstractBaseUser,\
    BaseUserManager, PermissionsMixin


class MyUserManager(BaseUserManager):

    def create_user(self, email, password):
        if not email:
            raise ValueError('Users must have an email')
        user = self.model(
            email=email,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_admin = True
        user.is_staff = True
        user.is_active = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    objects = MyUserManager()

    def get_short_name(self):
        return self.email

    def get_full_name(self):
        return '{} {}'.format(self.last_name, self.first_name)

    def get_username(self):
        return self.email

    class Meta:
        verbose_name_plural = "Manage Users"

    def __str__(self):
        return '{}'.format(self.email)

class UserProfile(models.Model):
    avatar = models.ImageField()
    age = models.PositiveIntegerField()
    user_info = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return 'First name:{} Last name:{} ID:{} Email:{}'.format(self.user_info.first_name,
                                                                  self.user_info.last_name,
                                                                  self.pk,
                                                                  self.user_info.email)


class Info(models.Model):
    some_field1 = models.CharField(max_length=100)
    some_field2 = models.IntegerField()

