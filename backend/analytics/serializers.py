from rest_framework import serializers
from analytics.models import Author, Post

class AuthorSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Author
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class ResponseTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('number', 'publishedAt', 'modAnsweredAt')
