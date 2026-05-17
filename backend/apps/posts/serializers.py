from django.db.models.fields import related_descriptors
from rest_framework import serializers
from .models import Post, Comment
from apps.users.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    author_detail = UserSerializer(
        source="author",
        read_only=True
    )

    class Meta:
        model = Comment

        fields = [
            "id",
            "post",
            "author",
            "author_detail",
            "content",
            "created_at",
        ]

        read_only_fields = [
            "author",
            "post",
        ]


class PostSerializer(serializers.ModelSerializer):

    author_detail = UserSerializer(
        source="author",
        read_only=True
    )

    likes_count = serializers.SerializerMethodField()

    comments_count = serializers.SerializerMethodField()

    is_liked = serializers.SerializerMethodField()

    shares_count = serializers.SerializerMethodField()

    # This renders the original post details nested inside the shared post representation
    parent_post_detail = serializers.SerializerMethodField()

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
            "shares_count",
            "parent_post",
            "parent_post_detail",
            "created_at",
            "updated_at",
        ]

        read_only_fields = ["author"]

        extra_kwargs = {
            "content": {
                "required": False,
                "allow_blank": True,
            }
        }

    def validate(self, attrs):

        content = attrs.get("content", "").strip()

        image_urls = attrs.get("image_urls", [])

        if not content and not image_urls:

            raise serializers.ValidationError(
                "Post cannot be empty."
            )

        return attrs

    def get_likes_count(self, obj):
        return obj.total_likes()

    def get_comments_count(self, obj):
        return obj.comments.count()
    
    def get_shares_count(self, obj):
        return obj.shares.count()

    def get_is_liked(self, obj):

        request = self.context.get("request")

        if (
            request and
            request.user.is_authenticated
        ):

            return obj.likes.filter(
                id=request.user.id
            ).exists()

        return False
    
    def get_parent_post_detail(self, obj):
        if obj.parent_post:
            return PostSerializer(obj.parent_post, context=self.context).data
        return None