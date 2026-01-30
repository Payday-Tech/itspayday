# Payday

Responsible Earned Wage Access for workers in gated communities across Tier-1 Indian cities.

## Project Structure

```
itspayday/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── lib/                    # Utility functions and API client
├── public/                 # Static assets
├── backend/                # FastAPI backend
│   ├── app/               # Python application code
│   ├── Dockerfile         # Docker configuration
│   └── requirements.txt   # Python dependencies
├── netlify.toml           # Netlify deployment config
└── package.json           # Node.js dependencies
```

## Frontend (Next.js)

### Tech Stack
- Next.js 14 with App Router
- TypeScript
- React 18
- Static site generation (SSG)

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For Netlify deployment, set these in your Netlify environment variables.

### Deployment (Netlify)

The frontend is configured to deploy on Netlify:

1. Connect your repository to Netlify
2. Set environment variables:
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - reCAPTCHA v2 site key
   - `NEXT_PUBLIC_API_URL` - Backend API URL (Render)
3. Deploy - Netlify will use the `netlify.toml` configuration

## Backend (FastAPI)

### Tech Stack
- FastAPI
- Python 3.11
- Docker
- Pydantic for validation

### Local Development

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your settings

# Run development server
uvicorn app.main:app --reload
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/forms/get-started` | POST | Get Started form submission |
| `/api/forms/contact` | POST | Contact form submission |
| `/api/forms/lender-partnership` | POST | Lender partnership form |

### Environment Variables

| Variable | Description |
|----------|-------------|
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v2 secret key |
| `CORS_ORIGINS` | Comma-separated allowed origins |
| `ENVIRONMENT` | `development` or `production` |

### Docker

```bash
# Build image
docker build -t payday-api .

# Run container
docker run -p 8000:8000 \
  -e RECAPTCHA_SECRET_KEY=your_secret \
  -e CORS_ORIGINS=https://your-netlify-domain.netlify.app \
  -e ENVIRONMENT=production \
  payday-api
```

### Deployment (Render)

The backend is configured to deploy on Render:

1. Create a new Web Service on Render
2. Connect your repository
3. Set the root directory to `backend`
4. Render will detect the `Dockerfile` automatically
5. Set environment variables:
   - `RECAPTCHA_SECRET_KEY` - reCAPTCHA v2 secret key
   - `CORS_ORIGINS` - Your Netlify domain(s)
   - `ENVIRONMENT` - `production`

## Security Features

- **Security Headers**: X-Frame-Options, CSP, HSTS, etc.
- **Input Validation**: Client and server-side validation
- **XSS Prevention**: Input sanitization on all forms
- **reCAPTCHA v2**: Bot protection on all forms
- **CORS**: Configured for specific origins only

## Forms

All forms include:
- Client-side validation
- Input sanitization
- reCAPTCHA v2 verification
- Loading states
- Error handling

### Get Started Modal
- First name, last name, occupation
- Accessible from any page

### Contact Form (`/contact`)
- Name, email, topic, message

### Lender Partnership Form (`/for-lenders`)
- Name, company, email, phone, role, city, notes

## License

MIT License - see [LICENSE](LICENSE) file for details.
