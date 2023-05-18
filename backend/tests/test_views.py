from django.test import TestCase
from analytics.models import *
import json
from utils import populateDatabase
from datetime import datetime

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
                if post['author'] not in self.authors:
                    self.authors.append(comment['author'])

        populateDatabase('tests/test_data.json', 'test_db.sqlite3')

            


    
    
