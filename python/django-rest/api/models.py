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


class DeviceProducer(models.Model):
    title = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return '{}'.format(self.title)


class DeviceModel(models.Model):
    title = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    producer = models.ForeignKey(DeviceProducer, on_delete=models.CASCADE)

    def __str__(self):
        return '{}'.format(self.title)


class Driver(models.Model):
    title = models.CharField(max_length=255)
    version = models.CharField(max_length=50)
    model = models.ForeignKey(DeviceModel, on_delete=models.CASCADE)

    def __str__(self):
        return '{}'.format(self.title)
