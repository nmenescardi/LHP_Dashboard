from rest_framework import serializers
from vwap_offset.models import Vwap

class VwapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vwap
        fields = ['id', 'pair', 'vwap']
