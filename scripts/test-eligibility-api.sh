#!/usr/bin/env bash
set -euo pipefail

API_BASE_URL="${API_BASE_URL:-http://127.0.0.1:8000}"
ORIGIN="${ORIGIN:-https://itspayday.in}"

printf '\n[1/3] CORS preflight: check-eligibility\n'
curl -sS -i -X OPTIONS "${API_BASE_URL}/api/forms/check-eligibility" \
  -H "Origin: ${ORIGIN}" \
  -H 'Access-Control-Request-Method: POST' \
  -H 'Access-Control-Request-Headers: content-type' | sed -n '1,20p'

printf '\n[2/3] CORS debug endpoint\n'
curl -sS "${API_BASE_URL}/debug/cors"; echo

printf '\n[3/3] Submit eligibility mock payload\n'
curl -sS -X POST "${API_BASE_URL}/api/forms/check-eligibility" \
  -H 'Content-Type: application/json' \
  -H "Origin: ${ORIGIN}" \
  -d '{
    "applicationId":"PD-E2E-TEST-001",
    "fullName":"Test User",
    "firstName":"Test",
    "lastName":"User",
    "dob":"01/01/1995",
    "pan":"ABCDE1234F",
    "voterIdUpload":null,
    "drivingLicenceUpload":null,
    "passportUpload":null,
    "phone1":"9876543210",
    "phone2":"",
    "address1":"12 MG Road, Bengaluru",
    "city1":"Bengaluru",
    "state1":"KA",
    "pincode1":"560001",
    "address2":"",
    "city2":"",
    "state2":"",
    "pincode2":"",
    "consentAccepted":true,
    "consentTimestamp":"2026-03-13T10:00:00.000Z",
    "consentTextVersion":"v1_2026_03",
    "privacyAccepted":true,
    "source":"hidden_direct_link"
  }'

echo
