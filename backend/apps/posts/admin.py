# apps/posts/admin.py
from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["author", "content_preview", "created_at"]
    
    def content_preview(self, obj):
        return obj.content[:30]