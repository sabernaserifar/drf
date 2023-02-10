from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from simple_history.models import HistoricalRecords

class Inventory(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=50)  # pounds, lbs, gr, liter, gallo
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()
    # Polymorphic relationships
    content_type = models.ForeignKey(ContentType, related_name='inventories', on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')


class Purchase(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='purchases', null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
    order_time = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    delivery_time = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    tags = GenericRelation(Inventory)


    class Meta:
        ordering = ['updated']


class Order(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='orders', null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
    order_time = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    delivery_time = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    tags = GenericRelation(Inventory)


    class Meta:
        ordering = ['updated']


class InputOrder(models.Model):
    order = models.ForeignKey(Order, null=True, related_name='input_order', on_delete=models.CASCADE)
    inventory = models.ForeignKey(Inventory, null=True, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)


class Run(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='runs', null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=250)

    start_time = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    end_time = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)

    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    tags = GenericRelation(Inventory)


    class Meta:
        ordering = ['updated']


class InputRun(models.Model):
    run = models.ForeignKey(Run, null=True, related_name='input_run', on_delete=models.CASCADE)
    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)







# class PurchaseItem(models.Model):
#     """
#     Purchase items
#     """
#     purchase = models.ForeignKey(Purchase, related_name='purchase_items', on_delete=models.CASCADE)
#     name = models.CharField(max_length=250)
#     description = models.TextField(blank=True, null=True)
#     quantity = models.CharField(max_length=50)
#     ##TODO is it better to perfrom a full_clean() validation like unit instead to avoid nonsense input?
#     # quantity_as_float = models.FloatField(blank=True, null=True)
#     ##TODO the validators are not run on .save() but when full_clean() is called.
#     unit = models.CharField(max_length=50)  # pounds, lbs, gr, liter, gallon
#     timestamp = models.DateTimeField(auto_now_add=True)
#     updated = models.DateTimeField(auto_now=True)
#     # active = models.BooleanField(default=True)
#     # external_product_id = models.CharField(max_length=250)
#     # price = models.DecimalField(max_digits=6, decimal_places=2)
#     # documentation_bucket = models.TextField()
#     # documentation_bucket_path = models.TextField()
#     # customer_name = models.CharField(max_length=250)
#
#     def __str__(self):
#         return f'{self.id}:{self.name}:{self.quantity}:{self.unit}'


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, first_name, password, **other_fields)

    def create_user(self, email, user_name, first_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                          first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('email address'), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    about = models.TextField(_(
        'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name']

    def __str__(self):
        return self.user_name
