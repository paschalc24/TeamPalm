from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Author, Post
from .serializers import AuthorSerializer, PostSerializer
from datetime import datetime

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
     Post_instance = Post.objects.all().order_by('-viewsCount')
     if not Post_instance:
        return Response(
           {"res": "No posts in database"},
           status = status.HTTP_400_BAD_REQUEST
        )
     serializer = PostSerializer(Post_instance, many=True)
     return Response(serializer.data, status = status.HTTP_200_OK)