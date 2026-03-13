import unittest
from fastapi.testclient import TestClient

from app.main import app


class CorsTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_preflight_allows_itspayday_origin(self):
        response = self.client.options(
            '/api/forms/check-eligibility',
            headers={
                'Origin': 'https://itspayday.in',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'content-type',
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers.get('access-control-allow-origin'), 'https://itspayday.in')

    def test_preflight_allows_www_itspayday_origin(self):
        response = self.client.options(
            '/api/forms/check-eligibility',
            headers={
                'Origin': 'https://www.itspayday.in',
                'Access-Control-Request-Method': 'POST',
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers.get('access-control-allow-origin'), 'https://www.itspayday.in')


if __name__ == '__main__':
    unittest.main()
