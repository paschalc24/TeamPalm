from rest_framework import serializers
from analytics.models import *

# Serializes Author Models to JSON Format
class AuthorSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = Author
        fields = '__all__'

# Serializes Post Models to JSON Format
class PostSerializer(serializers.ModelSerializer):
    comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Post
        fields = '__all__'

# Serializes Comment Models to JSON Format
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

# Serializes Response Time Objects to JSON Format
class ResponseTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('number', 'publishedAt', 'modAnsweredAt')
