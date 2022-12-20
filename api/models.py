from django.db import models
from django.conf import settings


class Purchase(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='purchases', null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
    order_time = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)
    delivery_time = models.DateTimeField(auto_now_add=False, auto_now=False, null=True, blank=True)

    class Meta:
        ordering = ['updated']
