from django.urls import path
from vwap_offset.views import * 


urlpatterns = [
	path('vwap-value/',SavingDataIntoDb.as_view(),name = "SavingDataIntoDb"),
	path('config/', SaveConfig.as_view(),name = "SaveConfig"),
	path('config/input/', configFileInput, name='configFileInput'),
]
