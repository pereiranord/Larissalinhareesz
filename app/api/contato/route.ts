import { NextResponse } from 'next/server';
import { criarLead } from '@/lib/airtable';

// mapeia o tipo do form pro valor exato do singleSelect do Airtable
const TIPO_MAP: Record<string, string> = {
  'Parceria Publi': '🤝 Parceria Publi',
  'Permuta': '📄 Permuta',
  'Make Profissional': '💄 Make Profissional',
  'Imprensa / Matéria': '📰 Imprensa / Matéria',
  'Dúvida / Informação': '❓ Dúvida / Informação',
  'Outros': '📦 Outros',
};

const CONHECEU_MAP: Record<string, string> = {
  'Instagram': '📱 Instagram',
  'TikTok': '🎵 TikTok',
  'Google': '🔍 Google',
  'Live SBT (Jequiti)': '📺 Live SBT (Jequiti)',
  'Indicação': '👥 Indicação',
  'Site direto': '🌐 Site direto',
  'Outros': '❓ Não informou',
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.nome || !body.email || !body.mensagem) {
      return NextResponse.json(
        { ok: false, error: 'Preencha nome, email e mensagem.' },
        { status: 400 }
      );
    }

    const fields: Record<string, any> = {
      'Nome': body.nome,
      'Email': body.email,
      'Mensagem': body.mensagem,
      'Status': '🆕 Novo',
      'Prioridade': '⏰ Média',
      'Responsável': 'A definir',
    };

    if (body.telefone) fields['Telefone'] = body.telefone;
    if (body.marca) fields['Marca'] = body.marca;
    if (body.cargo) fields['Cargo'] = body.cargo;
    if (body.assunto) fields['Assunto'] = body.assunto;
    if (body.tipo && TIPO_MAP[body.tipo]) fields['Tipo de Contato'] = TIPO_MAP[body.tipo];
    if (body.orcamento) fields['Orçamento Estimado'] = body.orcamento;
    if (body.comoConheceu && CONHECEU_MAP[body.comoConheceu]) {
      fields['Como Conheceu'] = CONHECEU_MAP[body.comoConheceu];
    }

    const result = await criarLead(fields);

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: 'Não consegui salvar. Tenta de novo?' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Erro na API de contato:', err);
    return NextResponse.json(
      { ok: false, error: 'Erro interno. Tenta de novo?' },
      { status: 500 }
    );
  }
}
