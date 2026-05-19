import { NextResponse } from 'next/server';
import {
  buscarAssinantePorEmail,
  criarAssinante,
  atualizarAssinante,
} from '@/lib/airtable';

// gera token aleatório pra confirmação
function gerarToken() {
  return (
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).slice(2) +
    Date.now().toString(36)
  );
}

async function enviarEmailConfirmacao(email: string, nome: string, token: string) {
  const RESEND_KEY = process.env.RESEND_API_KEY;
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://larissalinhareesz.vercel.app';
  const FROM = process.env.NEWSLETTER_FROM || 'Lari Linhares <onboarding@resend.dev>';

  // Se não tiver Resend configurado, ainda assim grava o assinante
  // (a confirmação fica manual ou pra quando configurar)
  if (!RESEND_KEY) {
    console.warn('RESEND_API_KEY não configurado - email não enviado');
    return { enviado: false };
  }

  const linkConfirma = `${SITE}/api/newsletter/confirmar?token=${token}`;
  const primeiroNome = nome ? nome.split(' ')[0] : 'oi';

  const html = `
  <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;background:#FAF6F1;padding:40px 32px;border-radius:16px;color:#593D2B;">
    <h1 style="font-size:26px;margin:0 0 16px;">Oi ${primeiroNome}! 🤍</h1>
    <p style="font-size:15px;line-height:1.7;color:#7A5840;font-family:Arial,sans-serif;">
      Que alegria te ver por aqui. Falta só um clique pra confirmar que você quer
      receber meu diário direto no seu email:
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${linkConfirma}"
         style="background:#593D2B;color:#FAF6F1;text-decoration:none;padding:14px 32px;border-radius:999px;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;display:inline-block;">
        Confirmar inscrição
      </a>
    </div>
    <p style="font-size:13px;color:#7A5840;font-family:Arial,sans-serif;line-height:1.6;">
      Se não foi você que se inscreveu, pode ignorar esse email tranquilamente.
    </p>
    <p style="font-size:14px;color:#593D2B;margin-top:28px;font-style:italic;">
      Até a próxima — Lari 🤍
    </p>
  </div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: email,
        subject: 'Confirma seu email pra gente continuar 🤍',
        html,
      }),
    });
    return { enviado: res.ok };
  } catch (err) {
    console.error('Erro ao enviar email:', err);
    return { enviado: false };
  }
}

export async function POST(req: Request) {
  try {
    const { email, nome } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { ok: false, error: 'Coloca um email válido 🤍' },
        { status: 400 }
      );
    }

    const emailLimpo = String(email).trim().toLowerCase();

    // já existe?
    const existente: any = await buscarAssinantePorEmail(emailLimpo);
    if (existente) {
      const status = existente['Status'] || '';
      if (status.includes('Confirmado')) {
        return NextResponse.json({
          ok: true,
          message: 'Você já faz parte do meu cantinho 🤍',
        });
      }
      // re-envia confirmação
      const token = existente['Token Confirmação'] || gerarToken();
      if (!existente['Token Confirmação']) {
        await atualizarAssinante(existente.id, { 'Token Confirmação': token });
      }
      await enviarEmailConfirmacao(emailLimpo, nome || '', token);
      return NextResponse.json({
        ok: true,
        message: 'Te reenviei o email de confirmação 🤍',
      });
    }

    // novo assinante
    const token = gerarToken();
    const criado = await criarAssinante({
      'Email': emailLimpo,
      'Nome': nome || '',
      'Status': '⏳ Pendente confirmação',
      'Token Confirmação': token,
      'Fonte': '🏠 Home',
      'Data Inscrição': new Date().toISOString(),
    });

    if (!criado.ok) {
      return NextResponse.json(
        { ok: false, error: 'Não consegui salvar. Tenta de novo?' },
        { status: 500 }
      );
    }

    await enviarEmailConfirmacao(emailLimpo, nome || '', token);

    return NextResponse.json({
      ok: true,
      message: 'Pronto! Te mandei um email de confirmação 🤍',
    });
  } catch (err) {
    console.error('Erro na API de newsletter:', err);
    return NextResponse.json(
      { ok: false, error: 'Erro interno. Tenta de novo?' },
      { status: 500 }
    );
  }
}
