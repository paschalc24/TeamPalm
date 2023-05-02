from django.urls import path

from .views import (
    AnalyticsApiAllPostsView,
    AnalyticsApiAllAuthorsView,
    AnalyticsPostByNumApiView,
    AnalyticsPostByAuthorApiView,
    AnalyticsPostByTimeframeApiView,
    AnalyticsUnansweredPostsApiView,
    AnalyticsMostViewedPostsApiView,
    AnalyticsMostAnsweredPostsApiView,
    AnalyticsForumTraffic,
    AnalyticsResponseTimeApiView,
    StudentVsModPostsApiView,
    AnalyticsViewsByTimeframeApiView,
)

urlpatterns = [
    path('posts/', AnalyticsApiAllPostsView.as_view()),
    path('authors/', AnalyticsApiAllAuthorsView.as_view()),
    path('posts/<int:post_id>/', AnalyticsPostByNumApiView.as_view()),
    path('postsbyauthor/<str:author_id>/', AnalyticsPostByAuthorApiView.as_view()),
    path('postsbytimeframe/<str:start_time>/<str:end_time>/', AnalyticsPostByTimeframeApiView.as_view()),
    path('unansweredposts/', AnalyticsUnansweredPostsApiView.as_view()),
    path('mostviewedposts/', AnalyticsMostViewedPostsApiView.as_view()),
    path('mostansweredposts/', AnalyticsMostAnsweredPostsApiView.as_view()),
    path('forumtraffic/', AnalyticsForumTraffic.as_view()),
    path('responsetime/', AnalyticsResponseTimeApiView.as_view()),
    path('posts/<str:student_or_mod>/', StudentVsModPostsApiView.as_view()),
    path('viewsbytimeframe/<str:start_time>/<str:end_time>/', AnalyticsViewsByTimeframeApiView.as_view()),
]
