from django.db import models

class Author(models.Model):
    slug = models.CharField(max_length=9, primary_key=True)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)

class Post(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
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