from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from apps.users.views import (
    RegisterView,
    LoginView,
    CookieTokenRefreshView,
    CurrentUserView,

    UpdateProfileView,
    UpdateEmailView,
    ChangePasswordView,
    UpdatePrivacyView,
    DeactivateAccountView,
    LogoutAllDevicesView,

    AllUsersView,
    UserProfileView,

    MyPostsView,
)

urlpatterns = [

    # AUTH
    path(
        "register/",
        RegisterView.as_view()
    ),

    path(
        "login/",
        LoginView.as_view()
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),
    path(
    "token/refresh/",
    CookieTokenRefreshView.as_view(),
),


    # CURRENT USER
    path(
        "me/",
        CurrentUserView.as_view()
    ),

    path(
        "me/posts/",
        MyPostsView.as_view()
    ),

    path(
        "me/update/",
        UpdateProfileView.as_view()
    ),


    # ACCOUNT SETTINGS
    path(
        "update-email/",
        UpdateEmailView.as_view(),
    ),

    path(
        "change-password/",
        ChangePasswordView.as_view(),
    ),

    path(
        "privacy/",
        UpdatePrivacyView.as_view(),
    ),

    path(
        "deactivate/",
        DeactivateAccountView.as_view(),
    ),

    path(
        "logout-all/",
        LogoutAllDevicesView.as_view(),
    ),


    # USERS
    path(
        "all-users/",
        AllUsersView.as_view()
    ),

    path(
        "get-user/<int:id>/",
        UserProfileView.as_view()
    ),
]