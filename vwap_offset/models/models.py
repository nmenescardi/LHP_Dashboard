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

    def offset(self):
        return 55

    def latest_price(self):
        return 99

    def _get_percent_change(self, previous, current):
        """ Helper method to get percentage of change between two numbers"""
        if current == previous or previous == 0:
            return 0

        change = round((abs(current - previous) / previous) * 100.0, 2)
        sign = "+" if current >= previous else "-"
        return sign + str(change) + "%"


    def __str__(self):
        return ("instance of table-------> {} ".format(self.id))
