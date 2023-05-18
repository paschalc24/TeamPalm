from django.test import TestCase
from analytics.models import *
import json, os
from utils import populateDatabase
from datetime import datetime

class ModelsTestOracle(TestCase):

    def setUp(self):
        with open('tests/test_data.json', 'r') as data:
            self.posts = json.load(data)

        self.authors, self.comments = [], []
        for post in self.posts:
            if post['author'] not in self.authors:
                self.authors.append(post['author'])
            for comment in post['comments']:
                self.comments.append(comment)
                if post['author'] not in self.authors:
                    self.authors.append(comment['author'])

        populateDatabase('tests/test_data.json', 'test_db.sqlite3')

    def tearDown(self):
        super().tearDown()

        if os.path.exists('test_db.sqlite3'):
            os.remove('test_db.sqlite3')
    
    def testAuthor(self):
        for author in self.authors:
            try:
                author_obj = Author.objects.get(slug=author['slug'])
            except:
                self.fail(f"Author {author['firstName']} {author['lastName']} not found in DB.")
            
            self.assertEqual(author['slug'], author_obj.slug)
            self.assertEqual(author['firstName'], author_obj.firstName)
            self.assertEqual(author['lastName'], author_obj.lastName)

    def testPost(self):
        for post in self.posts:
            try:
                post_obj = Post.objects.get(number=post['number'])
            except:
                self.fail(f"Post #{post['number']} not found in DB.")
            
            self.assertEqual(post['author']['slug'], post_obj.author.slug)
            self.assertEqual(post['number'], post_obj.number)
            self.assertEqual(post['slug'], post_obj.post_slug)
            self.assertEqual(post['title'], post_obj.title)
            self.assertEqual(post['body'], post_obj.body)
            self.assertEqual(post['type'], post_obj.type)
            self.assertEqual(post['visibility'] == 'member', post_obj.public)
            self.assertIsInstance(post_obj.publishedAt, datetime)
            self.assertEqual(post['viewsCount'], post_obj.viewsCount)
            self.assertEqual(post['uniqueViewsCount'], post_obj.uniqueViewsCount)
            self.assertEqual(post['answersCount'] if 'answersCount' in post else 0, post_obj.answersCount)
            self.assertEqual(post['read'] if 'read' in post else False, post_obj.read)                
            self.assertEqual(post['likesCount'] if 'likesCount' in post else 0, post_obj.likesCount)

            if 'modAnsweredAt' in post:
                self.assertIsInstance(post_obj.modAnsweredAt, datetime)

    def testComment(self):
        for comment in self.comments:
            try:
                comment_obj = Comment.objects.get(comment_id=comment['id'])
            except:
                self.fail(f"Comment #{comment['id']} not found in DB.")
            
            self.assertEqual(comment['author']['slug'], comment_obj.author.slug)
            self.assertEqual(comment['id'], comment_obj.comment_id)
            self.assertEqual(comment['endorsed'], comment_obj.endorsed)
            self.assertEqual(comment['body'], comment_obj.body)
            self.assertIsInstance(comment_obj.publishedAt, datetime)
            self.assertEqual(comment['answer'] if 'answer' in comment else False, comment_obj.is_answer)
            