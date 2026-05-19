import { NextResponse } from 'next/server';

// Stub de tracking pro MVP.
// Na fase 2, isso vai incrementar contadores de cliques
// (botões, produtos, looks) no Airtable ou Supabase.
// Por enquanto só responde ok pra não quebrar o front.

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    // body esperado no futuro: { tipo: 'botao'|'produto'|'look', id: '...' }
    console.log('track:', body?.tipo, body?.id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
