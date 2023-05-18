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
        all_authors_view = AllAuthors()
        response = all_authors_view.get(request)       
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(response.data), len(self.authors))

    def testGetPosts(self):
        request = HttpRequest()
        all_posts_view = AllPosts()
        response = all_posts_view.get(request)       
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(response.data), len(self.posts))

    def testGetComments(self):
        request = HttpRequest()
        all_comments_view = AllComments()
        response = all_comments_view.get(request)       
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(response.data), len(self.comments))

    def testGetPostByNumber(self):
        request = HttpRequest()
        post_by_num_view = PostByNumber()
        response1 = post_by_num_view.get(request, 99)
        self.assertEqual(response1.status_code, HTTP_200_OK)

        response2 = post_by_num_view.get(request, 492)
        self.assertEqual(response2.status_code, HTTP_200_OK)

        response3 = post_by_num_view.get(request, 660)
        self.assertEqual(response3.status_code, HTTP_400_BAD_REQUEST)

    def testGetPostsByAuthor(self):
        request = HttpRequest()
        posts_by_author_view = PostsByAuthor()
        response1 = posts_by_author_view.get(request, 'FBU29E06A')
        self.assertEqual(response1.status_code, HTTP_200_OK)

        response2 = posts_by_author_view.get(request, 'FU082FB01')
        self.assertEqual(response2.status_code, HTTP_200_OK)

        response3 = posts_by_author_view.get(request, '5911UD0P')
        self.assertEqual(response3.status_code, HTTP_400_BAD_REQUEST)

    def testGetPostsByTimeFrame(self):
        request = HttpRequest()
        posts_by_timeframe_view = PostsByTimeFrame()
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
        unanswered_posts_view = AllUnansweredPosts()
        response = unanswered_posts_view.get(request)
        for post in response.data:
            self.assertNotIn('answeredAt', post)

    def testMostViewedPosts(self):
        request = HttpRequest()
        most_viewed_posts_view = MostViewedPosts()
        response = most_viewed_posts_view.get(request)
        self.assertEqual(len(response.data), 10)
        response = most_viewed_posts_view.get(request)
        for i in range(1, 10):
            self.assertTrue(response.data[i]['viewsCount'] <= response.data[i - 1]['viewsCount'])

    def testMostUniqueViewedPosts(self):
        request = HttpRequest()
        most_unique_viewed_posts_view = MostUniqueViewedPosts()
        response = most_unique_viewed_posts_view.get(request)
        self.assertEqual(len(response.data), 10)
        for i in range(1, 10):
            self.assertTrue(response.data[i]['uniqueViewsCount'] <= response.data[i - 1]['uniqueViewsCount'])
        
    def testMostLikedPosts(self):
        request = HttpRequest()
        most_liked_posts_view = MostLikedPosts()
        response = most_liked_posts_view.get(request)
        self.assertEqual(len(response.data), 10)
        for i in range(1, 10):
            self.assertTrue(response.data[i]['likesCount'] <= response.data[i - 1]['likesCount'])
        
    def testMostAnsweredPosts(self):
        request = HttpRequest()
        most_answered_posts_view = MostAnsweredPosts()
        response = most_answered_posts_view.get(request)
        self.assertEqual(len(response.data), 10)
        for i in range(1, 10):
            self.assertTrue(response.data[i]['answersCount'] <= response.data[i - 1]['answersCount'])

    def testResponseTime(self):
        request = HttpRequest()
        response_time_view = ResponseTime()
        response = response_time_view.get(request)
        for obj in response.data:
            self.assertIn('number', obj)
            self.assertIn('publishedAt', obj)
            self.assertIn('modAnsweredAt', obj)

    def testStudentModPosts(self):
        request = HttpRequest()
        student_mod_posts_view = StudentVsModPosts()

        mod_list = {"Jacob Friedman", "Lisa McCormick", "William Gonzalez", "Elizabeth Boyd", 
                    "Sherri Horton", "Erica Brown", "James Martinez", "Emily Hoffman", 
                    "Michael Gay", "Mark Baker", "Bill Green"}

        response1 = student_mod_posts_view.get(request, 'student')
        for post in response1.data:
            author = Author.objects.get(slug=post['author'])
            self.assertNotIn(author.firstName + ' ' + author.lastName, mod_list)

        response2 = student_mod_posts_view.get(request, 'moderator')
        for post in response2.data:
            author = Author.objects.get(slug=post['author'])
            self.assertIn(author.firstName + ' ' + author.lastName, mod_list)
        
        response3 = student_mod_posts_view.get(request, 'professor')
        self.assertEqual(response3.status_code, HTTP_400_BAD_REQUEST)

    def testViewsByTimeframe(self):
        request = HttpRequest()
        views_by_timeframe_view = ViewsByTimeFrame()
        response1 = views_by_timeframe_view.get(request, '2022-09-07', '2022-12-20')
        self.assertEqual(response1.status_code, HTTP_200_OK)
        self.assertEqual(response1.data['views'], 
                         sum(res['viewsCount'] for res in self.posts))
        self.assertEqual(response1.data['unique_views'], 
                         sum(res['uniqueViewsCount'] for res in self.posts))

        response2 = views_by_timeframe_view.get(request, '2022-10-10', '2022-11-01')
        self.assertEqual(response2.status_code, HTTP_200_OK)
        self.assertEqual(response2.data['views'], 1649)
        self.assertEqual(response2.data['unique_views'], 705)

        response3 = views_by_timeframe_view.get(request, '2023-10-10', '2023-11-01')
        self.assertEqual(response3.status_code, HTTP_400_BAD_REQUEST)

    def testPostsUnansweredByMod(self):
        request = HttpRequest()
        unanswered_by_mod_view = PostsUnansweredByMods()
        response = unanswered_by_mod_view.get(request)
        for post in response.data:
            self.assertIs(post['modAnsweredAt'], None)
            self.assertTrue(post['answersCount'] > 0)
