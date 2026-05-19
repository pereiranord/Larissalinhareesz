import { getPerfil, getProdutos, getImageUrl } from '@/lib/airtable';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Placeholder from '@/components/Placeholder';
import { ShoppingBag, Star } from 'lucide-react';

export const revalidate = 60;

export const metadata = {
  title: 'Favoritos — Larissa Linhares',
  description: 'Os produtos que eu uso de verdade e recomendo. Nada é publi.',
};

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

function grupoCategoria(cat: string = ''): string {
  if (cat.includes('Make')) return '💄 Maquiagem';
  if (cat.includes('Cabelo')) return '💁🏻‍♀️ Cabelo';
  if (cat.includes('Skincare')) return '🧴 Skincare';
  if (cat.includes('Moda')) return '👗 Moda';
  if (cat.includes('Casa')) return '🏠 Casa';
  return '✨ Outros';
}

export default async function Favoritos() {
  const [perfil, produtos] = await Promise.all([getPerfil(), getProdutos()]);
  const nome = perfil?.['Nome Apresentação'] || 'Lari';

  // agrupa por grande categoria
  const grupos: Record<string, any[]> = {};
  (produtos as any[]).forEach((p) => {
    const g = grupoCategoria(p['Categoria']);
    if (!grupos[g]) grupos[g] = [];
    grupos[g].push(p);
  });

  const ordem = ['💄 Maquiagem', '💁🏻‍♀️ Cabelo', '🧴 Skincare', '👗 Moda', '🏠 Casa', '✨ Outros'];
  const gruposOrdenados = ordem.filter((g) => grupos[g]?.length > 0);

  return (
    <main className="min-h-screen">
      <Nav nome={nome} />

      <div className="max-w-5xl mx-auto px-5 py-12">
        <h1 className="font-serif text-4xl font-bold text-marrom text-center">
          Meus Favoritos
        </h1>
        <p className="text-center text-marrom/60 mt-3 max-w-lg mx-auto">
          Tudo aqui eu uso de verdade. Quando tem cupom ou link de afiliado,
          eu marco — assim você compra com facilidade e me ajuda. 🤍
        </p>

        {(produtos as any[]).length === 0 ? (
          <p className="text-center text-marrom/40 italic py-20">
            Em breve, meus produtos favoritos por aqui ✨
          </p>
        ) : (
          <div className="mt-12 space-y-14">
            {gruposOrdenados.map((grupo) => (
              <section key={grupo}>
                <h2 className="font-serif text-2xl font-bold text-marrom mb-6 pb-2 border-b border-bege">
                  {grupo}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {grupos[grupo].map((p) => {
                    const foto = getImageUrl(p['Foto Principal']);
                    const links = AFILIADOS.filter((a) => p[a.campo]);
                    const nota = p['Nota Pessoal'];
                    return (
                      <div
                        key={p.id}
                        className="bg-white border border-bege rounded-2xl overflow-hidden flex flex-col"
                      >
                        <div className="aspect-square bg-bege relative">
                          {foto ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={foto}
                              alt={p['Nome']}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Placeholder className="w-full h-full" label="Produto" />
                          )}
                          {p['Indispensável'] && (
                            <span className="absolute top-3 left-3 text-xs bg-marrom text-creme px-2.5 py-1 rounded-full font-medium">
                              💖 Indispensável
                            </span>
                          )}
                          {p['Top do Mês'] && !p['Indispensável'] && (
                            <span className="absolute top-3 left-3 text-xs bg-dourado text-white px-2.5 py-1 rounded-full font-medium">
                              ⭐ Top do mês
                            </span>
                          )}
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <p className="font-semibold text-marrom">{p['Nome']}</p>
                          {nota > 0 && (
                            <div className="flex gap-0.5 mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={13}
                                  className={i < nota ? 'fill-dourado text-dourado' : 'text-bege'}
                                />
                              ))}
                            </div>
                          )}
                          {p['Por Que Amo'] && (
                            <p className="text-sm text-marrom/60 mt-2 line-clamp-3 flex-1">
                              {p['Por Que Amo']}
                            </p>
                          )}
                          {p['Preço Aproximado'] && (
                            <p className="text-sm font-medium text-marrom mt-2">
                              ~R$ {Number(p['Preço Aproximado']).toFixed(2).replace('.', ',')}
                            </p>
                          )}
                          {(p['Recebido por Permuta'] || p['Já Foi Publi']) && (
                            <p className="text-[10px] text-marrom/40 mt-1">
                              {p['Já Foi Publi'] ? '📣 Já foi publi' : '🎁 Recebido em permuta'}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {links.length > 0 ? (
                              links.slice(0, 3).map((a) => (
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
              </section>
            ))}
          </div>
        )}
      </div>

      <Footer perfil={perfil} />
    </main>
  );
}
