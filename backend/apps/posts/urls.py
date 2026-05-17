from django.urls import path
from .views import (
    PostCreateView,
    FeedView,
    UserPostsView,
    PostDetailView,
    PostLikeToggleView,
    CommentListCreateView,
    CommentDetailView,
)

urlpatterns = [
    # Core Post Routes
    path("create/", PostCreateView.as_view(), name="post-create"),
    path("feed/", FeedView.as_view(), name="global-feed"),
    path("user/<int:user_id>/", UserPostsView.as_view(), name="user-posts"),
    path("<int:id>/", PostDetailView.as_view(), name="post-detail"),
    
    # Interactions Routes
    path("<int:id>/like/", PostLikeToggleView.as_view(), name="post-like-toggle"),
    path("<int:post_id>/comments/", CommentListCreateView.as_view(), name="post-comments"),
    path("comments/<int:id>/", CommentDetailView.as_view(), name="comment-detail"),
]