from django.urls import path
from .views import *

# URL Patterns for all API Endpoints (http://127.0.0.1:8000/<path>)
urlpatterns = [
    path('posts/', AllPosts.as_view()),
    path('authors/', AllAuthors.as_view()),
    path('comments/', AllComments.as_view()),
    path('posts/<int:post_id>/', PostByNumber.as_view()),
    path('postsbyauthor/<str:author_id>/', PostsByAuthor.as_view()),
    path('postsbytimeframe/<str:start_time>/<str:end_time>/', PostsByTimeFrame.as_view()),
    path('unansweredposts/', AllUnansweredPosts.as_view()),
    path('mostviewedposts/', MostViewedPosts.as_view()),
    path('mostuniqueviewedposts/', MostUniqueViewedPosts.as_view()),
    path('mostlikedposts/', MostLikedPosts.as_view()),
    path('mostansweredposts/', MostAnsweredPosts.as_view()),
    path('forumtraffic/', ForumTraffic.as_view()),
    path('responsetime/', ResponseTime.as_view()),
    path('posts/<str:student_or_mod>/', StudentVsModPosts.as_view()),
    path('viewsbytimeframe/<str:start_time>/<str:end_time>/', ViewsByTimeFrame.as_view()),
    path('unansweredbymod/', PostsUnansweredByMods.as_view()),
    path('viewstraffic/', ViewsTraffic.as_view()),
]
