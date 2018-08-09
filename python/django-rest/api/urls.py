from .views import UserViewSet, DeviceProducerViewSet, DeviceModelViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
router.register(r'device-producers', DeviceProducerViewSet, base_name='device-producer')
router.register(r'device-models', DeviceModelViewSet, base_name='device-model')
urlpatterns = router.urls
