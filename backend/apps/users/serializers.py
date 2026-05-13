from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'password',
        ]

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        return user

class LoginSerializer(serializers.Serializer):

    login = serializers.CharField()

    password = serializers.CharField(
        write_only=True
    )

    def validate(self, data):

        login = data.get('login')

        password = data.get('password')

        user = None

        # Login using email
        if '@' in login:

            try:
                user_obj = User.objects.get(
                    email=login
                )

                user = authenticate(
                    username=user_obj.email,
                    password=password
                )

            except User.DoesNotExist:
                pass

        # Login using username
        else:

            try:
                user_obj = User.objects.get(
                    username=login
                )

                user = authenticate(
                    username=user_obj.email,
                    password=password
                )

            except User.DoesNotExist:
                pass

        if not user:
            raise serializers.ValidationError(
                "Invalid credentials"
            )

        refresh = RefreshToken.for_user(user)

        return {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }