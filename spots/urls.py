from django.urls import path, include
from .views import (
    index,
    like_spot,
    add_spot,
)

urlpatterns = [
    path('', index, name="index"),
    path('like/<str:spot_id>/', like_spot, name="like_spot"),
    path('add/', add_spot, name="add_spot"),
]