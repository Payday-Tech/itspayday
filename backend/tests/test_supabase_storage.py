import unittest
from unittest.mock import MagicMock, patch

from app.schemas import EligibilitySubmission
from app.sheets import save_eligibility_submission


class SupabaseStorageTests(unittest.TestCase):
    @patch('app.sheets.get_supabase_client')
    def test_save_eligibility_submission_inserts_payload(self, mock_get_client):
        mock_client = MagicMock()
        mock_table = MagicMock()
        mock_insert = MagicMock()
        mock_execute = MagicMock()

        mock_get_client.return_value = mock_client
        mock_client.table.return_value = mock_table
        mock_table.insert.return_value = mock_insert
        mock_insert.execute.return_value = mock_execute

        form = EligibilitySubmission(
            applicationId='PD-TEST-1',
            fullName='Test User',
            firstName='Test',
            lastName='User',
            dob='01/01/1990',
            pan='ABCDE1234F',
            voterIdUpload=None,
            drivingLicenceUpload=None,
            passportUpload=None,
            phone1='9876543210',
            phone2='',
            address1='12 MG Road',
            city1='Bengaluru',
            state1='KA',
            pincode1='560001',
            address2='',
            city2='',
            state2='',
            pincode2='',
            consentAccepted=True,
            consentTimestamp='2026-03-13T10:00:00.000Z',
            consentTextVersion='v1',
            privacyAccepted=True,
            source='hidden_direct_link',
        )

        ok = save_eligibility_submission(form)

        self.assertTrue(ok)
        mock_client.table.assert_called_once_with('eligibility_submissions')
        args, _ = mock_table.insert.call_args
        payload = args[0]
        self.assertEqual(payload['applicationId'], 'PD-TEST-1')
        self.assertEqual(payload['mobile'], '9876543210')
        self.assertEqual(payload['state'], 'KA')


if __name__ == '__main__':
    unittest.main()
