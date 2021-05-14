from rest_framework import serializers
from vwap_offset.models import Pair, Config

class PairSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pair
        fields = ['id', 'symbol', 'vwap']

class ConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = Config
        fields = ['symbol', 'longoffset', 'shortoffset', 'lickvalue', 'min_lick_value', 'percentage_factor']
