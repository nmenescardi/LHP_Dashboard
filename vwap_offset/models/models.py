from django.db import models
import uuid
from django.contrib.auth.models import User

class VwapData(models.Model):

    ''' Made a docstring for storing vwap offset dashboard data into this table '''

    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    open_dt = models.FloatField()
    high = models.FloatField()
    low = models.FloatField()
    close = models.FloatField()
    exchange = models.CharField(max_length = 256)
    ticker = models.CharField(max_length = 256)
    volume = models.FloatField()
    price_time = models.DateTimeField(null = True, blank = True)
    vwap = models.FloatField()
    created_on = models.DateTimeField(auto_now_add = True)
    updated_on = models.DateTimeField(auto_now = True)

    def offset(self):
        return self._get_percent_change( self.vwap, self.close )

    def _get_percent_change(self, previous, current):
        """ Helper method to get percentage of change between two numbers"""
        if current == previous or previous == 0:
            return 0

        change = round((abs(current - previous) / previous) * 100.0, 2)
        sign = "+" if current >= previous else "-"
        return sign + str(change) + "%"


    def __str__(self):
        return ("instance of table-------> {} ".format(self.id))
