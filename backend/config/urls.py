from django.contrib import admin
from django.urls import path, include

from apps.base.views import home

urlpatterns = [

    path('', home, name='home'),

    path('admin/', admin.site.urls),

    path('api/base/', include('apps.base.urls')),

    path('api/users/', include('apps.users.urls')),

    path('api/posts/', include('apps.posts.urls')),
]