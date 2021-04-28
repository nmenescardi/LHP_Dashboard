from rest_framework.views import APIView
from django.views import View
import ast,sys,json,dateparser
from django.conf import settings
from accounts.models import VwapData
from django.http.response import JsonResponse
from django.utils import timezone
from django.shortcuts import render,redirect

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

            open_dt = self.request.data.get('open_dt')
            if not open_dt:
                context['message'] = 'Please Fill out Open Field Value'
                context['status'] = 100
                return JsonResponse(context)

            high = self.request.data.get('high')
            if not high:
                context['message'] = 'Please Fill out High Field Value'
                context['status'] = 100
                return JsonResponse(context)


            low = self.request.data.get('low')
            if not low:
                context['message'] = 'Please Fill out Low Field Value'
                context['status'] = 100
                return JsonResponse(context)


            close = self.request.data.get('close')
            if not close:
                context['message'] = 'Please Fill out Close Field Value'
                context['status'] = 100
                return JsonResponse(context)


            exchange = self.request.data.get('exchange')
            if not exchange:
                context['message'] = 'Exchange Field is required'
                context['status'] = 100
                return JsonResponse(context)


            ticker = self.request.data.get('ticker')
            if not ticker:
                context['message'] = 'Ticker Field is required'
                context['status'] = 100
                return JsonResponse(context)

            volume = self.request.data.get('volume')
            if not volume:
                context['message'] = 'Volume Field is required'
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


            check_if_duplicate = VwapData.objects.filter(ticker = ticker, price_time = dateparser.parse(price_time))
            if check_if_duplicate:
                context['message'] = 'Error ! Combination of date price and Ticker is already in use'
                context['status'] = 100
                return JsonResponse(context)





            VwapData.objects.create(open_dt = open_dt,high = high, low = low, close = close, exchange = exchange, ticker = ticker, volume = volume, price_time = dateparser.parse(price_time), vwap = vwap)
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
            from django.db.models.functions import Lower
            all_data_list = VwapData.objects.all().order_by(Lower('price_time').desc())
            ticker_list = []
            all_data = []
            for one_data in all_data_list:
                if one_data.ticker not in ticker_list:
                    all_data.append(one_data)
                    ticker_list.append(one_data.ticker)

            return render(request, self.templates_name, locals())
        except Exception as e:
            print(e)
            return render(request, self.templates_name, locals())
