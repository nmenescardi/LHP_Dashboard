from rest_framework import viewsets
from vwap_offset.models import Pair
from vwap_offset.serializers import PairSerializer

class PairViewSet(viewsets.ModelViewSet):
    serializer_class = PairSerializer

    def get_queryset(self):
        return Pair.objects.all()
