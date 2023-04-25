from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Author, Post
from .serializers import AuthorSerializer, PostSerializer  
from datetime import datetime, timedelta
from collections import defaultdict


class AnalyticsApiAllAuthorsView(APIView):
    # List all Authors
    def get(self, request):
      authors = Author.objects.all()
      serializer = AuthorSerializer(authors, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
      
class AnalyticsApiAllPostsView(APIView):      
    # List all Posts
    def get(self, request):
      posts = Post.objects.all()
      serializer = PostSerializer(posts, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)

class AnalyticsPostByNumApiView(APIView):
  # Retrieves the Post with given post_id
  def get(self, request, post_id):
    Post_instance = Post.objects.get(number=post_id)
    if not Post_instance:
        return Response(
            {"res": "Object with Post id does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = PostSerializer(Post_instance)
    return Response(serializer.data, status=status.HTTP_200_OK)

class AnalyticsPostByAuthorApiView(APIView):
  # Retrieves the Post with given author_id
  def get(self, request, author_id):
    Post_instance = Post.objects.filter(author=author_id)
    if not Post_instance:
        return Response(
            {"res": "Object with Author id does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )
    serializer = PostSerializer(Post_instance, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class AnalyticsPostByTimeframeApiView(APIView):
  # Retrieves the post within given time-frame
  def get(self, request, start_time, end_time):
    start_time = datetime.strptime(start_time, "%Y-%m-%d")
    end_time = datetime.strptime(end_time, "%Y-%m-%d")
    posts = set()
    for post in Post.objects.all():
      if post.publishedAt and start_time <= post.publishedAt <= end_time:
        posts.add(post.number)

    response = Post.objects.filter(number__in=posts)
    serializer = PostSerializer(response, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class AnalyticsUnansweredPostsApiView(APIView):
  # Retrieves all unanswered posts
  def get(self, request):
    Post_instance = Post.objects.filter(modAnsweredAt=None)
    if not Post_instance:
        return Response(
            {"res": "Object with Author id does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )
    serializer = PostSerializer(Post_instance, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
class AnalyticsMostViewedPostsApiView(APIView):
  # Retrieves top ten most viewed posts
  def get(self, request):
     Post_instance = Post.objects.all().order_by('-viewsCount')[:10]
     if not Post_instance:
        return Response(
           {"res": "No posts in database"},
           status = status.HTTP_400_BAD_REQUEST
        )
     serializer = PostSerializer(Post_instance, many=True)
     return Response(serializer.data, status = status.HTTP_200_OK)
  
class AnalyticsForumTraffic(APIView):
  def get(self, request):
    num_posts = { "per_hour": defaultdict(list), "per_day": defaultdict(list), "per_week": defaultdict(list) }
    publish_times = [post.publishedAt for post in Post.objects.all() if post.publishedAt]
    start_time = datetime(publish_times[0].year, publish_times[0].month, publish_times[0].day, 0) 
    end_time = datetime(publish_times[-1].year, publish_times[-1].month, publish_times[-1].day + 1) 

    curr_hour = datetime(start_time.year, start_time.month, start_time.day, start_time.hour) 
    curr_day = curr_week = datetime(start_time.year, start_time.month, start_time.day) 
    hour_delta, day_delta, week_delta = timedelta(hours=1), timedelta(days=1), timedelta(weeks=1)
    while curr_hour <= end_time:
      num_posts["per_hour"][0].append(curr_hour)
      num_posts["per_hour"][1].append(len(Post.objects.filter(publishedAt__range=(curr_hour, curr_hour + hour_delta))))

      curr_hour += hour_delta

      if curr_day <= end_time:
        num_posts["per_day"][0].append(curr_day.strftime("%Y-%m-%d"))
        num_posts["per_day"][1].append(len(Post.objects.filter(publishedAt__range=(curr_day, curr_day + day_delta))))
        curr_day += day_delta

      if curr_week <= end_time:
        num_posts["per_week"][0].append(curr_week.strftime("%Y-%m-%d"))
        num_posts["per_week"][1].append(len(Post.objects.filter(publishedAt__range=(curr_week, curr_week + week_delta))))
        curr_week += week_delta       

    return Response(num_posts, status=status.HTTP_200_OK)