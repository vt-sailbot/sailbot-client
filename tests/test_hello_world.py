import unittest
from flask_app import create_app

class TestHelloWorld(unittest.TestCase):
    def setUp(self):
        self.client = create_app({'TESTING': True}).test_client()

    def test_hello_world(self):
        assert self.client.get('/').data == b'Hello, world!'


if __name__ == '__main__':
    unittest.main()
