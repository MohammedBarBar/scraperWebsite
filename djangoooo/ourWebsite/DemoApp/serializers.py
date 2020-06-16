from django.contrib.auth.models import Group
from rest_framework import serializers
from .models import Laptops, Desktops, Register
from django.contrib.auth import get_user_model


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Register
        fields = ['id', 'email', 'username', 'phone', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def save(self):
        account = Register(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            phone=self.validated_data['phone']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        account.set_password(password)
        account.save()
        # return account


#
# class AccountPropertiesSerializer(serializers.ModelSerializer):
#
# 	class Meta:
# 		model = Account
# 		fields = ['pk', 'email', 'username', ]
#
#
#
#
# class ChangePasswordSerializer(serializers.Serializer):
#
# 	old_password 				= serializers.CharField(required=True)
# 	new_password 				= serializers.CharField(required=True)
# 	confirm_new_password 		= serializers.CharField(required=True)
#
#

# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     # User = get_user_model()
#     class Meta:
#         model = User
#         fields = ['email', 'username', 'password']
#         extra_kwargs = {'password' : {'write_only' : True, 'required': True}}
#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         return user

# class CustomerSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Customer
#         fields = ['id', 'username', 'email','phone', 'password','password1']
#     extra_kwargs = {'password' : {'write_only' : True, 'required': True}}
# def create(self, validated_data):
#     user = User.objects.create_user(**validated_data)
#     return user


class LaptopSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Laptops
        fields = ['id','name', 'url', 'price', 'image_urls', 'user_id', 'phone']

from rest_framework import serializers
class DesktopSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Desktops
        fields = ['id','name', 'url', 'price', 'image_urls', 'user_id', 'phone']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
