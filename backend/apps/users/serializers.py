from django.contrib.auth.password_validation import (
    validate_password
)

from django.contrib.auth import (
    get_user_model,
    authenticate
)

from rest_framework import serializers

from rest_framework_simplejwt.tokens import (
    RefreshToken
)

from apps.posts.models import Post

from .models import Follow

User = get_user_model()


# POST SERIALIZER
class UserPostSerializer(
    serializers.ModelSerializer
):

    total_likes = (
        serializers.SerializerMethodField()
    )

    comment_count = (
        serializers.SerializerMethodField()
    )

    author_username = (
        serializers.CharField(
            source="author.username",
            read_only=True
        )
    )

    author_avatar = (
        serializers.CharField(
            source="author.avatar_url",
            read_only=True
        )
    )

    class Meta:

        model = Post

        fields = [
            "id",

            "author",

            "author_username",

            "author_avatar",

            "content",

            "image_urls",

            "total_likes",

            "comment_count",

            "created_at",

            "updated_at",
        ]

    def get_total_likes(
        self,
        obj
    ):

        return obj.likes.count()

    def get_comment_count(
        self,
        obj
    ):

        return obj.comments.count()


# FOLLOW SERIALIZER
class FollowSerializer(
    serializers.ModelSerializer
):

    follower_username = (
        serializers.CharField(
            source="follower.username",
            read_only=True
        )
    )

    following_username = (
        serializers.CharField(
            source="following.username",
            read_only=True
        )
    )

    follower_avatar = (
        serializers.CharField(
            source="follower.avatar_url",
            read_only=True
        )
    )

    following_avatar = (
        serializers.CharField(
            source="following.avatar_url",
            read_only=True
        )
    )

    class Meta:

        model = Follow

        fields = [
            "id",

            "follower",
            "follower_username",
            "follower_avatar",

            "following",
            "following_username",
            "following_avatar",

            "status",

            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "follower",
        ]


# REGISTER
class RegisterSerializer(
    serializers.ModelSerializer
):

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "password",
        ]

    def validate_username(
        self,
        value
    ):

        if User.objects.filter(
            username=value
        ).exists():

            raise serializers.ValidationError(
                "Username already taken"
            )

        return value

    def validate_email(
        self,
        value
    ):

        if User.objects.filter(
            email=value
        ).exists():

            raise serializers.ValidationError(
                "Email already exists"
            )

        return value

    def create(
        self,
        validated_data
    ):

        user = User.objects.create_user(
            username=validated_data[
                "username"
            ],

            email=validated_data[
                "email"
            ],

            password=validated_data[
                "password"
            ],
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

    def validate(
        self,
        data
    ):

        login = data.get("login")

        password = data.get(
            "password"
        )

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

                user_obj = (
                    User.objects.get(
                        username=login
                    )
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

        refresh = RefreshToken.for_user(
            user
        )

        self.user = user

        return {

            "access": str(
                refresh.access_token
            ),

            "refresh": str(refresh),

            "user": UserSerializer(
                user,
                context=self.context
            ).data,
        }


# FULL USER
class UserSerializer(
    serializers.ModelSerializer
):

    follower_count = (
        serializers.SerializerMethodField()
    )

    following_count = (
        serializers.SerializerMethodField()
    )

    post_count = (
        serializers.SerializerMethodField()
    )

    follow_status = (
        serializers.SerializerMethodField()
    )

    posts = UserPostSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = User

        fields = [
            "id",

            "username",

            "email",

            "first_name",

            "last_name",

            "bio",

            "avatar_url",

            "is_private",

            "created_at",

            "follower_count",

            "following_count",

            "post_count",

            "follow_status",

            "posts",
        ]

    def get_follower_count(
        self,
        obj
    ):

        return (
            Follow.objects.filter(
                following=obj,
                status=Follow.Status.ACCEPTED
            ).count()
        )

    def get_following_count(
        self,
        obj
    ):

        return (
            Follow.objects.filter(
                follower=obj,
                status=Follow.Status.ACCEPTED
            ).count()
        )

    def get_post_count(
        self,
        obj
    ):

        return obj.posts.count()

    def get_follow_status(
        self,
        obj
    ):

        request = self.context.get(
            "request"
        )

        if not request:

            return "NONE"

        if request.user.is_anonymous:

            return "NONE"

        if request.user == obj:

            return "SELF"

        follow = (
            Follow.objects.filter(
                follower=request.user,
                following=obj
            ).first()
        )

        if not follow:

            return "NONE"

        return follow.status


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


# UPDATE EMAIL
class UpdateEmailSerializer(
    serializers.Serializer
):

    email = serializers.EmailField()

    def validate_email(
        self,
        value
    ):

        user = self.context[
            "request"
        ].user

        if (
            User.objects.exclude(
                id=user.id
            ).filter(
                email=value
            ).exists()
        ):

            raise serializers.ValidationError(
                "Email already exists"
            )

        return value


# CHANGE PASSWORD
class ChangePasswordSerializer(
    serializers.Serializer
):

    current_password = (
        serializers.CharField()
    )

    new_password = (
        serializers.CharField()
    )

    def validate_new_password(
        self,
        value
    ):

        validate_password(value)

        return value