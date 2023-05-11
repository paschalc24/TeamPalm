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
    mod_list = {"Jacob Friedman", "Lisa Mccormick", "William Gonzalez", "Elizabeth Boyd", 
                "Sherri Horton", "Erica Brown", "James Martinez", 
                "Michael Gay", "Mark Baker", "Bill Green"}
    is_mod = (author["firstName"] + ' ' + author["lastName"]) in mod_list
    new_row = Author(
        slug=author["slug"], 
        firstName=author["firstName"],
        lastName=author["lastName"],
        moderator=is_mod,
        username=(author["firstName"][0] + author["lastName"]).lower() if is_mod else None
    )

    new_row.save()

def insertPost(post: dict):
    new_row = Post(
        author=Author.objects.get(slug=post["author"]["slug"]),
        post_slug=post["slug"],
        public=post["visibility"]=="member",
        course_id=1
    )
    other_attrs = ["number", "title", "body", "type", "publishedAt", "viewsCount", 
                   "uniqueViewsCount", "read", "modAnsweredAt", "answersCount", "likesCount"]
    for attr in other_attrs:
        if attr in post:
            setattr(new_row, attr, post[attr])

    new_row.save()

# new_course = Course(
#     course_id=1,
#     title='CompSci 320'
# )

# new_course.save()
# Uncomment below line to populate the database
# populateDatabase()