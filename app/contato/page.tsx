'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Mail, MessageCircle, Send, CheckCircle } from 'lucide-react';

const LINKS = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/looks', label: 'Looks' },
  { href: '/favoritos', label: 'Favoritos' },
  { href: '/diario', label: 'Diário' },
  { href: '/contato', label: 'Contato' },
];

export default function Contato() {
  const [open, setOpen] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');

  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', tipo: '', marca: '',
    cargo: '', assunto: '', mensagem: '', orcamento: '', comoConheceu: '',
  });

  function update(campo: string, valor: string) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    if (!form.nome || !form.email || !form.mensagem) {
      setErro('Preenche pelo menos nome, email e mensagem 🤍');
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setEnviado(true);
      } else {
        setErro(data.error || 'Algo deu errado. Tenta de novo?');
      }
    } catch {
      setErro('Erro de conexão. Tenta de novo?');
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <main className="min-h-screen flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <CheckCircle size={56} className="text-dourado mx-auto" />
          <h1 className="font-serif text-3xl font-bold text-marrom mt-5">
            Recebi sua mensagem! 🤍
          </h1>
          <p className="text-marrom/70 mt-3">
            Obrigada pelo contato. Respondo em até 24h em dias úteis.
          </p>
          <Link
            href="/"
            className="inline-block mt-8 bg-marrom text-creme font-semibold px-8 py-3 rounded-full hover:bg-marrom-escuro transition-colors"
          >
            Voltar pro início
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Nav inline (client component) */}
      <nav className="sticky top-0 z-50 bg-creme/90 backdrop-blur-sm border-b border-bege">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-semibold text-marrom">
            Lari Linhares
          </Link>
          <div className="hidden md:flex gap-7">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-marrom/80 hover:text-marrom">
                {l.label}
              </Link>
            ))}
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden text-marrom" aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {open && (
          <div className="md:hidden bg-creme border-t border-bege px-5 py-3 flex flex-col gap-3">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-marrom/80 py-2">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="max-w-2xl mx-auto px-5 py-12">
        <h1 className="font-serif text-4xl font-bold text-marrom text-center">
          Vamos conversar?
        </h1>
        <p className="text-center text-marrom/60 mt-3">
          Parcerias, trabalhos ou só um oi. Escolhe como prefere falar comigo 🤍
        </p>

        {/* CAMINHOS RÁPIDOS */}
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          <a
            href="mailto:linharesparceria@gmail.com"
            className="flex items-center gap-3 bg-white border border-bege rounded-2xl p-5 hover:border-marrom/40 transition-colors"
          >
            <Mail size={22} className="text-marrom" />
            <div>
              <p className="font-semibold text-marrom text-sm">Email</p>
              <p className="text-xs text-marrom/50">Pra parcerias</p>
            </div>
          </a>
          <a
            href="https://wa.me/5511962933246"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white border border-bege rounded-2xl p-5 hover:border-marrom/40 transition-colors"
          >
            <MessageCircle size={22} className="text-marrom" />
            <div>
              <p className="font-semibold text-marrom text-sm">WhatsApp</p>
              <p className="text-xs text-marrom/50">Resposta rápida</p>
            </div>
          </a>
        </div>

        <div className="flex items-center gap-3 my-8">
          <div className="flex-1 h-px bg-bege" />
          <span className="text-xs text-marrom/40">ou preencha o formulário</span>
          <div className="flex-1 h-px bg-bege" />
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={enviar} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Seu nome *" value={form.nome} onChange={(v) => update('nome', v)} />
            <Input label="Email *" type="email" value={form.email} onChange={(v) => update('email', v)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Telefone / WhatsApp" value={form.telefone} onChange={(v) => update('telefone', v)} />
            <Select
              label="Tipo de contato"
              value={form.tipo}
              onChange={(v) => update('tipo', v)}
              options={['Parceria Publi', 'Permuta', 'Make Profissional', 'Imprensa / Matéria', 'Dúvida / Informação', 'Outros']}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Marca / Empresa" value={form.marca} onChange={(v) => update('marca', v)} />
            <Input label="Seu cargo" value={form.cargo} onChange={(v) => update('cargo', v)} />
          </div>
          <Input label="Assunto" value={form.assunto} onChange={(v) => update('assunto', v)} />
          <div>
            <label className="block text-sm font-medium text-marrom mb-1.5">Mensagem *</label>
            <textarea
              value={form.mensagem}
              onChange={(e) => update('mensagem', e.target.value)}
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-bege bg-white text-marrom focus:outline-none focus:border-marrom/50 resize-none"
              placeholder="Conta um pouco sobre o que você precisa..."
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select
              label="Orçamento estimado"
              value={form.orcamento}
              onChange={(v) => update('orcamento', v)}
              options={['Até R$ 500', 'R$ 500 - R$ 1.500', 'R$ 1.500 - R$ 5.000', 'R$ 5.000 - R$ 10.000', 'Acima de R$ 10.000', 'A combinar', 'Permuta apenas']}
            />
            <Select
              label="Como me conheceu?"
              value={form.comoConheceu}
              onChange={(v) => update('comoConheceu', v)}
              options={['Instagram', 'TikTok', 'Google', 'Live SBT (Jequiti)', 'Indicação', 'Site direto', 'Outros']}
            />
          </div>

          {erro && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="w-full flex items-center justify-center gap-2 bg-marrom text-creme font-semibold px-8 py-4 rounded-xl hover:bg-marrom-escuro transition-colors disabled:opacity-60"
          >
            {enviando ? 'Enviando...' : (<><Send size={18} /> Enviar mensagem</>)}
          </button>

          <p className="text-xs text-center text-marrom/40">
            Respondo em até 24h em dias úteis 🤍
          </p>
        </form>
      </div>
    </main>
  );
}

function Input({
  label, value, onChange, type = 'text',
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-marrom mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-bege bg-white text-marrom focus:outline-none focus:border-marrom/50"
      />
    </div>
  );
}

function Select({
  label, value, onChange, options,
}: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-marrom mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-bege bg-white text-marrom focus:outline-none focus:border-marrom/50"
      >
        <option value="">Selecione...</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
