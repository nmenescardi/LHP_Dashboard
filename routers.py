from rest_framework import routers
from vwap_offset.viewsets import VwapViewSet
router = routers.SimpleRouter()
router.register(r'vwap', VwapViewSet, basename='vwap')
