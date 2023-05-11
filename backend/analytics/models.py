from django.db import models
from django.contrib.auth.models import User

class Author(models.Model):
    slug = models.CharField(max_length=9, primary_key=True)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    moderator = models.BooleanField(default=False)
    username = models.CharField(null=True, max_length=50)

    def __str__(self):
        return self.username if self.moderator else '-'

class Course(models.Model):
    course_id = models.IntegerField(default=0, primary_key=True)
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class Post(models.Model):
    author = models.ForeignKey(Author, related_name='posts', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, null=True, on_delete=models.CASCADE)
    number = models.IntegerField(default=0, primary_key=True)
    post_slug = models.CharField(max_length=9)
    title = models.CharField(max_length=100)
    body = models.CharField(max_length=200)
    type = models.CharField(max_length=10)
    public = models.BooleanField(default=True)
    publishedAt = models.DateTimeField(null=True)
    viewsCount = models.IntegerField(default=0)
    uniqueViewsCount = models.IntegerField(default=0)
    read = models.BooleanField(default=False)
    modAnsweredAt = models.DateTimeField(null=True)
    answersCount = models.IntegerField(default=0)
    likesCount = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class Staff(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    author = models.OneToOneField(Author, null=True, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course)

    def __str__(self):
        return self.user.username
