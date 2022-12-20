from django.contrib import admin
from .models import Purchase


@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ['title', 'updated', 'user']
    readonly_fields = ['timestamp', 'updated']
    raw_id_fields = ['user']
