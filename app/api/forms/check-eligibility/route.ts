import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const upstream = await fetch(`${BACKEND_BASE_URL}/api/forms/check-eligibility`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const body = await upstream.text();
    return new NextResponse(body, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'application/json',
      },
    });
  } catch {
    return NextResponse.json({ detail: 'Unable to submit right now. Please try again.' }, { status: 502 });
  }
}
