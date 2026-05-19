// =====================================================
// CONEXÃO COM AIRTABLE
// Lê todos os dados do site. Usa returnFieldsByFieldId=false
// (usa nomes dos campos). Cache de 60s pra performance.
// =====================================================

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID || 'appgJ2cCzb2TPwUPI';
const API = 'https://api.airtable.com/v0';

// IDs das tabelas (fixos - não mudam)
export const TABLES = {
  PERFIL: 'tblFsGECNNMxgeXY3',
  BOTOES: 'tbleNQuilBySKzLST',
  MARCAS: 'tbl0O45dXuRwmBb2z',
  PRODUTOS: 'tblYmWgBi1WbyQyNP',
  LOOKS: 'tblc3UzCLYlLt5KV1',
  DIARIO: 'tbl2YaUrDzyrqgdYq',
  EVENTOS: 'tbl1c5TxBWGchGnyP',
  DEPOIMENTOS: 'tblFiYGq1FzLTHvNX',
  CUPONS: 'tblfAcitBaJqwi4Rw',
  LEADS: 'tblkoh9yc3RGxiAdA',
  METRICAS: 'tblVxDelQJ0XglOIV',
  ASSINANTES: 'tblqL0rUiwQs6Laib',
} as const;

type AirtableRecord = {
  id: string;
  fields: Record<string, any>;
  createdTime: string;
};

async function fetchTable(
  tableId: string,
  options: {
    filterByFormula?: string;
    sort?: { field: string; direction: 'asc' | 'desc' }[];
    maxRecords?: number;
  } = {}
): Promise<AirtableRecord[]> {
  if (!TOKEN) {
    console.error('AIRTABLE_TOKEN não configurado');
    return [];
  }

  const params = new URLSearchParams();
  if (options.filterByFormula) params.append('filterByFormula', options.filterByFormula);
  if (options.maxRecords) params.append('maxRecords', String(options.maxRecords));
  if (options.sort) {
    options.sort.forEach((s, i) => {
      params.append(`sort[${i}][field]`, s.field);
      params.append(`sort[${i}][direction]`, s.direction);
    });
  }

  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  try {
    do {
      if (offset) params.set('offset', offset);
      const url = `${API}/${BASE_ID}/${tableId}?${params.toString()}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${TOKEN}` },
        next: { revalidate: 60 }, // cache 60s
      });

      if (!res.ok) {
        console.error(`Airtable erro ${res.status} na tabela ${tableId}`);
        return records;
      }

      const data = await res.json();
      records.push(...(data.records || []));
      offset = data.offset;
    } while (offset);
  } catch (err) {
    console.error('Erro ao buscar Airtable:', err);
  }

  return records;
}

// Helper: pega URL da primeira imagem de um campo de anexo
export function getImageUrl(field: any): string | null {
  if (Array.isArray(field) && field.length > 0 && field[0].url) {
    return field[0].url;
  }
  return null;
}

// Helper: pega todas as URLs de imagens
export function getImageUrls(field: any): string[] {
  if (Array.isArray(field)) {
    return field.filter((f) => f.url).map((f) => f.url);
  }
  return [];
}

// =====================================================
// FUNÇÕES PÚBLICAS DO SITE
// =====================================================

export async function getPerfil() {
  const recs = await fetchTable(TABLES.PERFIL, { maxRecords: 1 });
  return recs[0]?.fields || null;
}

export async function getBotoes() {
  const recs = await fetchTable(TABLES.BOTOES, {
    filterByFormula: '{Ativo}=1',
    sort: [{ field: 'Ordem', direction: 'asc' }],
  });
  return recs.map((r) => ({ id: r.id, ...r.fields }));
}

export async function getMarcas() {
  const recs = await fetchTable(TABLES.MARCAS, {
    filterByFormula: '{Mostrar no Site}=1',
    sort: [{ field: 'Ordem Exibição', direction: 'asc' }],
  });
  return recs.map((r) => ({ id: r.id, ...r.fields }));
}

export async function getLooks() {
  const recs = await fetchTable(TABLES.LOOKS, {
    filterByFormula: '{Ativo}=1',
    sort: [{ field: 'Data Publicação', direction: 'desc' }],
  });
  return recs.map((r) => ({ id: r.id, ...r.fields }));
}

export async function getLookBySlug(slug: string) {
  const recs = await fetchTable(TABLES.LOOKS, {
    filterByFormula: `AND({Slug}='${slug}',{Ativo}=1)`,
    maxRecords: 1,
  });
  return recs[0] ? { id: recs[0].id, ...recs[0].fields } : null;
}

export async function getProdutos() {
  const recs = await fetchTable(TABLES.PRODUTOS, {
    filterByFormula: '{Ativo}=1',
  });
  return recs.map((r) => ({ id: r.id, ...r.fields }));
}

export async function getProdutosByIds(ids: string[]) {
  if (!ids || ids.length === 0) return [];
  const all = await getProdutos();
  return all.filter((p: any) => ids.includes(p.id));
}

export async function getDiario() {
  const recs = await fetchTable(TABLES.DIARIO, {
    filterByFormula: "AND({Ativo}=1,{Status}='✅ Publicado')",
    sort: [{ field: 'Data Publicação', direction: 'desc' }],
  });
  return recs.map((r) => ({ id: r.id, ...r.fields }));
}

export async function getPostBySlug(slug: string) {
  const recs = await fetchTable(TABLES.DIARIO, {
    filterByFormula: `AND({Slug}='${slug}',{Ativo}=1)`,
    maxRecords: 1,
  });
  return recs[0] ? { id: recs[0].id, ...recs[0].fields } : null;
}

export async function getEventos() {
  const recs = await fetchTable(TABLES.EVENTOS, {
    filterByFormula: '{Ativo}=1',
    sort: [{ field: 'Data', direction: 'desc' }],
  });
  return recs.map((r) => ({ id: r.id, ...r.fields }));
}

export async function getDepoimentos() {
  const recs = await fetchTable(TABLES.DEPOIMENTOS, {
    filterByFormula: '{Mostrar no Site}=1',
    sort: [{ field: 'Ordem Exibição', direction: 'asc' }],
  });
  return recs.map((r) => ({ id: r.id, ...r.fields }));
}

export async function getCupons() {
  const recs = await fetchTable(TABLES.CUPONS, {
    filterByFormula: "{Status}='✅ Ativo'",
  });
  return recs.map((r) => ({ id: r.id, ...r.fields }));
}

export async function getMetricas() {
  const recs = await fetchTable(TABLES.METRICAS, {
    filterByFormula: '{Período Atual}=1',
    maxRecords: 1,
  });
  return recs[0]?.fields || null;
}

// Cria registro (usado pelo formulário de contato)
export async function criarLead(dados: Record<string, any>) {
  if (!TOKEN) return { ok: false, error: 'Token não configurado' };

  try {
    const res = await fetch(`${API}/${BASE_ID}/${TABLES.LEADS}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [{ fields: dados }],
        typecast: true,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Erro ao criar lead:', err);
      return { ok: false, error: 'Erro ao salvar' };
    }
    return { ok: true };
  } catch (err) {
    console.error('Erro ao criar lead:', err);
    return { ok: false, error: 'Erro de conexão' };
  }
}

// =====================================================
// NEWSLETTER (Assinantes)
// =====================================================

export async function buscarAssinantePorEmail(email: string) {
  const recs = await fetchTable(TABLES.ASSINANTES, {
    filterByFormula: `LOWER({Email})='${email.toLowerCase().replace(/'/g, "")}'`,
    maxRecords: 1,
  });
  return recs[0] ? { id: recs[0].id, ...recs[0].fields } : null;
}

export async function criarAssinante(dados: Record<string, any>) {
  if (!TOKEN) return { ok: false, error: 'Token não configurado' };
  try {
    const res = await fetch(`${API}/${BASE_ID}/${TABLES.ASSINANTES}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ records: [{ fields: dados }], typecast: true }),
    });
    if (!res.ok) {
      console.error('Erro ao criar assinante:', await res.text());
      return { ok: false, error: 'Erro ao salvar' };
    }
    const data = await res.json();
    return { ok: true, id: data.records?.[0]?.id };
  } catch (err) {
    console.error('Erro ao criar assinante:', err);
    return { ok: false, error: 'Erro de conexão' };
  }
}

export async function atualizarAssinante(id: string, dados: Record<string, any>) {
  if (!TOKEN) return { ok: false };
  try {
    const res = await fetch(`${API}/${BASE_ID}/${TABLES.ASSINANTES}/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields: dados, typecast: true }),
    });
    return { ok: res.ok };
  } catch (err) {
    console.error('Erro ao atualizar assinante:', err);
    return { ok: false };
  }
}

export async function confirmarAssinantePorToken(token: string) {
  const recs = await fetchTable(TABLES.ASSINANTES, {
    filterByFormula: `{Token Confirmação}='${token.replace(/'/g, "")}'`,
    maxRecords: 1,
  });
  if (!recs[0]) return { ok: false, error: 'Token inválido' };
  const r = await atualizarAssinante(recs[0].id, {
    'Status': '✅ Confirmado',
    'Data Confirmação': new Date().toISOString(),
  });
  return r.ok
    ? { ok: true, nome: recs[0].fields['Nome'] || '' }
    : { ok: false, error: 'Erro ao confirmar' };
}
