from rest_framework import serializers
from vwap_offset.models import Pair

class PairSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pair
        fields = ['id', 'symbol', 'vwap']
