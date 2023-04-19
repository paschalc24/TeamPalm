from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Author, Post
from .serializers import AuthorSerializer, PostSerializer

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
    # Helper method to get the object with given post_id
    def get_object(self, post_id):
        try:
            return Post.objects.get(number=post_id)
        except Post.DoesNotExist:
            return None

    # Retrieves the Post with given post_id
    def get(self, request, post_id):
        Post_instance = self.get_object(post_id)
        if not Post_instance:
            return Response(
                {"res": "Object with Post id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = PostSerializer(Post_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AnalyticsAuthorByNumApiView(APIView):
    # Helper method to get the object with given post_id
    def get_object(self, author_id):
        try:
            return Author.objects.get(slug=author_id)
        except Author.DoesNotExist:
            return None

    # Retrieves the Author with given Author_id
    def get(self, request, author_id):
        Author_instance = self.get_object(author_id)
        if not Author_instance:
            return Response(
                {"res": "Object with Author id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = AuthorSerializer(Author_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
