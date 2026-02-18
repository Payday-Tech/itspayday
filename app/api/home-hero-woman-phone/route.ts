import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function GET() {
  const base64Path = path.join(process.cwd(), 'app/api/home-hero-woman-phone/image.base64.txt');
  const imageBase64 = await readFile(base64Path, 'utf8');
  const imageBuffer = Buffer.from(imageBase64, 'base64');

  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
