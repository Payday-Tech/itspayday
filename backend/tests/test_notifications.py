import unittest
from unittest.mock import MagicMock, patch

from app.notifications import send_success_alert


class SendSuccessAlertTests(unittest.TestCase):
    @patch('app.notifications.get_settings')
    @patch('app.notifications.smtplib.SMTP')
    def test_send_success_alert_sends_email(self, mock_smtp, mock_get_settings):
        mock_get_settings.return_value = MagicMock(
            smtp_host='smtp.example.com',
            smtp_port=587,
            smtp_username='user',
            smtp_password='pass',
            smtp_sender='noreply@itspayday.in',
            alert_email_to='info@itspayday.in',
        )

        smtp_instance = MagicMock()
        mock_smtp.return_value.__enter__.return_value = smtp_instance

        ok = send_success_alert(first_name='Test', mobile='9876543210', application_id='PD-123', has_pan=True)

        self.assertTrue(ok)
        smtp_instance.starttls.assert_called_once()
        smtp_instance.login.assert_called_once_with('user', 'pass')
        smtp_instance.send_message.assert_called_once()

    @patch('app.notifications.get_settings')
    def test_send_success_alert_skips_when_not_configured(self, mock_get_settings):
        mock_get_settings.return_value = MagicMock(
            smtp_host='',
            smtp_port=587,
            smtp_username='',
            smtp_password='',
            smtp_sender='',
            alert_email_to='info@itspayday.in',
        )

        ok = send_success_alert(first_name='Test', mobile='9876543210', application_id='PD-123', has_pan=False)
        self.assertFalse(ok)


if __name__ == '__main__':
    unittest.main()
