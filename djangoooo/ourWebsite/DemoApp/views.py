import cv2
import numpy as np
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User, Group
from django.urls import reverse
from rest_framework import viewsets, views
from rest_framework import permissions
from rest_framework.decorators import action, api_view
from rest_framework.parsers import JSONParser
import json

import base64
from .serializers import GroupSerializer, LaptopSerializer, DesktopSerializer, RegistrationSerializer
# RegistrationSerializer,AccountPropertiesSerializer
from .models import Laptops, Desktops, Register
# ,Account
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from rest_framework.authtoken.models import Token

from django.contrib.auth import get_user_model


# Create your views here.
def hi(request):
    return render(request, 'DemoApp/hi.html')


@api_view(['POST'], )
# @permission_classes([])
# @authentication_classes([])
def registration_view(request):
    if request.method == 'POST':
        # serializer = RegistrationSerializer(data=request.data)
        data = JSONParser().parse(request)
        c_data = '{ "username":"", "email":"", "phone":"","password":"","password2":"","Token":""}'
        customer_data = json.loads(c_data)
        customer_data['email'] = data['email']
        customer_data['username'] = data['username']
        customer_data['phone'] = data['phone']
        customer_data['password'] = data['password']
        customer_data['password2'] = data['password2']
        # token = Token.objects.get(user=).key
        # data['token'] = token

        customer_serializer = RegistrationSerializer(data=customer_data)

        if customer_serializer.is_valid():
            customer_serializer.save()
            return JsonResponse(customer_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(customer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # data = {}
        # email = request.data.get('email', '0').lower()
    #     if validate_email(email) != None:
    #         data['error_message'] = 'That email is already in use.'
    #         data['response'] = 'Error'
    #         return Response(data)
    #
    # username = request.data.get('username', '0')
    # if validate_username(username) != None:
    #     data['error_message'] = 'That username is already in use.'
    #     data['response'] = 'Error'
    #     return Response(data)

    # serializer = RegistrationSerializer(data=request.data)

    # if serializer.is_valid():
    #     account = serializer.save()
    #     data['response'] = 'successfully registered new user.'
    #     data['email'] = account.email
    #     data['username'] = account.username
    #     # data['pk'] = account.pk
    #     # token = Token.objects.get(user=account).key
    #     # data['token'] = token
    # else:
    #     data = serializer.errors
    # return Response(data)


#
# def validate_email(email):
#     account = None
#     try:
#         account = Account.objects.get(email=email)
#     except Account.DoesNotExist:
#         return None
#     if account != None:
#         return email
#
# def validate_username(username):
#     account = None
#     try:
#         account = Account.objects.get(username=username)
#     except Account.DoesNotExist:
#         return None
#     if account != None:
#         return username
#     # permission_classes = [permissions.IsAuthenticated]
#
# @api_view(['GET', ])
# @permission_classes((IsAuthenticated, ))
# def account_properties_view(request):
#
# 	try:
# 		account = request.user
# 	except Account.DoesNotExist:
# 		return Response(status=status.HTTP_404_NOT_FOUND)
#
# 	if request.method == 'GET':
# 		serializer = AccountPropertiesSerializer(account)
# 		return Response(serializer.data)

class LaptopViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    pagination_class = None
    queryset = Laptops.objects.all()
    serializer_class = LaptopSerializer
    # permission_classes = [permissions.IsAuthenticated]


class DesktopViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    pagination_class = None
    queryset = Desktops.objects.all()
    serializer_class = DesktopSerializer
    # permission_classes = [permissions.IsAuthenticated]


class RegisterViewSet(viewsets.ModelViewSet):
    # User = get_user_model()
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Register.objects.all()
    # .order_by('-date_joined')
    serializer_class = RegistrationSerializer


@action(methods=['get'], detail=True)
def get_user(request):
    param = request.GET
    myDict = param
    name = myDict.get("username")
    if name:
        result = Register.objects.filter(username__icontains=name)
        result = RegistrationSerializer(result, many=True)
        return JsonResponse(result.data, safe=False)

@api_view(['GET'],)
@permission_classes((IsAuthenticated,))
def get_ads(request):
    user_id = request.user.id
    result = Desktops.objects.filter(user_id=user_id)
    desktops = DesktopSerializer(result, many=True)
    result = Laptops.objects.filter(user_id=user_id)
    laptops = LaptopSerializer(result, many=True)
    result={"laptops":laptops.data,"desktops":desktops.data,"username":request.user.username,"phone":request.user.phone,"email":request.user.email}

    return JsonResponse(result, safe=False)

    # result = Register.objects.filter(username__icontains=name)
        # result = RegistrationSerializer(result, many=True)
        # return JsonResponse(result.data, safe=False)


@action(methods=['get'], detail=True)
def searchLaptop(request):
    print("Im here")
    param = request.GET
    myDict = param
    name = myDict.get("name")
    min_price = myDict.get("min_price")
    # min_price=int(min_price)
    max_price = myDict.get("max_price")
    result = Laptops.objects

    if name:
        result = result.filter(name__icontains=name)
    if min_price:
        result = result.filter(price__gte=min_price)
    if max_price:
        result = result.filter(price__lte=max_price)

    result = LaptopSerializer(result, many=True)
    return JsonResponse(result.data, safe=False)


@action(methods=['get'], detail=True)
def searchDesktop(request):
    print("Im here")
    param = request.GET
    myDict = param
    name = myDict.get("name")
    min_price = myDict.get("min_price")
    # min_price=int(min_price)
    max_price = myDict.get("max_price")
    result = Desktops.objects

    if name:
        result = result.filter(name__icontains=name)
    if min_price:
        result = result.filter(price__gte=min_price)
    if max_price:
        result = result.filter(price__lte=max_price)

    result = DesktopSerializer(result, many=True)
    return JsonResponse(result.data, safe=False)


# @action(methods=['post'],detail=True)
@api_view(['POST',])
@permission_classes((IsAuthenticated,))
def postDevice(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        c_data = '{ "name":"", "url":"", "price":0,"image_urls":"","phone":""}'
        customer_data = json.loads(c_data)
        customer_data['name'] = data['name']
        customer_data['url'] = "localhost:4200"

        customer_data['price'] = int(data['price'])

        customer_data['image_urls'] = data['image_urls']
        if data.get("phone"):
            customer_data['phone'] = data['phone']
        else:
            customer_data['phone'] = request.user.phone
        customer_data['user_id'] = request.user.id
        if data['type'] == 'Desktop':
            customer_serializer = DesktopSerializer(data=customer_data)
        else:
            customer_serializer = LaptopSerializer(data=customer_data)

        if customer_serializer.is_valid():
            setattr(customer_serializer,"phone",customer_data['phone'])
            customer_serializer.save()
            return JsonResponse(customer_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(customer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['PUT',])
@permission_classes((IsAuthenticated,))
def updateDevice(request):
    if request.method == 'PUT':

        data = JSONParser().parse(request)
        c_data = '{ "name":"","image_urls":"", "price":0,"phone":"","id":0}'
        customer_data = json.loads(c_data)
        # print(data)
        if data['type'] == 'Desktop':
            customer_data['id'] = int(data['id'])
            result = Desktops.objects.get(id=customer_data['id'])
            # operation = result.delete()
        else:
            customer_data['id'] = int(data['id'])
            result = Laptops.objects.get(id=customer_data['id'])
            # operation = result.delete()
        # print(int(data['id']));
        c_data = '{ "name":"","image_urls":"", "price":0,"phone":"","id":0}'
        customer_data = json.loads(c_data)
        customer_data['name'] = data['name']
        customer_data['url'] = "localhost:4200"

        customer_data['price'] = int(data['price'])

        customer_data['image_urls'] = data['image_urls']
        if data.get("phone"):
            customer_data['phone'] = data['phone']
        else:
            customer_data['phone'] = request.user.phone
        customer_data['user_id'] = request.user.id
        if data['type'] == 'Desktop':
            customer_serializer = DesktopSerializer(result,data=customer_data)
        else:
            customer_serializer = LaptopSerializer(result,data=customer_data)

        if customer_serializer.is_valid():
            setattr(customer_serializer,"phone",customer_data['phone'])
            customer_serializer.save()
            return JsonResponse(customer_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(customer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE',])
# @permission_classes((IsAuthenticated,))
def DeleteDevice(request):
    param = request.GET
    myDict = param
    pk = myDict.get("user_id")
    type = myDict.get("type")
    # print(request.data)
    if request.method == 'DELETE':

        if type == 'Desktop':
            result = Desktops.objects.get(id=pk)
            result.delete()
            return JsonResponse({'message': "fuck"}, status=status.HTTP_200_OK)

            # operation = result.delete()
        else:
            result = Laptops.objects.get(id=pk)
            result.delete()
            return JsonResponse({'message': "fuck"}, status=status.HTTP_200_OK)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    # permission_classes = [permissions.IsAuthenticated]
# class CustomerViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """
#     queryset = Customer.objects.all()
#     serializer_class = CustomerSerializer
#     # permission_classes = [permissions.IsAuthentica
