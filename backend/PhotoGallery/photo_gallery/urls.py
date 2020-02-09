from django.urls import path
from .views import *

urlpatterns = [
    path('user', UserApiView.as_view()),
    path('user/<id>', UserApiViewIdEndpoint.as_view()),
    path('login', LoginApiView.as_view()),
    path('album', AlbumApiView.as_view()),
    path('album/<id>', AlbumApiViewIdEndpoint.as_view()),
    path('photo', PhotoApiView.as_view()),
    path('photo/<id>', PhotoApiViewIdEndpoint.as_view()),

    path('album/like/<album_id>', like_album),
    path('album/unlike/<album_id>', unlike_album),
    path('photo/like/<photo_id>', like_photo),
    path('photo/unlike/<photo_id>', unlike_photo),
]