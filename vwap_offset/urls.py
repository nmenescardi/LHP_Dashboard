from django.urls import path
from vwap_offset.views import * 


urlpatterns = [

######## data, basic functions starts here
		## url using for data saving into db
		path('data-to-be-received/',SavingDataIntoDb.as_view(),name = "SavingDataIntoDb"),
		##end here url using for data saving into db

		## url using for data showing on frontend
		path('data-to-be-show/',DashboardView.as_view(),name = "DashboardView"),
		##end here url using for data showing on frontend


######## data, basic functions ends here

]