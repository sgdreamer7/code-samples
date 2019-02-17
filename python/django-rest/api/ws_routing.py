from django.conf.urls import url
from .consumer import InfoConsumer

websocket_urlpatterns = [
    url(r'^ws/info/$', InfoConsumer),
]
