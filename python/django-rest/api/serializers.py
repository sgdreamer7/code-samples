from rest_framework import serializers

from .models import UserProfile, User, Info


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "email")


class UserProfileSerializer(serializers.ModelSerializer):
    user_info = UserSerializer(required=True)

    def create(self, validated_data):
        user_info_data = validated_data.pop('user_info')
        user_info = User.objects.create(**user_info_data)
        user_info.save()

        user_profile = UserProfile.objects.create(user_info=user_info, **validated_data)
        user_profile.save()

        return user_profile

    class Meta:
        model = UserProfile
        fields = (
            'avatar', 'age', 'user_info',
        )


class InfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Info
        exclude = ('id',)
