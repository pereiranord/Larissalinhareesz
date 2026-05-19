import Link from 'next/link';
import { InstagramIcon, TikTokIcon, MailIcon } from '@/components/Icons';

export default function Footer({ perfil }: { perfil: any }) {
  const nome = perfil?.['Nome Apresentação'] || 'Larissa Linhares';
  const insta = perfil?.['Link Instagram'];
  const tiktok = perfil?.['Link TikTok'];
  const email = perfil?.['Email Parcerias'];
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-bege/60 bg-bege-fundo/50 mt-28">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex flex-col items-center text-center gap-6">
          <div>
            <p className="font-serif text-2xl font-bold text-marrom">{nome}</p>
            <p className="text-sm text-marrom/55 mt-1.5 tracking-wide">
              {perfil?.['Tagline'] || 'Maquiadora cacheada · São Paulo'}
            </p>
          </div>

          <div className="flex gap-3">
            {insta && (
              <a
                href={insta}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 grid place-items-center rounded-full bg-white border border-bege/70 text-marrom/70 hover:text-marrom hover:border-marrom/30 transition-all lift"
              >
                <InstagramIcon size={19} />
              </a>
            )}
            {tiktok && (
              <a
                href={tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-11 h-11 grid place-items-center rounded-full bg-white border border-bege/70 text-marrom/70 hover:text-marrom hover:border-marrom/30 transition-all lift"
              >
                <TikTokIcon size={19} />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                aria-label="Email"
                className="w-11 h-11 grid place-items-center rounded-full bg-white border border-bege/70 text-marrom/70 hover:text-marrom hover:border-marrom/30 transition-all lift"
              >
                <MailIcon size={19} />
              </a>
            )}
          </div>
        </div>

        <div className="mt-10 pt-7 border-t border-bege/50 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-marrom/45">
          <p>© {ano} {nome}. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            <Link href="/sobre" className="hover:text-marrom transition-colors">Sobre</Link>
            <Link href="/contato" className="hover:text-marrom transition-colors">Contato</Link>
            <Link href="/diario" className="hover:text-marrom transition-colors">Diário</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
