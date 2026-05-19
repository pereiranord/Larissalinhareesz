import Link from 'next/link';
import { getPerfil, getBotoes, getMarcas, getLooks, getImageUrl } from '@/lib/airtable';
import Footer from '@/components/Footer';
import Placeholder from '@/components/Placeholder';
import {
  Instagram, Music2, Mail, MessageCircle, Heart, Star,
  ShoppingBag, BookOpen, Sparkles, ExternalLink, FileText,
} from 'lucide-react';

export const revalidate = 60;

const ICONS: Record<string, any> = {
  instagram: Instagram, tiktok: Music2, mail: Mail, email: Mail,
  whatsapp: MessageCircle, heart: Heart, star: Star,
  bag: ShoppingBag, shopping: ShoppingBag, book: BookOpen,
  diary: BookOpen, sparkles: Sparkles, link: ExternalLink,
  file: FileText, midiakit: FileText,
};

function getIcon(name: string = '') {
  const key = name.toLowerCase().trim();
  return ICONS[key] || ExternalLink;
}

export default async function Home() {
  const [perfil, botoes, marcas, looks] = await Promise.all([
    getPerfil(),
    getBotoes(),
    getMarcas(),
    getLooks(),
  ]);

  const nome = perfil?.['Nome Apresentação'] || 'Lari Linhares';
  const tagline = perfil?.['Tagline'] || 'Maquiadora cacheada · São Paulo';
  const bioCurta = perfil?.['Bio Curta'] || 'Cachos sem mistério, make sem sufoco e a vida real entre os dois. 🤍';
  const fotoPerfil = getImageUrl(perfil?.['Foto Perfil']);
  const fotoBanner = getImageUrl(perfil?.['Foto Banner Home']);
  const profissao = perfil?.['Profissão'];
  const anoCarreira = perfil?.['Ano Início Carreira'];
  const looksDestaque = (looks as any[]).filter((l) => l['Destaque Home']).slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* BANNER */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        {fotoBanner ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={fotoBanner} alt="Banner" className="w-full h-full object-cover" />
        ) : (
          <Placeholder rounded="rounded-none" className="w-full h-full" label="" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-creme" />
      </div>

      {/* PERFIL */}
      <div className="max-w-lg mx-auto px-5 -mt-16 relative z-10 text-center">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-creme shadow-lg bg-bege">
          {fotoPerfil ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={fotoPerfil} alt={nome} className="w-full h-full object-cover" />
          ) : (
            <Placeholder rounded="rounded-full" className="w-full h-full" />
          )}
        </div>

        <h1 className="font-serif text-3xl font-bold text-marrom mt-4 fade-up">
          {nome}
        </h1>
        <p className="text-sm font-medium text-marrom/70 mt-1 fade-up fade-up-delay-1">
          {tagline}
        </p>
        <p className="text-base text-marrom/80 mt-4 leading-relaxed fade-up fade-up-delay-2">
          {bioCurta}
        </p>

        {/* SELOS DE AUTORIDADE */}
        <div className="flex flex-wrap justify-center gap-2 mt-5 fade-up fade-up-delay-3">
          {profissao && (
            <span className="text-xs bg-bege-fundo border border-bege px-3 py-1.5 rounded-full text-marrom/70">
              ✨ {profissao}{anoCarreira ? ` desde ${anoCarreira}` : ''}
            </span>
          )}
        </div>

        {/* BOTÕES */}
        <div className="mt-8 flex flex-col gap-3 pb-4">
          {(botoes as any[]).length === 0 && (
            <p className="text-sm text-marrom/40 italic py-8">
              Em breve, novos links por aqui ✨
            </p>
          )}
          {(botoes as any[]).map((b) => {
            const Icon = getIcon(b['Ícone']);
            const isDestaque = b['Destaque'];
            const url = b['URL'] || '#';
            const isExternal = url.startsWith('http');

            const className = `flex items-center gap-3 px-5 py-4 rounded-xl transition-all active:scale-[0.98] ${
              isDestaque
                ? 'bg-marrom text-creme shadow-md hover:bg-marrom-escuro'
                : 'bg-white border border-bege text-marrom hover:border-marrom/40 hover:shadow-sm'
            }`;

            const content = (
              <>
                <Icon size={20} className="shrink-0" />
                <div className="flex-1 text-left">
                  <p className="font-semibold text-sm">{b['Título']}</p>
                  {b['Subtítulo'] && (
                    <p className={`text-xs ${isDestaque ? 'text-creme/70' : 'text-marrom/50'}`}>
                      {b['Subtítulo']}
                    </p>
                  )}
                </div>
              </>
            );

            return isExternal ? (
              <a key={b.id} href={url} target="_blank" rel="noopener noreferrer" className={className}>
                {content}
              </a>
            ) : (
              <Link key={b.id} href={url} className={className}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>

      {/* LOOKS EM DESTAQUE */}
      {looksDestaque.length > 0 && (
        <section className="max-w-5xl mx-auto px-5 mt-16">
          <h2 className="font-serif text-2xl font-bold text-marrom text-center mb-2">
            Looks em destaque
          </h2>
          <p className="text-sm text-marrom/60 text-center mb-8">
            Inspirações com tudo que usei
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {looksDestaque.map((look) => {
              const foto = getImageUrl(look['Foto Principal']);
              return (
                <Link
                  key={look.id}
                  href={`/looks/${look['Slug'] || look.id}`}
                  className="group"
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-bege">
                    {foto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={foto}
                        alt={look['Título']}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <Placeholder className="w-full h-full" label="Look" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-marrom mt-2 group-hover:text-marrom-claro">
                    {look['Título']}
                  </p>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/looks"
              className="inline-block text-sm font-semibold text-marrom border border-marrom/30 px-6 py-2.5 rounded-full hover:bg-marrom hover:text-creme transition-colors"
            >
              Ver todos os looks
            </Link>
          </div>
        </section>
      )}

      {/* MARCAS */}
      {(marcas as any[]).length > 0 && (
        <section className="max-w-5xl mx-auto px-5 mt-16">
          <h2 className="font-serif text-2xl font-bold text-marrom text-center mb-8">
            Marcas com quem trabalho
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {(marcas as any[]).map((m) => {
              const logo = getImageUrl(m['Logo']);
              return (
                <div key={m.id} className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logo} alt={m['Nome']} className="h-10 md:h-12 object-contain" />
                  ) : (
                    <span className="text-sm font-medium text-marrom/50 px-4 py-2 border border-bege rounded-lg">
                      {m['Nome']}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      <Footer perfil={perfil} />
    </main>
  );
}
