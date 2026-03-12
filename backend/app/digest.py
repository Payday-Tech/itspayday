"""Utility for daily digest emails from eligibility funnel events.

This module is intended to be called by a scheduled job (cron / cloud scheduler).
"""

from datetime import datetime, timedelta, timezone

from app.config import get_settings
from app.sheets import get_sheets_client


def _utc_iso_days_ago(days: int) -> str:
    return (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()


def generate_partial_digest_summary() -> dict:
    settings = get_settings()
    client = get_sheets_client()
    if not client or not settings.google_spreadsheet_id:
        return {"ready": False, "reason": "Google Sheets not configured"}

    spreadsheet = client.open_by_key(settings.google_spreadsheet_id)
    worksheet = spreadsheet.worksheet("Eligibility Events")
    rows = worksheet.get_all_records()

    since = _utc_iso_days_ago(1)
    recent = [row for row in rows if str(row.get("timestamp", "")) >= since]

    step_views = len([row for row in recent if row.get("event_name") == "step_view"])
    submit_success = len([row for row in recent if row.get("event_name") == "submit_success"])
    submit_error = len([row for row in recent if row.get("event_name") == "submit_error"])

    return {
        "ready": True,
        "step_view": step_views,
        "submit_success": submit_success,
        "submit_error": submit_error,
        "drop_off_estimate": max(step_views - submit_success, 0),
    }
