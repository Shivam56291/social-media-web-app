from rest_framework import generics, status
from rest_framework.response import Response

from .serializers import (
    RegisterSerializer,
    LoginSerializer
)

from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = RegisterSerializer


class LoginView(generics.GenericAPIView):

    serializer_class = LoginSerializer

    def post(self, request):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        return Response(
            serializer.validated_data,
            status=status.HTTP_200_OK
        )