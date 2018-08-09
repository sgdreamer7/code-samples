from rest_framework import serializers

from .models import User, DeviceProducer, DeviceModel


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id', 'email', 'first_name', 'last_name',
        )


class DeviceProducerSerializer(serializers.ModelSerializer):

    class Meta:
        model = DeviceProducer
        fields = ('id', 'title')


class DeviceModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = DeviceModel
        fields = ('id', 'title', 'url')
