import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getPerfil, getLookBySlug, getLooks, getProdutosByIds, getImageUrl,
} from '@/lib/airtable';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Placeholder from '@/components/Placeholder';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const look = await getLookBySlug(params.slug);
  if (!look) return { title: 'Look não encontrado' };
  return {
    title: (look as any)['Meta Título SEO'] || `${(look as any)['Título']} — Larissa Linhares`,
    description: (look as any)['Meta Descrição SEO'] || (look as any)['Descrição Curta'] || '',
  };
}

const AFILIADOS = [
  { campo: 'Link Amazon', nome: 'Amazon' },
  { campo: 'Link Shopee', nome: 'Shopee' },
  { campo: 'Link Magalu', nome: 'Magalu' },
  { campo: 'Link Shein', nome: 'Shein' },
  { campo: 'Link Renner', nome: 'Renner' },
  { campo: 'Link Sephora', nome: 'Sephora' },
  { campo: 'Link Outro Afiliado', nome: 'Comprar' },
  { campo: 'Link Oficial Marca', nome: 'Site oficial' },
];

export default async function LookPage({ params }: { params: { slug: string } }) {
  const look = await getLookBySlug(params.slug);
  if (!look) notFound();

  const [perfil, allLooks] = await Promise.all([getPerfil(), getLooks()]);
  const nome = perfil?.['Nome Apresentação'] || 'Lari';

  const produtoIds = ((look as any)['Produtos Usados'] || []) as string[];
  const produtos = await getProdutosByIds(produtoIds);

  const fotoPrincipal = getImageUrl((look as any)['Foto Principal']);
  const galeria = (look as any)['Galeria Fotos'] || [];

  const similares = (allLooks as any[])
    .filter((l) => l.id !== (look as any).id && l['Categoria Principal'] === (look as any)['Categoria Principal'])
    .slice(0, 3);

  return (
    <main className="min-h-screen">
      <Nav nome={nome} />

      <div className="max-w-4xl mx-auto px-5 py-8">
        <Link
          href="/looks"
          className="inline-flex items-center gap-2 text-sm text-marrom/60 hover:text-marrom mb-6"
        >
          <ArrowLeft size={16} /> Voltar pros looks
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* FOTO */}
          <div>
            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-bege">
              {fotoPrincipal ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={fotoPrincipal}
                  alt={(look as any)['Título']}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Placeholder className="w-full h-full" label="Look" />
              )}
            </div>
            {galeria.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {galeria.slice(0, 4).map((img: any, i: number) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={img.url}
                    alt={`Foto ${i + 1}`}
                    className="aspect-square object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            {(look as any)['Categoria Principal'] && (
              <span className="text-xs bg-bege-fundo border border-bege px-3 py-1 rounded-full text-marrom/70">
                {(look as any)['Categoria Principal']}
              </span>
            )}
            <h1 className="font-serif text-3xl font-bold text-marrom mt-3">
              {(look as any)['Título']}
            </h1>
            {(look as any)['Descrição Longa'] ? (
              <div className="text-marrom/80 mt-4 leading-relaxed whitespace-pre-line">
                {(look as any)['Descrição Longa']}
              </div>
            ) : (
              (look as any)['Descrição Curta'] && (
                <p className="text-marrom/80 mt-4 leading-relaxed">
                  {(look as any)['Descrição Curta']}
                </p>
              )
            )}
          </div>
        </div>

        {/* PRODUTOS DO LOOK */}
        <section className="mt-14">
          <h2 className="font-serif text-2xl font-bold text-marrom mb-6">
            Tudo que usei nesse look
          </h2>
          {produtos.length === 0 ? (
            <p className="text-marrom/40 italic">
              Produtos deste look serão adicionados em breve.
            </p>
          ) : (
            <div className="space-y-4">
              {produtos.map((p: any) => {
                const foto = getImageUrl(p['Foto Principal']);
                const links = AFILIADOS.filter((a) => p[a.campo]);
                return (
                  <div
                    key={p.id}
                    className="flex flex-col sm:flex-row gap-4 bg-white border border-bege rounded-2xl p-4"
                  >
                    <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden bg-bege shrink-0">
                      {foto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={foto} alt={p['Nome']} className="w-full h-full object-cover" />
                      ) : (
                        <Placeholder className="w-full h-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-marrom">{p['Nome']}</p>
                      {p['Por Que Amo'] && (
                        <p className="text-sm text-marrom/60 mt-1 line-clamp-2">
                          {p['Por Que Amo']}
                        </p>
                      )}
                      {p['Preço Aproximado'] && (
                        <p className="text-sm font-medium text-marrom mt-1">
                          ~R$ {Number(p['Preço Aproximado']).toFixed(2).replace('.', ',')}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {links.length > 0 ? (
                          links.map((a) => (
                            <a
                              key={a.campo}
                              href={p[a.campo]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-marrom text-creme px-3 py-2 rounded-lg hover:bg-marrom-escuro transition-colors"
                            >
                              <ShoppingBag size={13} /> {a.nome}
                            </a>
                          ))
                        ) : (
                          <span className="text-xs text-marrom/40 italic">
                            Link em breve
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* SIMILARES */}
        {similares.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-marrom mb-6">
              Looks parecidos
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {similares.map((s) => {
                const foto = getImageUrl(s['Foto Principal']);
                return (
                  <Link key={s.id} href={`/looks/${s['Slug'] || s.id}`} className="group">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-bege">
                      {foto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={foto}
                          alt={s['Título']}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <Placeholder className="w-full h-full" label="Look" />
                      )}
                    </div>
                    <p className="text-xs font-medium text-marrom mt-2">{s['Título']}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <Footer perfil={perfil} />
    </main>
  );
}
