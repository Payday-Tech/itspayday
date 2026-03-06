# CLAUDE.md — AI Assistant Guide for itspayday

This file documents the codebase structure, development conventions, and workflows for AI assistants working on this repository.

---

## Project Overview

**itspayday** is a marketing/onboarding website for a Responsible Earned Wage Access (EWA) fintech product targeting workers in Indian gated communities. The product operates as an LSP (Lending Service Provider) — it facilitates lending but does not lend directly.

**Key audiences:**
- Workers in Tier-1 Indian cities (Delhi, Bangalore, Mumbai, Chennai, Hyderabad, Pune)
- Lenders / financial partners
- Communities / employers / housing societies

---

## Architecture

```
Frontend (Next.js 14, static export)  ──►  Netlify
          │
          │ REST / JSON
          ▼
Backend (FastAPI, Python 3.11)  ──►  Render (Docker)
          │
          ▼
    Google Sheets  (form submissions — no SQL database)
```

---

## Repository Structure

```
itspayday/
├── app/                      # Next.js App Router
│   ├── (routes)/             # All page routes
│   │   ├── page.tsx          # Home page
│   │   ├── about/
│   │   ├── contact/
│   │   ├── team/
│   │   ├── for-workers/
│   │   ├── for-lenders/
│   │   ├── for-communities/
│   │   ├── products/
│   │   ├── fees/
│   │   ├── security/
│   │   ├── privacy/
│   │   ├── terms/
│   │   ├── grievance-redressal/
│   │   ├── lsp-disclosure/
│   │   └── how-it-works/
│   ├── api/                  # Next.js API routes (image-serving only)
│   │   ├── home-hero-woman-phone/
│   │   └── for-lenders-hero/
│   ├── layout.tsx            # Root layout with metadata
│   ├── template.tsx          # Template wrapper
│   ├── globals.css           # Global CSS
│   └── sitemap.ts            # SEO sitemap
├── components/               # Shared React components
│   ├── Header.tsx            # Navigation header + language selector
│   ├── Footer.tsx
│   ├── Modal.tsx             # "Get Started" form modal
│   ├── ClientLayout.tsx      # Client-side provider wrapper
│   ├── ModalContext.tsx      # Modal open/close state (React Context)
│   ├── LanguageContext.tsx   # i18n provider (EN, HI, HNG, KN)
│   ├── ReCaptcha.tsx         # reCAPTCHA v2 wrapper
│   └── GetStartedButton.tsx  # Primary CTA button
├── lib/
│   ├── api.ts                # Typed API client for form submissions
│   └── i18n.ts               # Translation dictionary for all 4 languages
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── main.py           # App setup, CORS, route registration
│   │   ├── config.py         # Pydantic settings (reads .env)
│   │   ├── schemas.py        # Pydantic request/response models
│   │   ├── recaptcha.py      # Server-side reCAPTCHA verification
│   │   └── sheets.py         # Google Sheets integration
│   ├── requirements.txt
│   ├── .env.example          # Environment variable template
│   ├── Dockerfile
│   └── render.yaml           # Render deployment config
├── public/                   # Static assets (SVGs, team photos)
├── package.json
├── tsconfig.json
├── next.config.js
├── netlify.toml              # Netlify build + security headers
└── Dockerfile                # Root-level alias to backend Docker build
```

---

## Development Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- npm

### Frontend

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Production build (outputs to /out)
npm run build

# Lint
npm run lint
```

### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy and fill in environment variables
cp .env.example .env

# Start dev server (http://localhost:8000)
uvicorn app.main:app --reload
```

### Environment Variables

**Backend** (`backend/.env`):

| Variable | Description |
|---|---|
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA v2 secret key |
| `CORS_ORIGINS` | Comma-separated allowed origins |
| `ENVIRONMENT` | `development` or `production` |
| `GOOGLE_CREDENTIALS_JSON` | Full service account JSON (stringified) |
| `GOOGLE_SPREADSHEET_ID` | Target Google Spreadsheet ID |

**Frontend** (set in `netlify.toml` or `.env.local`):

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v2 site key (public) |
| `NEXT_PUBLIC_API_URL` | Backend URL (e.g. `https://payday-api-983f.onrender.com`) |

---

## Key Conventions

### TypeScript / React

- **App Router only** — all pages live under `app/`. No `pages/` directory.
- **Static export** — `next.config.js` sets `output: 'export'`. There is **no SSR**. Do not use `getServerSideProps` or server actions.
- **Image optimization is disabled** — use `<img>` tags or SVG `<Image>` from Next.js with `unoptimized` if needed.
- **Path alias** — use `@/` to import from the project root, e.g. `import { t } from '@/lib/i18n'`.
- **Client components** — components using hooks, context, or browser APIs must include `'use client'` at the top.
- **No test framework** is configured. There are currently no tests.

### Internationalization (i18n)

- Translations live entirely in `lib/i18n.ts` as a nested dictionary keyed by language code (`en`, `hi`, `hng`, `kn`).
- Use the `useLanguage()` hook from `LanguageContext.tsx` to access the current language and translate: `const { t } = useLanguage()`.
- When adding new user-facing text, add translations for **all four languages**: English (`en`), Hindi (`hi`), Hinglish (`hng`), Kannada (`kn`).
- Default language is Hinglish (`hng`) on the `/for-workers` route; English everywhere else.

### Styling

- Global styles only via `app/globals.css`. No CSS modules, no Tailwind, no styled-components.
- Fonts: `Inter` and `Sora` loaded via `next/font/google` in `app/layout.tsx`.
- Inline styles and class-based CSS are both used — follow the existing pattern in each file.

### Form Handling & Security

All forms follow this flow:
1. **Client-side validation** — input patterns, max-length, sanitization (strip `<>` to prevent XSS).
2. **reCAPTCHA v2 verification** — user must complete captcha before submission is enabled.
3. **API submission** via `lib/api.ts` — typed fetch calls to the FastAPI backend.
4. **Server-side validation** — Pydantic schemas in `backend/app/schemas.py`.
5. **Server-side reCAPTCHA check** — `backend/app/recaptcha.py` verifies the token with Google.
6. **Google Sheets write** — `backend/app/sheets.py` appends a timestamped row.

**Never skip input sanitization.** The `Modal.tsx` pattern of stripping angle brackets and validating patterns before submission must be followed in all new forms.

### Backend (FastAPI)

- All route files belong under `backend/app/`.
- Use Pydantic models in `schemas.py` for all request/response shapes.
- Environment config is managed via `backend/app/config.py` (Pydantic `BaseSettings`). Do not hardcode secrets.
- The health check endpoint `GET /health` must remain functional — Render uses it.
- CORS is configured in `main.py`; add new allowed origins via the `CORS_ORIGINS` env var, not in code.

---

## Backend API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check (returns `{"status": "healthy"}`) |
| `POST` | `/api/forms/get-started` | Get Started modal form |
| `POST` | `/api/forms/contact` | Contact page form |
| `POST` | `/api/forms/lender-partnership` | Lender partnership form |

All `POST` endpoints expect JSON bodies validated by Pydantic schemas and require a valid `recaptcha_token` field.

---

## Deployment

### Frontend → Netlify

- Push to `master` triggers an automatic Netlify deploy.
- Build command: `npm run build`
- Publish directory: `out/`
- Security headers (CSP, HSTS, X-Frame-Options, etc.) are configured in `netlify.toml`. **Do not weaken these headers.**

### Backend → Render

- Push to `master` triggers an automatic Render deploy.
- Containerized via `backend/Dockerfile`.
- Config in `backend/render.yaml`.
- Health check path: `/health`.
- All secrets are set as Render environment variables — never commit them.

---

## Security Checklist

When adding features that touch forms, user input, or API endpoints, verify:

- [ ] All user input is sanitized (strip `<>`, validate patterns)
- [ ] New forms include reCAPTCHA v2 and server-side token verification
- [ ] No secrets are hardcoded — use env vars via `config.py`
- [ ] CORS origins are not broadened without a reason
- [ ] Security headers in `netlify.toml` remain intact
- [ ] Pydantic schemas constrain field lengths and patterns
- [ ] New API routes are registered in `backend/app/main.py`

---

## Adding a New Page

1. Create `app/<route>/page.tsx`.
2. Export a default React component (server component unless hooks are needed).
3. Add translations for all page text in `lib/i18n.ts` under all four language keys.
4. Add the route to the Header navigation links in `components/Header.tsx` if appropriate.
5. Add the URL to `app/sitemap.ts`.

## Adding a New Form

1. Add a Pydantic schema in `backend/app/schemas.py`.
2. Add the endpoint handler in a new or existing router file and register it in `backend/app/main.py`.
3. Add a corresponding function in `lib/api.ts` with proper TypeScript types.
4. Build the form component following the validation + reCAPTCHA pattern in `components/Modal.tsx`.

---

## Common Pitfalls

- **Static export limitations:** Dynamic routes require `generateStaticParams`. No runtime server-side logic in page components.
- **reCAPTCHA widget re-render:** The `ReCaptcha.tsx` component must be unmounted and remounted to reset — simply calling `reset()` may not work across form submissions.
- **Google Sheets quota:** The free tier has rate limits. Avoid triggering sheet writes in test environments with real credentials.
- **CORS in development:** Set `CORS_ORIGINS=http://localhost:3000` in `backend/.env` when running locally.
- **No database migrations:** Data model changes are made by modifying the Sheets column headers in `backend/app/sheets.py`.
