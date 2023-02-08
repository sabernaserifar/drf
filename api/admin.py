from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin
from django.contrib.contenttypes.admin import GenericTabularInline
from django.forms import Textarea
from django.db import models

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'quantity', 'description', 'content_type', 'object_id', 'content_object']
    search_fields = ['title', 'content']

# @admin.register(InputOrder)
# class InputOrderAdmin(admin.ModelAdmin):
#     list_display = ['id', 'amount']


class InventoryInline(GenericTabularInline):
    model = Inventory

class InputOrderInline(admin.TabularInline):
    model = InputOrder

class InputRunInline(admin.TabularInline):
    model = InputRun



@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    inlines = [InventoryInline]
    list_display = ['title', 'updated', 'author']
    readonly_fields = ['timestamp', 'updated']
    #raw_id_fields = ['author']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [InventoryInline, InputOrderInline]
    list_display = ['title', 'updated', 'author']
    readonly_fields = ['timestamp', 'updated']




@admin.register(Run)
class RunAdmin(admin.ModelAdmin):
    inlines = [InventoryInline, InputRunInline]
    list_display = ['title', 'updated', 'author']
    readonly_fields = ['timestamp', 'updated']


class UserAdminConfig(UserAdmin):
    model = NewUser
    search_fields = ('email', 'user_name', 'first_name',)
    list_filter = ('email',  'user_name', 'first_name', 'is_active', 'is_staff')
    ordering = ('-start_date',)
    list_display = ('email', 'id', 'user_name', 'first_name',
                    'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'user_name', 'first_name',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Personal', {'fields': ('about',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name', 'first_name', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(NewUser, UserAdminConfig)
