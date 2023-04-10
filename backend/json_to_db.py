import sqlite3
import json
import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from analytics.models import *

conn = sqlite3.connect('db.sqlite3')
cursor = conn.cursor()

all_posts = json.load(open('cw_posts_scrubbed.json'))

def populateDatabase():
    all_authors = set()
    for post in all_posts:
        if post["author"]["slug"] not in all_authors:
            insertAuthor(post["author"]) 
            all_authors.add(post["author"]["slug"])  

        insertPost(post)     

def insertAuthor(author: dict):
    author_row, created = Author.objects.get_or_create(
        slug=author["slug"], 
        firstName=author["firstName"],
        lastName=author["lastName"]
    )
    
    if created:
        author_row.save()

def insertPost(post: dict):
    post_row, created = Post.objects.get_or_create(
        author=Author.objects.get(slug=post["author"]["slug"]),
        post_slug=post["slug"],
        public=post["visibility"]=="member",
    )

    if created:
        other_attrs = ["number", "title", "body", "type", "publishedAt", "viewsCount", 
                    "uniqueViewsCount", "read", "modAnsweredAt", "answersCount"]
        for attr in other_attrs:
            if attr in post:
                setattr(post_row, attr, post[attr])

        post_row.save()

populateDatabase()