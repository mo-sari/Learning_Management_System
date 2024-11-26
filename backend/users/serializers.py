"User Serializers"

from djoser.serializers import UserCreateSerializer
from .models import (
    User,
    Profile,
)


class UserSerializer(UserCreateSerializer):
    """User Serializer"""
    class Meta:
        model = User
        fields = '__all__'


class ProfileSerializer(UserCreateSerializer):
    """Profile Serializer"""
    class Meta:
        model = Profile
        fields = '__all__'
