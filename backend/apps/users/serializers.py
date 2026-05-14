from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from django.contrib.auth import (
    get_user_model,
    authenticate
)

from rest_framework_simplejwt.tokens import (
    RefreshToken
)

User = get_user_model()


# REGISTER
class RegisterSerializer(
    serializers.ModelSerializer
):

    password = serializers.CharField(
        write_only=True
    )

    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        return user


# LOGIN
class LoginSerializer(
    serializers.Serializer
):

    login = serializers.CharField()

    password = serializers.CharField(
        write_only=True
    )

    def validate(self, data):

        login = data.get("login")
        password = data.get("password")

        user = None

        # LOGIN USING EMAIL
        if "@" in login:

            user = authenticate(
                email=login,
                password=password
            )

        # LOGIN USING USERNAME
        else:

            try:

                user_obj = User.objects.get(
                    username=login
                )

                user = authenticate(
                    email=user_obj.email,
                    password=password
                )

            except User.DoesNotExist:

                raise serializers.ValidationError(
                    "Invalid credentials"
                )

        if not user:

            raise serializers.ValidationError(
                "Invalid credentials"
            )

        refresh = RefreshToken.for_user(user)
        self.user = user

        return {
            "access": str(
                refresh.access_token
            ),

            "refresh": str(refresh),

            "user": UserSerializer(user).data,
        }


# FULL USER
class UserSerializer(
    serializers.ModelSerializer
):
    follower_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "follower_count",
            "following_count",
            "bio",
            "avatar_url",
            "created_at",
        ]
    def get_follower_count(self,obj):
        return obj.followers.count()
    def get_following_count(self,obj):
        return obj.following.count()


# UPDATE PROFILE
class UpdateProfileSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = User

        fields = [
            "username",
            "first_name",
            "last_name",
            "bio",
            "avatar_url",
        ]

    def validate_username(
        self,
        value
    ):

        user = self.instance

        if (
            User.objects.exclude(
                id=user.id
            ).filter(
                username=value
            ).exists()
        ):

            raise serializers.ValidationError(
                "Username already taken"
            )

        return value

class UpdateEmailSerializer(
    serializers.Serializer
):

    email = serializers.EmailField()


class ChangePasswordSerializer(
    serializers.Serializer
):

    current_password = serializers.CharField()

    new_password = serializers.CharField()

    def validate_new_password(
        self,
        value,
    ):

        validate_password(value)

        return value