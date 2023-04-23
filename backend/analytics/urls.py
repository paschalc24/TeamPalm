from django.urls import path

from .views import (
    AnalyticsApiAllPostsView,
    AnalyticsApiAllAuthorsView,
    AnalyticsPostByNumApiView,
    AnalyticsPostByAuthorApiView,
    AnalyticsPostByTimeframeApiView
)

urlpatterns = [
    path('posts/', AnalyticsApiAllPostsView.as_view()),
    path('authors/', AnalyticsApiAllAuthorsView.as_view()),
    path('posts/<int:post_id>/', AnalyticsPostByNumApiView.as_view()),
    path('postsbyauthor/<str:author_id>/', AnalyticsPostByAuthorApiView.as_view()),
    path('postsbytimeframe/<str:start_time>/<str:end_time>/', AnalyticsPostByTimeframeApiView.as_view()),
]
