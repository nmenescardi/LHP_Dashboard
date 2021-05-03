from rest_framework import viewsets
from vwap_offset.models import Vwap
from vwap_offset.serializers import VwapSerializer

class VwapViewSet(viewsets.ModelViewSet):
    serializer_class = VwapSerializer

    def get_queryset(self):
        return Vwap.objects.all()
