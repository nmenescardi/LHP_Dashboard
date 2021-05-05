from rest_framework.views import APIView
from django.views import View
import ast,sys,json,dateparser
from django.conf import settings
from vwap_offset.models import Pair
from django.http.response import JsonResponse
from django.utils import timezone
from django.shortcuts import render,redirect


class SavingDataIntoDb(APIView):

    ''' Demonstrate docstring for confirming that this view api will save into db'''

    def post(self, request):
        try:
            context = {}
            api_key = settings.API_KEY_FOR_SECURITY

            if api_key != self.request.data.get('X_API_KEY'):
                context['message'] = 'Bad Request,Token Not Found!'
                context['status'] = 403
                return JsonResponse(context)

            symbol = self.request.data.get('symbol')
            if not symbol:
                context['message'] = 'Symbol Field is required'
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


            Pair.objects.create(symbol = symbol, price_time = dateparser.parse(price_time), vwap = vwap)
            context['message'] = 'Success ! Data has been successfully saved into our database'
            context['status'] = 200
            return JsonResponse(context)
        except :
            context = {}
            print(sys.exc_info())
            context['message'] = 'An error occurred in saving data, please try again or contact us'
            context['status'] = 500
            return JsonResponse(context)
