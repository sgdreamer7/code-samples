from .models import User, DeviceProducer, DeviceModel
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, DeviceProducerSerializer, DeviceModelSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_permissions(self):
        return [permission() for permission in [IsAuthenticated]]


class DeviceProducerViewSet(viewsets.ModelViewSet):
    serializer_class = DeviceProducerSerializer
    queryset = DeviceProducer.objects.all()

    def get_permissions(self):
        return [permission() for permission in [IsAuthenticated]]


class DeviceModelViewSet(viewsets.ModelViewSet):
    serializer_class = DeviceModelSerializer
    queryset = DeviceModel.objects.all()

    def get_permissions(self):
        return [permission() for permission in [IsAuthenticated]]
