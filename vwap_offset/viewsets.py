from rest_framework import viewsets
from vwap_offset.models import Pair, Config
from vwap_offset.serializers import PairSerializer, ConfigSerializer
from django.db.models.functions import Lower

class PairViewSet(viewsets.ModelViewSet):
    serializer_class = PairSerializer

    def get_queryset(self):
        all_pairs_data = Pair.objects.order_by('-price_time')
        single_symbol_list = []
        result = []
        for one_data in all_pairs_data:
            if one_data.symbol not in single_symbol_list:
                result.append(one_data)
                single_symbol_list.append(one_data.symbol)
        return result

class ConfigViewSet(viewsets.ModelViewSet):
    serializer_class = ConfigSerializer

    def get_queryset(self):
        all_config_data = Config.objects.order_by('-created_on')
        single_symbol_list = []
        result = []
        for one_data in all_config_data:
            if one_data.symbol not in single_symbol_list:
                result.append(one_data)
                single_symbol_list.append(one_data.symbol)
        return result
