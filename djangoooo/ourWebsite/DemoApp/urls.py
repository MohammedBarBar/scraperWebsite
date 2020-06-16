from django.conf.urls import url
from django.contrib import admin
from . import views
# from .views import registration_view
from django.urls import path, include, re_path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'laptops', views.LaptopViewSet)
router.register(r'desktops', views.DesktopViewSet)
router.register(r'registers', views.RegisterViewSet)

urlpatterns = [
    # path('', views.hi, name='home-page'),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('get_user/', views.get_user),
    path('search/', views.searchLaptop),
    path('searchDesktop/', views.searchDesktop),
    path('post_ads/', views.postDevice),
    path('updateItem/',views.updateDevice),
    path('deleteItem/',views.DeleteDevice),
    path('registration/', views.registration_view, name='register'),
    path('login/', obtain_auth_token, name='login'),
    path('get_ads/', views.get_ads),
    path('admin/', admin.site.urls),
    # path('register', registration_view, name="register"),
    path('rest-auth/', include('rest_auth.urls')),
    # url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    # url(r'^account/', include('allauth.urls')),
    # url(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),

    # path('/get_laptop_by_name/',views.get_laptop_by_namne)
    # url(r'^$', 'DemoApp.views.hi', name='home-page')
    ]