from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Author, Post
from .serializers import AuthorSerializer, PostSerializer

class AnalyticsApiView(APIView):
    # 1. List all Authors
    def getAuthors(self, request):
      authors = Author.objects.all()
      serializer = AuthorSerializer(authors, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
      
    # 2. List all Posts
    def getPosts(self, request):
      posts = Post.objects.all()
      serializer = PostSerializer(posts, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)