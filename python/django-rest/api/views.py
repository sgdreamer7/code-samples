from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.views import View

from api.serializers import UserProfileSerializer, InfoSerializer
from .models import UserProfile, Info
from rest_framework import viewsets, mixins, generics
from rest_framework.permissions import AllowAny


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    permission_classes = (AllowAny,)


class WebSockerInfoList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Info.objects.all()
    serializer_class = InfoSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        channel_layer = get_channel_layer()
        info = self.create(request, *args, **kwargs)
        async_to_sync(channel_layer.group_send)("info", {
            "type": "info.message",
            "info": "New info from backend",
            "data": info.data})
        return info


