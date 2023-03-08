from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.auth.models import AbstractUser

from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from simple_history.models import HistoricalRecords
from datetime import datetime


class Inventory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    quantity = models.DecimalField(max_digits=12, decimal_places=4)
    unit = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    # historical table 
    history = HistoricalRecords()
    # Polymorphic relationships
    content_type = models.ForeignKey(ContentType, related_name='inventories', on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')


class FileUpload(models.Model):
    upload = models.FileField(upload_to='uploads/%Y/%m/%d/')


class Maintenance(models.Model):
    instruction_file = models.ForeignKey(FileUpload, blank=True, null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    start_time = models.DateTimeField(auto_now_add=False, auto_now=False)
    end_time = models.DateTimeField(auto_now_add=False, auto_now=False)
    company = models.CharField(max_length=50, blank=True, null=True)
    operator = models.CharField(max_length=100, blank=True, null=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    info_kvp = models.JSONField(blank=True, null=True)


class Purchase(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='purchases', on_delete=models.SET_NULL)
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    vendor = models.CharField(max_length=250)
    order_number = models.CharField(max_length=250, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
    order_time = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    delivery_time = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    supplementary_file = models.ForeignKey(FileUpload, blank=True, null=True, on_delete=models.SET_NULL)
    tags = GenericRelation(Inventory)

    class Meta:
        ordering = ['updated']


class Equipment(models.Model):
    manual_file = models.ForeignKey(FileUpload, blank=True, null=True, on_delete=models.SET_NULL)
    maintenance = models.ForeignKey(Maintenance, blank=True, null=True, on_delete=models.SET_NULL)
    label = models.CharField(max_length=50)
    model = models.CharField(max_length=50, null=True, blank=True)    
    description = models.TextField(blank=True, null=True)
    manufacturer = models.CharField(max_length=100, blank=True, null=True)
    proprietor = models.CharField(max_length=100, blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    installed = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    info_kvp = models.JSONField(blank=True, null=True)


class Sensor(models.Model):
    manual_file = models.ForeignKey(FileUpload, blank=True, null=True, on_delete=models.SET_NULL)
    maintenance = models.ForeignKey(Maintenance, blank=True, null=True, on_delete=models.SET_NULL)
    equipment = models.ForeignKey(Equipment, on_delete=models.SET_NULL)
    label = models.CharField(max_length=50)
    model = models.CharField(max_length=50, null=True, blank=True)    
    description = models.TextField(blank=True, null=True)
    manufacturer = models.CharField(max_length=100, blank=True, null=True)
    proprietor = models.CharField(max_length=100, blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    installed = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    info_kvp = models.JSONField(blank=True, null=True)
    

class OperationType(models.Model):
    label = models.CharField(max_length=50)


class Operation(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='operations', on_delete=models.SET_NULL)
    operation_type = models.ForeignKey(OperationType, on_delete=models.SET_NULL)
    equipment = models.ForeignKey(Equipment, on_delete=models.SET_NULL)
    result_file = models.ForeignKey(FileUpload, null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    start_time = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    end_time = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    result_kvp = models.JSONField(blank=True, null=True)
    tags = GenericRelation(Inventory)

    class Meta:
        ordering = ['updated']


class InputOperation(models.Model):
    operation = models.ForeignKey(Operation, related_name='input_operations', on_delete=models.CASCADE)
    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)


class SensorReading(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.SET_NULL) # 2nd primary key, defined in migrations 
    input_file = models.ForeignKey(FileUpload, on_delete=models.SET_NULL)
    time = models.DateTimeField(primary_key=True, default=datetime.now)
    value = models.DecimalField(max_digits=10, decimal_places=4)
    unit = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'api_sensorreading'
        unique_together = ['sensor', 'time']


class Customer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, max_length=150)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    info_kvp = models.JSONField(blank=True, null=True)
    

class Delivery(models.Model):
    type = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    carrier = models.CharField(max_length=100)
    tracking_number = models.CharField(max_length=250)


class CustomerOrder(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='orders', null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL)    
    price = models.DecimalField(max_digits=10, decimal_places=2)
    order_time = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    delivery_time = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    delivery = models.ForeignKey(Delivery, on_delete=models.SET_NULL)
    active = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    invoice_file = models.ForeignKey(FileUpload, blank=True, null=True, on_delete=models.SET_NULL)
    invoice_kvp = models.JSONField(blank=True, null=True)

    class Meta:
        ordering = ['updated']


class InputOrder(models.Model):
    order = models.ForeignKey(CustomerOrder, related_name='input_orders', on_delete=models.CASCADE)
    inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)


class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True, max_length=150)

    has_finished_tutorial = models.BooleanField(default=False)
    avatar = models.FileField(upload_to="avatars/", default="avatars/default.png")
    first_name = models.CharField(default="", max_length=40, blank=True)
    last_name = models.CharField(default="", max_length=40, blank=True)
    phone = models.CharField(default="", max_length=20, blank=True)
    channel = models.CharField(null=True, unique=True, max_length=100)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email





# migrations.RunSQL(
#             sql=[(
#                 "CREATE TABLE public.api_sensorreading (\
#                     value decimal NOT NULL, \
#                     time timestamp NOT NULL,\
#                     device_id int4 NOT NULL,\
#                     CONSTRAINT api_sensorreading_pkey PRIMARY KEY (time, sensor_id)\
#                 );\
#                 SELECT create_hypertable('api_sensorreading', 'time');"
#             )],
#             reverse_sql=[(
#                  "DROP TABLE public.api_sensorreading;"
#             )]
#         )


