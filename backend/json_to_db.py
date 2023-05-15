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
        for comment in post["comments"]:
            insertComment(post["number"], comment)

def insertAuthor(author: dict):
    mod_list = {"Jacob Friedman", "Lisa McCormick", "William Gonzalez", "Elizabeth Boyd", 
                "Sherri Horton", "Erica Brown", "James Martinez", "Emily Hoffman", 
                "Michael Gay", "Mark Baker", "Bill Green"}
    is_mod = (author["firstName"] + ' ' + author["lastName"]) in mod_list
    new_row = Author(
        slug=author["slug"], 
        firstName=author["firstName"],
        lastName=author["lastName"],
        moderator=is_mod
    )

    new_row.save()

def insertPost(post: dict):
    new_row = Post(
        author=Author.objects.get(slug=post["author"]["slug"]),
        post_slug=post["slug"],
        public=post["visibility"]=="member",
    )
    other_attrs = ["number", "title", "body", "type", "publishedAt", "viewsCount", 
                   "uniqueViewsCount", "read", "modAnsweredAt", "answersCount", "likesCount"]
    for attr in other_attrs:
        if attr in post:
            setattr(new_row, attr, post[attr])

    new_row.save()

def insertComment(post_num: int, comment: dict):
    try:
        author = Author.objects.get(slug=comment["author"]["slug"])
    except:
        insertAuthor(comment["author"])
        author = Author.objects.get(slug=comment["author"]["slug"])

    new_row = Comment(
        author=author,
        post=Post.objects.get(number=post_num),
        comment_id=comment["id"],
        endorsed=comment["endorsed"],
        is_answer=("answer" in comment),
        body=comment["body"],
        publishedAt=comment["publishedAt"]
    )

    new_row.save()

# Uncomment below line to populate the database
populateDatabase()