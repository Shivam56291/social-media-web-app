from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import (
    update_session_auth_hash,
    get_user_model
)

from django.contrib.auth.models import (
    update_last_login
)

from rest_framework.views import APIView

from rest_framework import (
    generics,
    status
)

from rest_framework.response import (
    Response
)

from rest_framework.permissions import (
    IsAuthenticated
)

from apps.posts.models import Post

from apps.posts.serializers import (
    PostSerializer
)

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserSerializer,
    ChangePasswordSerializer,
    UpdateEmailSerializer,
    UpdateProfileSerializer
)

User = get_user_model()


# REGISTER
class RegisterView(
    generics.CreateAPIView
):

    queryset = User.objects.all()

    serializer_class = (
        RegisterSerializer
    )


# LOGIN
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.user
        update_last_login(None, user)

        refresh = RefreshToken.for_user(user)

        res = Response({
            "access": str(refresh.access_token),
            "user": UserSerializer(user).data,
        })

        # 🔥 IMPORTANT: HttpOnly cookie (refresh token)
        res.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False,   # set True in production HTTPS
            samesite="Lax",
            max_age=7 * 24 * 60 * 60,
        )

        return res


# CURRENT USER
class CurrentUserView(
    generics.RetrieveAPIView
):

    serializer_class = (
        UserSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    def get_object(self):

        return self.request.user


# UPDATE PROFILE
class UpdateProfileView(
    generics.UpdateAPIView
):

    serializer_class = (
        UpdateProfileSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    def get_object(self):

        return self.request.user


# UPDATE EMAIL
class UpdateEmailView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def patch(self, request):

        serializer = (
            UpdateEmailSerializer(
                data=request.data,
                context={
                    "request": request
                }
            )
)

        serializer.is_valid(
            raise_exception=True
        )

        request.user.email = (
            serializer.validated_data[
                "email"
            ]
        )

        request.user.save()

        return Response(
            UserSerializer(
                request.user
            ).data
        )


# CHANGE PASSWORD
class ChangePasswordView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def patch(self, request):

        serializer = (
            ChangePasswordSerializer(
                data=request.data
            )
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = request.user

        if not user.check_password(
            serializer.validated_data[
                "current_password"
            ]
        ):

            return Response(
                {
                    "detail":
                    "Current password is incorrect"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(
            serializer.validated_data[
                "new_password"
            ]
        )

        user.save()

        update_session_auth_hash(
            request,
            user
        )

        return Response(
            {
                "detail":
                "Password updated successfully"
            }
        )


# UPDATE PRIVACY
class UpdatePrivacyView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def patch(self, request):

        is_private = request.data.get(
            "is_private",
            False
        )

        request.user.is_private = (
            is_private
        )

        request.user.save()

        return Response(
            UserSerializer(
                request.user
            ).data
        )


# DEACTIVATE ACCOUNT
class DeactivateAccountView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        user = request.user

        user.is_active = False

        user.save()

        return Response(
            {
                "detail":
                "Account deactivated"
            }
        )


# LOGOUT ALL DEVICES
class LogoutAllDevicesView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        try:

            refresh_token = (
                request.COOKIES.get(
                    "refresh_token"
                )
            )

            if not refresh_token:

                return Response(
                    {
                        "detail":
                        "No refresh token"
                    },
                    status=400
                )

            token = RefreshToken(
                refresh_token
            )

            token.blacklist()

            response = Response({
                "detail":
                "Logged out everywhere"
            })

            response.delete_cookie(
                "refresh_token"
            )

            return response

        except Exception as e:

            return Response(
                {
                    "detail":
                    "Invalid token",
                    "error": str(e)
                },
                status=400
            )
            
# ALL USERS
class AllUsersView(
    generics.ListAPIView
):

    serializer_class = (
        UserSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    queryset = (
        User.objects.all()
        .order_by("-created_at")
    )


# USER PROFILE BY ID
class UserProfileView(
    generics.RetrieveAPIView
):

    serializer_class = (
        UserSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    queryset = User.objects.all()

    lookup_field = "id"


# MY POSTS
class MyPostsView(
    generics.ListAPIView
):

    serializer_class = (
        PostSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

        return (
            Post.objects.filter(
                author=self.request.user
            )
            .select_related(
                "author"
            )
            .prefetch_related(
                "likes",
                "comments"
            )
            .order_by("-created_at")
        )

class CookieTokenRefreshView(APIView):

    def post(self, request):

        try:

            refresh_token = request.COOKIES.get(
                "refresh_token"
            )

            if not refresh_token:

                return Response(
                    {
                        "detail":
                        "No refresh token"
                    },
                    status=status.HTTP_401_UNAUTHORIZED
                )

            old_refresh = RefreshToken(
                refresh_token
            )

            # get user id
            user_id = old_refresh.payload.get(
                "user_id"
            )

            # fetch actual user object
            user = User.objects.get(
                id=user_id
            )

            # blacklist old refresh token
            try:
                old_refresh.blacklist()
            except:
                pass

            # create new refresh token
            new_refresh = (
                RefreshToken.for_user(user)
            )

            response = Response({
                "access": str(
                    new_refresh.access_token
                )
            })

            response.set_cookie(
                key="refresh_token",

                value=str(new_refresh),

                httponly=True,

                secure=False,

                samesite="Lax",

                max_age=7 * 24 * 60 * 60,
            )

            return response

        except Exception as e:

            return Response(
                {
                    "detail":
                    "Invalid refresh",
                    "error": str(e)
                },
                status=status.HTTP_401_UNAUTHORIZED
            )