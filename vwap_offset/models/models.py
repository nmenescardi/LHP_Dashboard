from django.db import models
import uuid
from django.contrib.auth.models import User


class Pair(models.Model):
    ''' Coins '''
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    ticker = models.CharField(max_length = 50)
    created_on = models.DateTimeField(auto_now_add = True)
    updated_on = models.DateTimeField(auto_now = True)


class Price(models.Model):
    ''' Prices '''
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    pair = models.ForeignKey(
        Pair, 
        on_delete = models.CASCADE,
        primary_key = False,
        null = True
    )
    close = models.FloatField()
    created_on = models.DateTimeField(auto_now_add = True)
    updated_on = models.DateTimeField(auto_now = True)


class Vwap(models.Model):
    ''' Stores and handle data related with VWAP values '''

    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    pair = models.ForeignKey(
        Pair, 
        on_delete = models.CASCADE,
        primary_key = False,
        null = True
    )
    price_time = models.DateTimeField(null = True, blank = True)
    vwap = models.FloatField()
    created_on = models.DateTimeField(auto_now_add = True)
    updated_on = models.DateTimeField(auto_now = True)
    
    class Meta:
        unique_together = ('pair', 'price_time',)

    def offset(self):
        return self._get_percent_change( self.vwap, self.latest_price() )

    def latest_price(self):
        return Price.objects.filter( pair=self.pair ).latest('created_on').close

    def _get_percent_change(self, previous, current):
        """ Helper method to get percentage of change between two numbers"""
        if current == previous or previous == 0:
            return 0

        change = round((abs(current - previous) / previous) * 100.0, 2)
        sign = "+" if current >= previous else "-"
        return sign + str(change) + "%"


    def __str__(self):
        return ("instance of table-------> {} ".format(self.id))
