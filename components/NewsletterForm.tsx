'use client';

import { useState } from 'react';

export default function NewsletterForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'erro'>('idle');
  const [msg, setMsg] = useState('');

  const dark = variant === 'dark';

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');

    if (!email || !email.includes('@')) {
      setEstado('erro');
      setMsg('Coloca um email válido 🤍');
      return;
    }

    setEstado('enviando');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nome }),
      });
      const data = await res.json();
      if (data.ok) {
        setEstado('ok');
        setMsg(data.message || 'Pronto! Te mandei um email de confirmação 🤍');
        setEmail('');
        setNome('');
      } else {
        setEstado('erro');
        setMsg(data.error || 'Algo deu errado. Tenta de novo?');
      }
    } catch {
      setEstado('erro');
      setMsg('Erro de conexão. Tenta de novo?');
    }
  }

  if (estado === 'ok') {
    return (
      <div
        className={`rounded-2xl px-6 py-5 text-center ${
          dark ? 'bg-creme/10 text-creme' : 'bg-bege-fundo text-marrom'
        }`}
      >
        <p className="font-serif text-xl font-semibold">{msg}</p>
        <p className={`text-sm mt-2 ${dark ? 'text-creme/60' : 'text-marrom/50'}`}>
          Dá uma olhada na sua caixa de entrada (e no spam, só pra garantir).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="space-y-3 max-w-md mx-auto">
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Seu nome (opcional)"
        className={`w-full px-5 py-3.5 rounded-xl outline-none transition-all ${
          dark
            ? 'bg-creme/10 border border-creme/20 text-creme placeholder-creme/40 focus:border-creme/40'
            : 'bg-white border border-bege text-marrom placeholder-marrom/40 focus:border-marrom/40'
        }`}
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          className={`flex-1 px-5 py-3.5 rounded-xl outline-none transition-all ${
            dark
              ? 'bg-creme/10 border border-creme/20 text-creme placeholder-creme/40 focus:border-creme/40'
              : 'bg-white border border-bege text-marrom placeholder-marrom/40 focus:border-marrom/40'
          }`}
        />
        <button
          type="submit"
          disabled={estado === 'enviando'}
          className={`btn-premium px-7 py-3.5 rounded-xl font-semibold whitespace-nowrap transition-all disabled:opacity-60 ${
            dark
              ? 'bg-creme text-marrom hover:bg-white'
              : 'bg-marrom text-creme hover:bg-marrom-escuro'
          }`}
        >
          {estado === 'enviando' ? 'Enviando...' : 'Quero receber'}
        </button>
      </div>
      {msg && estado === 'erro' && (
        <p className={`text-sm ${dark ? 'text-creme/80' : 'text-red-700'}`}>{msg}</p>
      )}
      <p className={`text-xs ${dark ? 'text-creme/40' : 'text-marrom/40'}`}>
        Sem spam. Você pode sair quando quiser.
      </p>
    </form>
  );
}
