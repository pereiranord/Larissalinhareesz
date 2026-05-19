import Link from 'next/link';
import { Instagram, Music2, Mail } from 'lucide-react';

export default function Footer({ perfil }: { perfil: any }) {
  const nome = perfil?.['Nome Apresentação'] || 'Larissa Linhares';
  const insta = perfil?.['Link Instagram'];
  const tiktok = perfil?.['Link TikTok'];
  const email = perfil?.['Email Parcerias'];
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-bege bg-bege-fundo mt-20">
      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-lg font-semibold text-marrom">{nome}</p>
            <p className="text-sm text-marrom/60 mt-1">
              {perfil?.['Tagline'] || 'Maquiadora cacheada · São Paulo'}
            </p>
          </div>

          <div className="flex gap-5">
            {insta && (
              <a href={insta} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={20} className="text-marrom/70 hover:text-marrom transition-colors" />
              </a>
            )}
            {tiktok && (
              <a href={tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <Music2 size={20} className="text-marrom/70 hover:text-marrom transition-colors" />
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} aria-label="Email">
                <Mail size={20} className="text-marrom/70 hover:text-marrom transition-colors" />
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-bege flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-marrom/50">
          <p>© {ano} {nome}. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link href="/sobre" className="hover:text-marrom">Sobre</Link>
            <Link href="/contato" className="hover:text-marrom">Contato</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
