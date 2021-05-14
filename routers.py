from rest_framework import routers
from vwap_offset.viewsets import PairViewSet, ConfigViewSet
router = routers.SimpleRouter()
router.register(r'pair', PairViewSet, basename='pair')
router.register(r'config', ConfigViewSet, basename='config')
