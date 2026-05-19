import Link from 'next/link';
import { getPerfil, getBotoes, getMarcas, getLooks, getImageUrl } from '@/lib/airtable';
import Footer from '@/components/Footer';
import ProtectedImage from '@/components/ProtectedImage';
import NewsletterForm from '@/components/NewsletterForm';
import { getIconComponent, ArrowRightIcon } from '@/components/Icons';

export const revalidate = 60;

export default async function Home() {
  const [perfil, botoes, marcas, looks] = await Promise.all([
    getPerfil(),
    getBotoes(),
    getMarcas(),
    getLooks(),
  ]);

  const nome = perfil?.['Nome Apresentação'] || 'Lari Linhares';
  const tagline = perfil?.['Tagline'] || 'Maquiadora cacheada · São Paulo';
  const bioCurta = perfil?.['Bio Curta'] || 'Cachos sem mistério, make sem sufoco e a vida real entre os dois.';
  const fotoPerfil = getImageUrl(perfil?.['Foto Perfil']);
  const fotoBanner = getImageUrl(perfil?.['Foto Banner Home']);
  const profissao = perfil?.['Profissão'];
  const anoCarreira = perfil?.['Ano Início Carreira'];
  const looksDestaque = (looks as any[]).filter((l) => l['Destaque Home']).slice(0, 3);
  const anosCarreira = anoCarreira ? new Date().getFullYear() - Number(anoCarreira) : null;

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="relative">
        {/* banner de fundo */}
        <div className="absolute inset-0 h-[70vh] md:h-[80vh] overflow-hidden">
          {fotoBanner ? (
            <div className="w-full h-full anim-slow-zoom">
              <ProtectedImage src={fotoBanner} alt="" className="w-full h-full" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-bege via-bege-claro to-bege-fundo" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-marrom-escuro/30 via-creme/40 to-creme" />
        </div>

        {/* conteúdo do hero */}
        <div className="relative z-10 max-w-xl mx-auto px-6 pt-[26vh] md:pt-[32vh] pb-16 text-center">
          {/* foto perfil */}
          <div className="anim-scale-in inline-block">
            <div className="w-36 h-36 md:w-44 md:h-44 mx-auto rounded-full overflow-hidden ring-4 ring-creme shadow-2xl">
              {fotoPerfil ? (
                <ProtectedImage src={fotoPerfil} alt={nome} className="w-full h-full" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-bege-claro to-bege flex items-center justify-center">
                  <span className="font-serif text-5xl text-marrom/30">
                    {nome.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* nome */}
          <h1 className="anim-fade-up d2 font-serif text-5xl md:text-6xl font-bold text-marrom mt-7 leading-none">
            {nome}
          </h1>

          {/* tagline com ornamento */}
          <div className="anim-fade-up d3 ornament max-w-xs mx-auto mt-5 text-sm tracking-[0.2em] uppercase font-medium">
            <span className="text-marrom/60 whitespace-nowrap px-1">{tagline}</span>
          </div>

          {/* bio */}
          <p className="anim-fade-up d4 text-base md:text-lg text-marrom/75 mt-6 leading-relaxed font-light max-w-md mx-auto">
            {bioCurta}
          </p>

          {/* selo de autoridade */}
          {profissao && (
            <div className="anim-fade-up d5 inline-flex items-center gap-2 mt-6 px-5 py-2 rounded-full bg-white/70 backdrop-blur border border-bege/60">
              <span className="w-1.5 h-1.5 rounded-full bg-dourado" />
              <span className="text-xs font-medium text-marrom/70 tracking-wide">
                {profissao}
                {anosCarreira ? ` · ${anosCarreira} anos de experiência` : ''}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ===== BOTÕES ===== */}
      <section className="max-w-md mx-auto px-6 -mt-4 pb-8">
        <div className="flex flex-col gap-3.5">
          {(botoes as any[]).length === 0 && (
            <p className="text-center text-sm text-marrom/40 italic py-8">
              Em breve, novos links por aqui
            </p>
          )}
          {(botoes as any[]).map((b, idx) => {
            const Icon = getIconComponent(b['Ícone']);
            const isDestaque = b['Destaque'];
            const url = b['URL'] || '#';
            const isExternal = url.startsWith('http') || url.startsWith('mailto');

            const cls = `btn-premium anim-fade-up group flex items-center gap-4 px-6 py-4 rounded-2xl d${Math.min(idx + 1, 7)} ${
              isDestaque
                ? 'bg-marrom text-creme shadow-lg shadow-marrom/20'
                : 'bg-white/80 backdrop-blur border border-bege/70 text-marrom hover:border-marrom/30 hover:bg-white'
            }`;

            const inner = (
              <>
                <span
                  className={`shrink-0 grid place-items-center w-11 h-11 rounded-xl transition-colors ${
                    isDestaque ? 'bg-creme/15' : 'bg-bege-fundo group-hover:bg-bege-claro'
                  }`}
                >
                  <Icon size={21} />
                </span>
                <span className="flex-1 text-left">
                  <span className="block font-semibold text-[15px] tracking-tight">
                    {b['Título']}
                  </span>
                  {b['Subtítulo'] && (
                    <span className={`block text-xs mt-0.5 ${isDestaque ? 'text-creme/60' : 'text-marrom/45'}`}>
                      {b['Subtítulo']}
                    </span>
                  )}
                </span>
                <ArrowRightIcon
                  size={17}
                  className={`shrink-0 transition-transform group-hover:translate-x-1 ${
                    isDestaque ? 'text-creme/50' : 'text-marrom/30'
                  }`}
                />
              </>
            );

            return isExternal ? (
              <a key={b.id} href={url} target="_blank" rel="noopener noreferrer" className={cls}>
                {inner}
              </a>
            ) : (
              <Link key={b.id} href={url} className={cls}>
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== LOOKS EM DESTAQUE ===== */}
      {looksDestaque.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 mt-20">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-dourado font-semibold mb-3">
              Inspiração
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-marrom">
              Looks em destaque
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
            {looksDestaque.map((look, i) => {
              const foto = getImageUrl(look['Foto Principal']);
              return (
                <Link
                  key={look.id}
                  href={`/looks/${look['Slug'] || look.id}`}
                  className={`group anim-fade-up d${i + 1} lift block`}
                >
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-bege relative">
                    {foto ? (
                      <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                        <ProtectedImage src={foto} alt={look['Título']} className="w-full h-full" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-bege-claro to-bege" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-marrom-escuro/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {look['Categoria Principal'] && (
                      <span className="absolute bottom-4 left-4 text-xs bg-creme/95 backdrop-blur px-3 py-1.5 rounded-full text-marrom font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        {String(look['Categoria Principal']).replace(/[\u{1F300}-\u{1FAFF}]/gu, '').trim()}
                      </span>
                    )}
                  </div>
                  <p className="font-serif text-lg font-semibold text-marrom mt-4 group-hover:text-marrom-claro transition-colors">
                    {look['Título']}
                  </p>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/looks"
              className="btn-premium inline-flex items-center gap-2 text-sm font-semibold text-marrom border-2 border-marrom/20 px-8 py-3.5 rounded-full hover:border-marrom hover:bg-marrom hover:text-creme transition-all duration-400"
            >
              Ver todos os looks
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </section>
      )}

      {/* ===== MARCAS ===== */}
      {(marcas as any[]).length > 0 && (
        <section className="max-w-5xl mx-auto px-6 mt-24">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-dourado font-semibold mb-3">
              Confiança
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-marrom">
              Marcas com quem trabalho
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-5">
            {(marcas as any[]).map((m, i) => {
              const logo = getImageUrl(m['Logo']);
              return (
                <div
                  key={m.id}
                  className={`anim-fade-up d${Math.min(i + 1, 7)}`}
                >
                  {logo ? (
                    <div className="h-14 w-28 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 flex items-center justify-center">
                      <ProtectedImage src={logo} alt={m['Nome']} className="max-h-12 w-auto" />
                    </div>
                  ) : (
                    <span className="text-sm font-medium text-marrom/55 px-5 py-3 border border-bege/70 rounded-xl bg-white/50 hover:bg-white hover:border-marrom/20 transition-all">
                      {m['Nome']}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== NEWSLETTER ===== */}
      <section className="max-w-2xl mx-auto px-6 mt-24">
        <div className="relative bg-gradient-to-br from-marrom to-marrom-escuro rounded-[2rem] p-10 md:p-14 text-center overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-dourado/10 anim-float" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-creme/5" />
          <div className="relative z-10">
            <p className="text-xs tracking-[0.3em] uppercase text-dourado font-semibold mb-4">
              Meu cantinho
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-creme">
              Receba meu diário no email
            </h2>
            <p className="text-creme/70 mt-4 font-light max-w-md mx-auto">
              Dicas de cachos, make, os produtos que tô amando e um pouco da vida real.
              Direto pra você, sem encher sua caixa de entrada.
            </p>
            <div className="mt-8">
              <NewsletterForm variant="dark" />
            </div>
          </div>
        </div>
      </section>

      <Footer perfil={perfil} />
    </main>
  );
}
