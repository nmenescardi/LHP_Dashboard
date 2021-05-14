from django.db import models
import uuid
from django.contrib.auth.models import User


class Pair(models.Model):
    ''' Stores and handle data related with VWAP values '''

    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    symbol = models.CharField(max_length=50)
    price_time = models.DateTimeField(null = True, blank = True)
    vwap = models.FloatField()
    created_on = models.DateTimeField(auto_now_add = True)
    updated_on = models.DateTimeField(auto_now = True)
    
    class Meta:
        unique_together = ('symbol', 'price_time',)

    def __str__(self):
        return ("instance of table-------> {} ".format(self.id))


class Config(models.Model):
    ''' Config User data '''

    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    symbol = models.CharField(max_length=50)
    longoffset = models.FloatField()
    shortoffset = models.FloatField()
    lickvalue = models.IntegerField()
    min_lick_value = models.IntegerField(null = True)
    percentage_factor = models.FloatField(null = True)
    created_on = models.DateTimeField(auto_now_add = True)
    updated_on = models.DateTimeField(auto_now = True)
    
    def __str__(self):
        return ("instance of table-------> {} ".format(self.id))
