import Link from 'next/link';
import { getPerfil, getLooks, getImageUrl } from '@/lib/airtable';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Placeholder from '@/components/Placeholder';

export const revalidate = 60;

export const metadata = {
  title: 'Looks — Larissa Linhares',
  description: 'Galeria de looks com todos os produtos usados e onde comprar.',
};

export default async function Looks() {
  const [perfil, looks] = await Promise.all([getPerfil(), getLooks()]);
  const nome = perfil?.['Nome Apresentação'] || 'Lari';

  return (
    <main className="min-h-screen">
      <Nav nome={nome} />

      <div className="max-w-5xl mx-auto px-5 py-12">
        <h1 className="font-serif text-4xl font-bold text-marrom text-center">
          Meus Looks
        </h1>
        <p className="text-center text-marrom/60 mt-2 mb-10">
          Clica em qualquer look pra ver tudo que usei e onde comprar
        </p>

        {(looks as any[]).length === 0 ? (
          <p className="text-center text-marrom/40 italic py-20">
            Em breve, looks lindos por aqui ✨
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {(looks as any[]).map((look) => {
              const foto = getImageUrl(look['Foto Principal']);
              return (
                <Link
                  key={look.id}
                  href={`/looks/${look['Slug'] || look.id}`}
                  className="group"
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-bege relative">
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
                    {look['Categoria Principal'] && (
                      <span className="absolute top-3 left-3 text-xs bg-creme/90 backdrop-blur px-2.5 py-1 rounded-full text-marrom font-medium">
                        {look['Categoria Principal']}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-marrom mt-2.5 group-hover:text-marrom-claro">
                    {look['Título']}
                  </p>
                  {look['Descrição Curta'] && (
                    <p className="text-xs text-marrom/50 mt-0.5 line-clamp-2">
                      {look['Descrição Curta']}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <Footer perfil={perfil} />
    </main>
  );
}
