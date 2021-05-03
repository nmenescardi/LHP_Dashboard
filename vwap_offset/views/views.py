from rest_framework.views import APIView
from django.views import View
import ast,sys,json,dateparser
from django.conf import settings
from vwap_offset.models import Vwap
from vwap_offset.models import Pair
from django.http.response import JsonResponse
from django.utils import timezone
from django.shortcuts import render,redirect
from django.db.models.functions import Lower

class SavingDataIntoDb(APIView):

    ''' Demonstrate docstring for confirming that this view api will save into db'''

    def post(self, request):
        try:
            context = {}
            api_key = settings.API_KEY_FOR_SECURITY
            token_From_request = request.META.get('HTTP_X_API_KEY')


            if api_key != token_From_request:
                context['message'] = 'Bad Request,Token Not Found!'
                context['status'] = 403
                return JsonResponse(context)

            ticker = self.request.data.get('ticker')
            if not ticker:
                context['message'] = 'Ticker Field is required'
                context['status'] = 100
                return JsonResponse(context)

            vwap = self.request.data.get('vwap')
            if not vwap:
                context['message'] = 'Vwap Field is required'
                context['status'] = 100
                return JsonResponse(context)

            price_time = self.request.data.get('price_time')
            if not price_time:
                context['message'] = 'Price Time Field is required'
                context['status'] = 100
                return JsonResponse(context)


            pair, _ = Pair.objects.get_or_create(ticker = ticker)
            Vwap.objects.create(pair = pair, price_time = dateparser.parse(price_time), vwap = vwap)
            context['message'] = 'Success ! Data has been successfully saved into our database'
            context['status'] = 200
            return JsonResponse(context)
        except :
            context = {}
            print(sys.exc_info())
            context['message'] = 'An error occurred in saving data, please try again or contact us'
            context['status'] = 500
            return JsonResponse(context)



class DashboardView(View):

    ''' Demonstrate docstring for confirming that this view function will rendering one user permissions''' 

    context = {}
    templates_name = 'data/data.html'

    def get(self,request):

        try:
            all_data_list = Vwap.objects.all().order_by(Lower('price_time').desc())
            ticker_list = []
            all_data = []
            for one_data in all_data_list:
                if one_data.pair.ticker not in ticker_list:
                    all_data.append(one_data)
                    ticker_list.append(one_data.pair.ticker)

            return render(request, self.templates_name, locals())
        except Exception as e:
            print(e)
            return render(request, self.templates_name, locals())