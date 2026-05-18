from django.urls import path

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

    FollowUserView,

    AcceptFollowRequestView,

    RejectFollowRequestView,

    UnfollowUserView,

    FollowersListView,

    FollowingListView,

    PendingRequestsView,
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


    # FOLLOW SYSTEM

    # FOLLOW USER
    path(
        "follow/<int:user_id>/",
        FollowUserView.as_view()
    ),

    # UNFOLLOW USER
    path(
        "unfollow/<int:user_id>/",
        UnfollowUserView.as_view()
    ),

    # ACCEPT REQUEST
    path(
        "follow-request/<int:follow_id>/accept/",
        AcceptFollowRequestView.as_view()
    ),

    # REJECT REQUEST
    path(
        "follow-request/<int:follow_id>/reject/",
        RejectFollowRequestView.as_view()
    ),

    # FOLLOWERS
    path(
        "followers/",
        FollowersListView.as_view()
    ),

    # FOLLOWING
    path(
        "following/",
        FollowingListView.as_view()
    ),

    # PENDING REQUESTS
    path(
        "pending-requests/",
        PendingRequestsView.as_view()
    ),
]