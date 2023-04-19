from django.urls import path

from .views import (
    AnalyticsApiAllPostsView,
    AnalyticsApiAllAuthorsView,
    AnalyticsPostByNumApiView,
    AnalyticsAuthorByNumApiView
)

urlpatterns = [
    path('posts/', AnalyticsApiAllPostsView.as_view()),
    path('authors/', AnalyticsApiAllAuthorsView.as_view()),
    path('posts/<int:post_id>/', AnalyticsPostByNumApiView.as_view()),
    path('authors/<str:author_id>/', AnalyticsAuthorByNumApiView.as_view())
]
