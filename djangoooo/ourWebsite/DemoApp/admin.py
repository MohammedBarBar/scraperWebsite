from django.contrib import admin
from .models import Laptops, Desktops, Register
from django.contrib.auth.admin import UserAdmin


class AccountAdmin(UserAdmin):
    list_display = ('pk', 'email', 'username', 'phone', 'date_joined', 'last_login', 'is_admin', 'is_staff')
    list_display_links = ('email', 'username')
    search_fields = ('pk', 'email', 'username')
    readonly_fields = ('pk', 'date_joined', 'last_login')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


# Register your models here.
admin.site.register(Laptops)
admin.site.register(Desktops)
admin.site.register(Register, AccountAdmin)
# admin.site.register(Register)
