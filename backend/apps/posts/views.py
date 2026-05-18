from apps.core.pagination import CommentCursorPagination
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer


# 1. CREATE A POST
class PostCreateView(generics.CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# 2. GLOBAL FEED
class FeedView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all().select_related("author").prefetch_related("likes")


# 3. POSTS BY A SPECIFIC USER
class UserPostsView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        return Post.objects.filter(author_id=user_id).select_related("author").prefetch_related("likes")


# 4. GET, UPDATE, OR DELETE A SINGLE POST
class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    lookup_field = "id"

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.author != request.user:
            return Response(
                {"detail": "You do not have permission to delete this post."},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().destroy(request, *args, **kwargs)


# 5. LIKE / UNLIKE TOGGLE
class PostLikeToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        post = get_object_or_404(Post, id=id)
        user = request.user

        if user in post.likes.all():
            post.likes.remove(user)
            liked = False
        else:
            post.likes.add(user)
            liked = True
            
        return Response(
            {
                "liked": liked, 
                "likes_count": post.total_likes()
            }, 
            status=status.HTTP_200_OK
        )


# 6. COMMENTS (LIST ALL FOR A POST OR CREATE NEW)
class CommentListCreateView(
    generics.ListCreateAPIView
):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CommentCursorPagination

    def get_queryset(self):
        return (
            Comment.objects
            .filter(
                post_id=self.kwargs["post_id"]
            )
            .select_related("author")
        )

    def perform_create(self,serializer):
        post = get_object_or_404(Post,id=self.kwargs["post_id"])
        serializer.save(author=self.request.user, post=post)


# 7. COMMENT DETAILS (RETRIEVE, UPDATE, OR DELETE A COMMENT WITH OWNERSHIP CHECKS)
class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    lookup_field = "id"

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        # Security Check: Only the author can edit their comment
        if instance.author != request.user:
            return Response(
                {"detail": "You do not have permission to edit this comment."},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Security Check: Only the comment author OR the post owner can delete it
        if instance.author != request.user and instance.post.author != request.user:
            return Response(
                {"detail": "You do not have permission to delete this comment."},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().destroy(request, *args, **kwargs)


# 8. SHARE POST (REPOST / RETWEET AN EXISTING POST WITH OPTIONAL THOUGHTS)
class PostShareView(generics.CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        parent_post_id = self.kwargs["post_id"]
        parent_post = get_object_or_404(Post, id=parent_post_id)
        
        # Optional: prevent sharing a share to avoid deep recursive nesting chains
        if parent_post.parent_post:
            # If they try to share a share, reference the original source root post instead
            parent_post = parent_post.parent_post

        content = request.data.get("content", "")

        shared_post = Post.objects.create(
            author=request.user,
            parent_post=parent_post,
            content=content
        )

        serializer = self.get_serializer(shared_post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)