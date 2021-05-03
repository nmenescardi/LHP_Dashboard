from rest_framework import routers
from vwap_offset.viewsets import PairViewSet
router = routers.SimpleRouter()
router.register(r'pair', PairViewSet, basename='pair')
