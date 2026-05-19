import { NextResponse } from 'next/server';
import { confirmarAssinantePorToken } from '@/lib/airtable';

export async function GET(req: Request) {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://larissalinhareesz.vercel.app';
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(`${SITE}/diario-confirmado?erro=1`);
  }

  const r = await confirmarAssinantePorToken(token);

  if (r.ok) {
    return NextResponse.redirect(`${SITE}/diario-confirmado`);
  }
  return NextResponse.redirect(`${SITE}/diario-confirmado?erro=1`);
}
