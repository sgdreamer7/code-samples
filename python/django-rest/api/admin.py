from django.contrib import admin
from .models import User, DeviceProducer, DeviceModel


class UserAdmin(admin.ModelAdmin):
    pass


class DeviceProducerAdmin(admin.ModelAdmin):
    pass


class DeviceModelAdmin(admin.ModelAdmin):
    pass


admin.site.register(User, UserAdmin)
admin.site.register(DeviceProducer, DeviceProducerAdmin)
admin.site.register(DeviceModel, DeviceModelAdmin)
