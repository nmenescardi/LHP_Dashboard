from rest_framework import viewsets
from vwap_offset.models import Pair
from vwap_offset.serializers import PairSerializer
from django.db.models.functions import Lower

class PairViewSet(viewsets.ModelViewSet):
    serializer_class = PairSerializer

    def get_queryset(self):
        all_pairs_data = Pair.objects.all().order_by(Lower('price_time').desc())
        single_symbol_list = []
        result = []
        for one_data in all_pairs_data:
            if one_data.symbol not in single_symbol_list:
                result.append(one_data)
                single_symbol_list.append(one_data.symbol)
        return result
