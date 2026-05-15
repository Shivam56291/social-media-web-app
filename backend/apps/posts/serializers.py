from rest_framework import serializers
from .models import Post, Comment
from apps.users.serializers import UserSerializer

class CommentSerializer(serializers.ModelSerializer):
    author_detail = UserSerializer(source="author", read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "post", "author", "author_detail", "content", "created_at"]
        read_only_fields = ["author", "post"]


class PostSerializer(serializers.ModelSerializer):
    author_detail = UserSerializer(source="author", read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "author_detail",
            "content",
            "image_urls",
            "likes_count",
            "comments_count",
            "is_liked",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["author"]

    def get_likes_count(self, obj):
        return obj.total_likes()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_is_liked(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False