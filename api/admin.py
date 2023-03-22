from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.admin import GenericTabularInline
from django.forms import Textarea
from django.db import models

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'quantity', 'content_type', 'object_id', 'content_object']
    search_fields = ['title', 'content']


@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'label', 'model', 'location']

@admin.register(Sensor)
class SensorAdmin(admin.ModelAdmin):
    list_display = ['id', 'label', 'equipment_id','model', 'location']

# @admin.register(SensorFile)
# class SensorAdmin(admin.ModelAdmin):
#     search_fields = ['upload', 'author']

# @admin.register(InputOrder)
# class InputOrderAdmin(admin.ModelAdmin):
#     list_display = ['id', 'amount']


class InventoryInline(GenericTabularInline):
    model = Inventory
    extra = 1 

class InputOrderInline(admin.TabularInline):
    model = InputOrder

class InputOperationInline(admin.TabularInline):
    model = InputOperation

class EquipmentInline(admin.TabularInline):
    model = Equipment



@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    inlines = [InventoryInline]
    list_display = ['title', 'updated', 'user']
    readonly_fields = ['timestamp', 'updated']
    #raw_id_fields = ['author']

@admin.register(CustomerOrder)
class OrderAdmin(admin.ModelAdmin):
    inlines = [InventoryInline, InputOrderInline]
    list_display = ['title', 'updated', 'user']
    readonly_fields = ['timestamp', 'updated']




@admin.register(Operation)
class OperationAdmin(admin.ModelAdmin):
    inlines = [InventoryInline, InputOperationInline]
    list_display = ['title', 'updated', 'user', 'start_time', 'end_time']
    readonly_fields = ['timestamp', 'updated']


@admin.register(OperationType)
class OperationTypeAdmin(admin.ModelAdmin):
    pass


@admin.register(FileUpload)
class FileUplaodAdmin(admin.ModelAdmin):
    pass
    


# class UserAdminConfig(UserAdmin):
#     model = NewUser
#     search_fields = ('email', 'user_name', 'first_name',)
#     list_filter = ('email',  'user_name', 'first_name', 'is_active', 'is_staff')
#     ordering = ('-start_date',)
#     list_display = ('email', 'id', 'user_name', 'first_name',
#                     'is_active', 'is_staff')
#     fieldsets = (
#         (None, {'fields': ('email', 'user_name', 'first_name',)}),
#         ('Permissions', {'fields': ('is_staff', 'is_active')}),
#         ('Personal', {'fields': ('about',)}),
#     )
#     formfield_overrides = {
#         models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
#     }
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('email', 'user_name', 'first_name', 'password1', 'password2', 'is_active', 'is_staff')}
#          ),
#     )




class UserAdmin(BaseUserAdmin):
    model = get_user_model()
    list_display = (
        "email",
        "is_staff",
        "is_active",
    )
    list_filter = (
        "email",
        "is_staff",
        "is_active",
    )
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "is_staff", "is_active"),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)


admin.site.register(User, UserAdmin)
