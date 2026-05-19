import { getPerfil, getMarcas, getEventos, getDepoimentos, getImageUrl } from '@/lib/airtable';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Placeholder from '@/components/Placeholder';
import { Quote } from 'lucide-react';

export const revalidate = 60;

export const metadata = {
  title: 'Sobre — Larissa Linhares',
  description: 'Conheça a história da Larissa: maquiadora cacheada de São Paulo.',
};

export default async function Sobre() {
  const [perfil, marcas, eventos, depoimentos] = await Promise.all([
    getPerfil(),
    getMarcas(),
    getEventos(),
    getDepoimentos(),
  ]);

  const nome = perfil?.['Nome Apresentação'] || 'Lari';
  const fotoSobre = getImageUrl(perfil?.['Foto Sobre']);
  const historia = perfil?.['História Storytelling'] || perfil?.['Bio Longa'] || '';
  const eventosDestaque = (eventos as any[]).filter((e) => e['Destaque Portfólio']);
  const depoSobre = (depoimentos as any[]).filter(
    (d) => !d['Página Destino'] || (Array.isArray(d['Página Destino']) && d['Página Destino'].some((p: string) => p.includes('Sobre')))
  );

  return (
    <main className="min-h-screen">
      <Nav nome={nome} />

      <div className="max-w-3xl mx-auto px-5 py-12">
        <h1 className="font-serif text-4xl font-bold text-marrom text-center">
          Oi, eu sou a {nome} 🤍
        </h1>
        <p className="text-center text-marrom/60 mt-2">
          {perfil?.['Tagline'] || 'Maquiadora cacheada · São Paulo'}
        </p>

        {/* FOTO */}
        <div className="mt-10 aspect-[4/3] rounded-3xl overflow-hidden bg-bege max-w-xl mx-auto">
          {fotoSobre ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={fotoSobre} alt={nome} className="w-full h-full object-cover" />
          ) : (
            <Placeholder className="w-full h-full" label="Foto editorial" />
          )}
        </div>

        {/* HISTÓRIA */}
        <div className="mt-10 prose prose-lg max-w-none text-marrom/80 leading-relaxed whitespace-pre-line">
          {historia || (
            <p className="text-marrom/50 italic text-center">
              A história completa será adicionada em breve no painel.
            </p>
          )}
        </div>

        {/* LINHA DO TEMPO */}
        {eventosDestaque.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-marrom text-center mb-8">
              Momentos marcantes
            </h2>
            <div className="space-y-4">
              {eventosDestaque.map((ev) => {
                const foto = getImageUrl(ev['Foto Destaque']);
                return (
                  <div
                    key={ev.id}
                    className="flex gap-4 items-center bg-white border border-bege rounded-2xl p-4"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-bege shrink-0">
                      {foto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={foto} alt={ev['Título']} className="w-full h-full object-cover" />
                      ) : (
                        <Placeholder className="w-full h-full" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-marrom">{ev['Título']}</p>
                      {ev['Tipo'] && (
                        <p className="text-xs text-marrom/50 mt-0.5">{ev['Tipo']}</p>
                      )}
                      {ev['Descrição'] && (
                        <p className="text-sm text-marrom/70 mt-1 line-clamp-2">
                          {ev['Descrição']}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* DEPOIMENTOS */}
        {depoSobre.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-marrom text-center mb-8">
              O que elas dizem
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {depoSobre.slice(0, 4).map((d) => (
                <div
                  key={d.id}
                  className="bg-bege-fundo border border-bege rounded-2xl p-6"
                >
                  <Quote size={24} className="text-dourado mb-3" />
                  <p className="text-marrom/80 italic leading-relaxed">
                    "{d['Texto Depoimento']}"
                  </p>
                  <p className="text-sm font-semibold text-marrom mt-4">
                    — {d['Nome Pessoa']}
                    {d['Cidade'] && <span className="font-normal text-marrom/50">, {d['Cidade']}</span>}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MARCAS */}
        {(marcas as any[]).length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-marrom text-center mb-8">
              Marcas parceiras
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {(marcas as any[]).map((m) => {
                const logo = getImageUrl(m['Logo']);
                return logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={m.id}
                    src={logo}
                    alt={m['Nome']}
                    className="h-10 object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all"
                  />
                ) : (
                  <span
                    key={m.id}
                    className="text-sm text-marrom/60 px-4 py-2 border border-bege rounded-lg"
                  >
                    {m['Nome']}
                  </span>
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
