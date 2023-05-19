from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from datetime import datetime, timedelta
from collections import defaultdict
import pytz


class AllAuthors(APIView):
    # List all Authors
    def get(self, request):
      authors = Author.objects.all()
      serializer = AuthorSerializer(authors, many=True)
      for author in serializer.data:
        author["endorsed_comments"] = [c.comment_id for c in Comment.objects.filter(author=author["slug"], endorsed=True)]
        author["answered_posts"] = list(set(c.post.number for c in Comment.objects.filter(author=author["slug"])))
      return Response(serializer.data, status=status.HTTP_200_OK)
      
class AllPosts(APIView):      
    # List all Posts
    def get(self, request):
      posts = Post.objects.all()
      serializer = PostSerializer(posts, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
  
class AllComments(APIView):
    # List all Comments
    def get(self, request):
      comments = Comment.objects.all()
      serializer = CommentSerializer(comments, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)

class PostByNumber(APIView):
  # Retrieves the Post with given post_id
  def get(self, request, post_id):
    try:
      post_instance = Post.objects.get(number=post_id)
    except:
      return Response(
          {"res": "Object with Post id does not exists"},
          status=status.HTTP_400_BAD_REQUEST
      )

    serializer = PostSerializer(post_instance)
    return Response(serializer.data, status=status.HTTP_200_OK)

class PostsByAuthor(APIView):
  # Retrieves the Post with given author_id
  def get(self, request, author_id):
    post_instance = Post.objects.filter(author=author_id)
    if not post_instance:
      return Response(
        {"res": "Object with Author id does not exists"},
        status=status.HTTP_400_BAD_REQUEST
      )
    serializer = PostSerializer(post_instance, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class PostsByTimeFrame(APIView):
  # Retrieves the post within given time-frame
  def get(self, request, start_time, end_time):
    timezone = pytz.timezone('UTC')
    start_time = timezone.localize(datetime.strptime(start_time, "%Y-%m-%d"))
    end_time = timezone.localize(datetime.strptime(end_time, "%Y-%m-%d"))
    posts = set()
    for post in Post.objects.all():
      if post.publishedAt and start_time <= post.publishedAt <= end_time:
        posts.add(post.number)

    if not posts: 
      return Response(
        {"res": "No posts exist within given time-frame"},
        status=status.HTTP_400_BAD_REQUEST
      )

    response = Post.objects.filter(number__in=posts)
    serializer = PostSerializer(response, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class AllUnansweredPosts(APIView):
  # Retrieves all unanswered posts
  def get(self, request):
    try:
      post_instance = Post.objects.filter(answersCount=0)
    except:
      return Response(
        {"res": "Object with Author id does not exists"},
        status=status.HTTP_400_BAD_REQUEST
      )
    serializer = PostSerializer(post_instance, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
class MostViewedPosts(APIView):
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
  
class MostUniqueViewedPosts(APIView):
   # Retrieves top ten most uniquely viewed posts
   def get(self, request):
      Post_instance = Post.objects.all().order_by('-uniqueViewsCount')[:10]
      if not Post_instance:
        return Response(
           {"res": "No posts in database"},
           status = status.HTTP_400_BAD_REQUEST
        )
      serializer = PostSerializer(Post_instance, many=True)
      return Response(serializer.data, status = status.HTTP_200_OK)
   
class MostLikedPosts(APIView):
   # Retrieves top ten most liked posts
   def get(self, request):
      Post_instance = Post.objects.all().order_by('-likesCount')[:10]
      if not Post_instance:
        return Response(
           {"res": "No posts in database"},
           status = status.HTTP_400_BAD_REQUEST
        )
      serializer = PostSerializer(Post_instance, many=True)
      return Response(serializer.data, status = status.HTTP_200_OK)

class MostAnsweredPosts(APIView):
  # Retrieves top ten most commented/answered posts
  def get(self, request):
     Post_instance = Post.objects.all().order_by('-answersCount')[:10]
     if not Post_instance:
        return Response(
           {"res": "No posts in database"},
           status = status.HTTP_400_BAD_REQUEST
        )
     serializer = PostSerializer(Post_instance, many=True)
     return Response(serializer.data, status = status.HTTP_200_OK)
  
class ForumTraffic(APIView):
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

class ResponseTime(APIView):
  # Retrieves publishedAt/modAnsweredAt fields of the data
  def get(self, request):
    Post_instance = Post.objects.all()
    if not Post_instance:
        return Response(
          {"res": "No posts in database"},
          status = status.HTTP_400_BAD_REQUEST
        )
    serializer = ResponseTimeSerializer(Post_instance, many=True)
    return Response(serializer.data, status = status.HTTP_200_OK)

class StudentVsModPosts(APIView):
  # Retrieves posts categorized by student and moderator
  def get(self, request, student_or_mod):
    if student_or_mod in {'student', 'moderator'}:
      serializer = PostSerializer(Post.objects.all().filter(author__moderator=student_or_mod=='moderator'), many=True)
      return Response(serializer.data, status = status.HTTP_200_OK)
    
    return Response({"res": "No Matching Posts Found."}, status = status.HTTP_400_BAD_REQUEST)
  
class ViewsByTimeFrame(APIView):
  # Retrieves the number of views within given time-frame
  def get(self, request, start_time, end_time):
    timezone = pytz.timezone('UTC')
    start_time = timezone.localize(datetime.strptime(start_time, "%Y-%m-%d"))
    end_time = timezone.localize(datetime.strptime(end_time, "%Y-%m-%d"))
    views, unique_views = 0, 0
    for post in Post.objects.all():
      if post.publishedAt and start_time <= post.publishedAt <= end_time:
        views += post.viewsCount if post.viewsCount else 0
        unique_views += post.uniqueViewsCount if post.uniqueViewsCount else 0

    if views == 0 and unique_views == 0:
      return Response(
        {"res": "No views exist within given time-frame"},
        status=status.HTTP_400_BAD_REQUEST
      )

    return Response({"views": views, "unique_views": unique_views}, status=status.HTTP_200_OK)

class PostsUnansweredByMods(APIView):
  # Retrieves all posts unanswered by mods
  def get(self, request):
    Post_instance = Post.objects.filter(modAnsweredAt=None, answersCount__gt=0)
    if not Post_instance:
        return Response(
            {"res": "Object does not exists"},
            status=status.HTTP_400_BAD_REQUEST
        )
    serializer = PostSerializer(Post_instance, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class ViewsTraffic(APIView):
  def get(self, request):
    num_views = { "per_hour": defaultdict(list), "per_day": defaultdict(list), "per_week": defaultdict(list) }
    publish_times = [post.publishedAt for post in Post.objects.all() if post.publishedAt]
    start_time = datetime(publish_times[0].year, publish_times[0].month, publish_times[0].day, 0) 
    end_time = datetime(publish_times[-1].year, publish_times[-1].month, publish_times[-1].day + 1) 

    curr_hour = datetime(start_time.year, start_time.month, start_time.day, start_time.hour) 
    curr_day = curr_week = datetime(start_time.year, start_time.month, start_time.day) 
    hour_delta, day_delta, week_delta = timedelta(hours=1), timedelta(days=1), timedelta(weeks=1)
    while curr_hour <= end_time:
      num_views["per_hour"][0].append(curr_hour)
      num_views["per_hour"][1].append(sum(
        [post.viewsCount for post in Post.objects.filter(publishedAt__range=(curr_hour, curr_hour + hour_delta))]
      ))

      curr_hour += hour_delta

      if curr_day <= end_time:
        num_views["per_day"][0].append(curr_day.strftime("%Y-%m-%d"))
        num_views["per_day"][1].append(sum(
          [post.viewsCount for post in Post.objects.filter(publishedAt__range=(curr_day, curr_day + day_delta))]
        ))
        curr_day += day_delta

      if curr_week <= end_time:
        num_views["per_week"][0].append(curr_week.strftime("%Y-%m-%d"))
        num_views["per_week"][1].append(sum(
          [post.viewsCount for post in Post.objects.filter(publishedAt__range=(curr_week, curr_week + week_delta))]
        ))
        curr_week += week_delta       

    return Response(num_views, status=status.HTTP_200_OK)
