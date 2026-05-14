from apps.users.views import (
    UpdateProfileView,
    UpdateEmailView,
    ChangePasswordView,
    UpdatePrivacyView,
    DeactivateAccountView,
    LogoutAllDevicesView,
    AllUsersView,
    UserProfileView,
)
from django.urls import path

from .views import (
    RegisterView,
    LoginView,
    CurrentUserView
)

urlpatterns = [

    path(
        'register/',
        RegisterView.as_view()
    ),

    path(
        'login/',
        LoginView.as_view()
    ),

    path(
        'me/',
        CurrentUserView.as_view()
    ),
    path(
        "me/update/",
        UpdateProfileView.as_view()
    ),

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
        path(
        "all-users/",
        AllUsersView.as_view()
    ),

    path(
        "get-user/<int:id>/",
        UserProfileView.as_view()
    ),
]