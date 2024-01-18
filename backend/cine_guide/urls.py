from django.urls import path
from .views import fetch_movies

urlpatterns = [
    path('fetch-movies/', fetch_movies, name='fetch_movies'),
]
