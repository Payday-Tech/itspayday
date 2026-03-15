import unittest
from unittest.mock import patch

from fastapi.testclient import TestClient

from app.main import app


class EligibilitySubmitTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def _payload(self, app_id: str):
        return {
            "applicationId": app_id,
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

    @patch('app.forms_router.send_success_alert')
    @patch('app.forms_router.save_eligibility_to_sheet')
    def test_submit_check_eligibility_success(self, mock_save, mock_alert):
        payload = self._payload("PD-TEST-INT-001")

        mock_save.return_value = True

        response = self.client.post('/api/forms/check-eligibility', json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('success'), True)
        mock_save.assert_called_once()
        mock_alert.assert_called_once()

    @patch('app.forms_router.send_success_alert')
    @patch('app.forms_router.save_eligibility_to_sheet')
    def test_submit_check_eligibility_storage_failure(self, mock_save, mock_alert):
        payload = self._payload("PD-TEST-INT-002")

        mock_save.return_value = False

        response = self.client.post('/api/forms/check-eligibility', json=payload)
        self.assertEqual(response.status_code, 500)
        mock_alert.assert_not_called()


    def test_health_endpoint(self):
        response = self.client.get('/health')
        self.assertEqual(response.status_code, 200)

    def test_openapi_contains_canonical_route(self):
        response = self.client.get('/openapi.json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('/api/forms/check-eligibility', response.json().get('paths', {}))

    @patch('app.forms_router.send_success_alert')
    @patch('app.forms_router.save_eligibility_to_sheet')
    def test_legacy_alias_forms_route(self, mock_save, mock_alert):
        mock_save.return_value = True
        response = self.client.post('/forms/check-eligibility', json=self._payload('PD-TEST-ALIAS-001'))
        self.assertEqual(response.status_code, 200)
        mock_alert.assert_called_once()

    @patch('app.forms_router.send_success_alert')
    @patch('app.forms_router.save_eligibility_to_sheet')
    def test_legacy_alias_root_route(self, mock_save, mock_alert):
        mock_save.return_value = True
        response = self.client.post('/check-eligibility', json=self._payload('PD-TEST-ALIAS-002'))
        self.assertEqual(response.status_code, 200)
        mock_alert.assert_called_once()


if __name__ == '__main__':
    unittest.main()
