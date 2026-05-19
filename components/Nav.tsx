'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/looks', label: 'Looks' },
  { href: '/favoritos', label: 'Favoritos' },
  { href: '/diario', label: 'Diário' },
  { href: '/contato', label: 'Contato' },
];

export default function Nav({ nome }: { nome: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-creme/90 backdrop-blur-sm border-b border-bege">
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl font-semibold text-marrom">
          {nome}
        </Link>

        {/* desktop */}
        <div className="hidden md:flex gap-7">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-marrom/80 hover:text-marrom transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-marrom"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden bg-creme border-t border-bege px-5 py-3 flex flex-col gap-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-marrom/80 py-2"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
