import unittest
from unittest.mock import patch

from fastapi.testclient import TestClient

from app.main import app


class EligibilitySubmitTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    @patch('app.forms_router.send_success_alert')
    @patch('app.forms_router.save_eligibility_submission')
    def test_submit_check_eligibility_success(self, mock_save, mock_alert):
        payload = {
            "applicationId": "PD-TEST-INT-001",
            "fullName": "Test User",
            "firstName": "Test",
            "lastName": "User",
            "dob": "01/01/1995",
            "pan": "ABCDE1234F",
            "voterIdUpload": None,
            "drivingLicenceUpload": None,
            "passportUpload": None,
            "phone1": "9876543210",
            "phone2": "",
            "address1": "12 MG Road, Bengaluru",
            "city1": "Bengaluru",
            "state1": "KA",
            "pincode1": "560001",
            "address2": "",
            "city2": "",
            "state2": "",
            "pincode2": "",
            "consentAccepted": True,
            "consentTimestamp": "2026-03-13T10:00:00.000Z",
            "consentTextVersion": "v1_2026_03",
            "privacyAccepted": True,
            "source": "hidden_direct_link",
        }

        response = self.client.post('/api/forms/check-eligibility', json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('success'), True)
        mock_save.assert_called_once()
        mock_alert.assert_called_once()



    @patch('app.forms_router.send_success_alert')
    @patch('app.forms_router.save_eligibility_submission')
    def test_submit_check_eligibility_alias_routes_success(self, mock_save, mock_alert):
        payload = {
            "applicationId": "PD-TEST-INT-002",
            "fullName": "Test User",
            "firstName": "Test",
            "lastName": "User",
            "dob": "01/01/1995",
            "pan": "ABCDE1234F",
            "voterIdUpload": None,
            "drivingLicenceUpload": None,
            "passportUpload": None,
            "phone1": "9876543210",
            "phone2": "",
            "address1": "12 MG Road, Bengaluru",
            "city1": "Bengaluru",
            "state1": "KA",
            "pincode1": "560001",
            "address2": "",
            "city2": "",
            "state2": "",
            "pincode2": "",
            "consentAccepted": True,
            "consentTimestamp": "2026-03-13T10:00:00.000Z",
            "consentTextVersion": "v1_2026_03",
            "privacyAccepted": True,
            "source": "hidden_direct_link",
        }

        for route in ['/forms/check-eligibility', '/check-eligibility']:
            response = self.client.post(route, json=payload)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json().get('success'), True)

        self.assertEqual(mock_save.call_count, 2)
        self.assertEqual(mock_alert.call_count, 2)

if __name__ == '__main__':
    unittest.main()
