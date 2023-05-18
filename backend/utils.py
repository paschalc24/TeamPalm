import sqlite3
import json
import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from analytics.models import *

def populateDatabase(filename: str, db: str):
    all_posts = json.load(open(filename))
    conn = sqlite3.connect(db)
    cursor = conn.cursor()
    for post in all_posts:
        insertAuthor(post["author"]) 
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

    if new_row.number != 0:
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

def create_test_data(main_file, test_file, data_len):
    all_posts, test_json = json.load(open(main_file, 'r')), open(test_file, 'w')
    attrs = {"slug", "visibility", "number", "title", "body", "type", "publishedAt", "viewsCount", 
             "uniqueViewsCount", "read", "modAnsweredAt", "answersCount", "likesCount"}
    author_attrs = {"firstName", "lastName", "slug"}
    comment_attrs = {"id", "body", "answer", "publishedAt", "endorsed"}
    
    new_data = []
    for pos in range(0, len(all_posts), len(all_posts) // data_len):
        post = all_posts[pos]
        new_post = { "author": { attr: post["author"][attr] for attr in post["author"] if attr in author_attrs } }
        comments = []
        for c in post["comments"]:
            new_comment = { "author": { attr: c["author"][attr] for attr in c["author"] if attr in author_attrs } }
            new_comment.update({ attr: c[attr] for attr in c if attr in comment_attrs })
            comments.append(new_comment)

        new_post.update({ attr: post[attr] for attr in post if attr in attrs})
        new_post["comments"] = comments
        new_data.append(new_post)
    
    test_json.write(json.dumps(new_data))
    test_json.close()

# Uncomment below line to populate the database
# populateDatabase('cw_posts_scrubbed.json', 'db.sqlite3')

# Uncomment below line to generate test data
# create_test_data('cw_posts_scrubbed.json', 'tests/test_data.json', 50)