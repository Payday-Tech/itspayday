# Eligibility form end-to-end checks

## Goal
Verify that customer submission works end-to-end with no CORS failure.

## Frontend API base URL

Set this on Netlify so the browser calls Render directly:

```bash
NEXT_PUBLIC_API_BASE_URL=https://payday-api-983f.onrender.com
```

## Test cases

1. **CORS preflight check passes**
   - Run: `npm run test:eligibility-api`
   - Expect: preflight response includes `Access-Control-Allow-Origin` for your site origin.

2. **Submission API accepts valid payload**
   - Run: `npm run test:eligibility-api`
   - Expect: JSON response `{ "success": true, "message": "Your details have been received." }`

3. **Frontend form journey (manual/UI)**
   - Open `/apply/check-eligibility`
   - Fill all steps with mock data
   - Submit and confirm success screen headline `Thank you`

4. **Email send smoke check (environment-dependent)**
   - Ensure SMTP env vars are set (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SENDER`, optional username/password)
   - Submit payload again
   - Expect backend log does not show `SMTP not configured` warning.

## Useful debug endpoint

- `GET /debug/cors` returns active `origins` and `origin_regex` currently loaded by backend.
- Use this in production to confirm deployed CORS settings match expected domains.


## Render production checks (copy/paste)

```bash
# 1) Health
curl -i https://payday-api-983f.onrender.com/health

# 2) CORS preflight
curl -i -X OPTIONS "https://payday-api-983f.onrender.com/api/forms/check-eligibility" \
  -H "Origin: https://itspayday.in" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type"

# 3) Debug active CORS
curl -i https://payday-api-983f.onrender.com/debug/cors

# 4) Submit mock payload
curl -i -X POST "https://payday-api-983f.onrender.com/api/forms/check-eligibility" \
  -H "Origin: https://itspayday.in" \
  -H "Content-Type: application/json" \
  -d @payload.json
```
