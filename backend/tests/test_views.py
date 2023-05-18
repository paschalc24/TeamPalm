from django.test import TestCase
from django.urls import reverse
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from analytics.models import *
from analytics.views import *
import json, os
from utils import populateDatabase
from datetime import datetime
from django.http import HttpRequest


class ViewsTestOracle(TestCase):

    def setUp(self):
        with open('tests/test_data.json', 'r') as data:
            self.posts = json.load(data)

        self.authors, self.comments = [], []
        for post in self.posts:
            if post['author'] not in self.authors:
                self.authors.append(post['author'])
            for comment in post['comments']:
                self.comments.append(comment)
                if comment['author'] not in self.authors:
                    self.authors.append(comment['author'])

        populateDatabase('tests/test_data.json', 'test_db.sqlite3')

    def tearDown(self):
        super().tearDown()

        if os.path.exists('test_db.sqlite3'):
            os.remove('test_db.sqlite3')

    def testGetAuthors(self):
        request = HttpRequest()
        all_authors_view = AnalyticsApiAllAuthorsView()
        response = all_authors_view.get(request)       
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(response.data), len(self.authors))

    def testGetPosts(self):
        request = HttpRequest()
        all_posts_view = AnalyticsApiAllPostsView()
        response = all_posts_view.get(request)       
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(response.data), len(self.posts))

    def testGetComments(self):
        request = HttpRequest()
        all_comments_view = AnalyticsApiAllCommentsView()
        response = all_comments_view.get(request)       
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(response.data), len(self.comments))

    def testGetPostByNumber(self):
        request = HttpRequest()
        post_by_num_view = AnalyticsPostByNumApiView()
        response1 = post_by_num_view.get(request, 99)
        self.assertEqual(response1.status_code, HTTP_200_OK)

        response2 = post_by_num_view.get(request, 492)
        self.assertEqual(response2.status_code, HTTP_200_OK)

        response3 = post_by_num_view.get(request, 660)
        self.assertEqual(response3.status_code, HTTP_400_BAD_REQUEST)

    def testGetPostsByAuthor(self):
        request = HttpRequest()
        posts_by_author_view = AnalyticsPostByAuthorApiView()
        response1 = posts_by_author_view.get(request, 'FBU29E06A')
        self.assertEqual(response1.status_code, HTTP_200_OK)

        response2 = posts_by_author_view.get(request, 'FU082FB01')
        self.assertEqual(response2.status_code, HTTP_200_OK)

        response3 = posts_by_author_view.get(request, '5911UD0P')
        self.assertEqual(response3.status_code, HTTP_400_BAD_REQUEST)

    def testGetPostsByTimeFrame(self):
        request = HttpRequest()
        posts_by_timeframe_view = AnalyticsPostByTimeframeApiView()
        response1 = posts_by_timeframe_view.get(request, '2022-09-07', '2022-12-20')
        self.assertEqual(response1.status_code, HTTP_200_OK)
        self.assertEqual(len(response1.data), len(self.posts))

        response2 = posts_by_timeframe_view.get(request, '2022-10-10', '2022-11-01')
        self.assertEqual(response2.status_code, HTTP_200_OK)
        self.assertEqual(len(response2.data), 12)

        response3 = posts_by_timeframe_view.get(request, '2023-10-10', '2023-11-01')
        self.assertEqual(response3.status_code, HTTP_400_BAD_REQUEST)

    def testGetUnansweredPosts(self):
        request = HttpRequest()
        unanswered_posts_view = AnalyticsUnansweredPostsApiView()
        response = unanswered_posts_view.get(request)
        
            


    
    
