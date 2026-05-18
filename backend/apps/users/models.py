from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    username = models.CharField(
        max_length=150,
        unique=True,
    )

    email = models.EmailField(
        unique=True,
        max_length=500
    )

    bio = models.TextField(
        blank=True,
        max_length=1000
    )

    is_private = models.BooleanField(
        default=False
    )

    avatar_url = models.URLField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = [
        "username"
    ]

    def __str__(self):

        return self.username


class Follow(models.Model):

    class Status(models.TextChoices):

        PENDING = (
            "PENDING",
            "Pending"
        )

        ACCEPTED = (
            "ACCEPTED",
            "Accepted"
        )

    follower = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="following_relations"
    )

    following = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="follower_relations"
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        unique_together = (
            "follower",
            "following"
        )

        ordering = [
            "-created_at"
        ]

    def clean(self):

        if self.follower == self.following:

            raise ValueError(
                "Users cannot follow themselves"
            )

    def save(self, *args, **kwargs):

        self.clean()

        super().save(
            *args,
            **kwargs
        )

    def __str__(self):

        return (
            f"{self.follower.username} "
            f"-> "
            f"{self.following.username} "
            f"({self.status})"
        )