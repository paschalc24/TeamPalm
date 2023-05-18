from django.test import TransactionTestCase
from ..models import *
from ...utils import populateDatabase
from django.core.management import call_command
import json

class ModelsTestOracle(TransactionTestCase):

    def setUp(self):
        super().setUp()
        with open('test_data.json', 'r') as data:
            self.test_data = json.load(data)
        
        populateDatabase('test_data.json', 'test_db.sqlite3')
    
    def tearDown(self):
        call_command('flush', '--noinput')
        super().tearDown()
    
    def testAuthor(self):
        pass

    def testPost(self):
        pass

    def testComment(self):
        pass