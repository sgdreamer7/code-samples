from django.urls import path
from .views import UserViewSet, WebSockerInfoList
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path('info/', WebSockerInfoList.as_view())
]

router = DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
urlpatterns += router.urls
