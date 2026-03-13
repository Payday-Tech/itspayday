# Eligibility storage design (MVP)

## Google Sheets tabs

- `Eligibility Submissions`: one row for each successful completed form.
- `Eligibility Ops`: optional operations tracking for review and bureau status handoff.

## Suggested structure

- **Sheet 1: submissions**
  - `submitted_at`, `application_id`, `first_name`, `last_name`, `mobile`, `dob`, `pan`, `address`, `city`, `state`, `pincode`, `phone2`, `consent`, `consent_timestamp`
- **Sheet 2: ops**
  - `application_id`, `review_status`, `bureau_status`, `remarks`, `partner_shared`, `shared_at`

## File storage references

For uploaded fallback IDs (Voter ID / Driving Licence / Passport), the current payload stores a `storageRef` and file metadata so storage backends can be swapped later (for example, Google Drive now and Supabase Storage later).

## Alerts

On each successful completed application, backend sends an email alert to `info@itspayday.in` (configurable) with application ID and PAN-present vs no-PAN category.

