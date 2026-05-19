import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPerfil, getPostBySlug, getDiario, getImageUrl } from '@/lib/airtable';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Placeholder from '@/components/Placeholder';
import { ArrowLeft, Clock } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post não encontrado' };
  return {
    title: (post as any)['Meta Título SEO'] || `${(post as any)['Título']} — Larissa Linhares`,
    description: (post as any)['Meta Descrição SEO'] || (post as any)['Resumo'] || '',
  };
}

function formatarData(d: string) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('pt-BR', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const [perfil, allPosts] = await Promise.all([getPerfil(), getDiario()]);
  const nome = perfil?.['Nome Apresentação'] || 'Lari';
  const foto = getImageUrl((post as any)['Foto Capa']);

  const outros = (allPosts as any[])
    .filter((p) => p.id !== (post as any).id)
    .slice(0, 2);

  return (
    <main className="min-h-screen">
      <Nav nome={nome} />

      <article className="max-w-2xl mx-auto px-5 py-8">
        <Link
          href="/diario"
          className="inline-flex items-center gap-2 text-sm text-marrom/60 hover:text-marrom mb-6"
        >
          <ArrowLeft size={16} /> Voltar pro diário
        </Link>

        <div className="flex items-center gap-3 text-xs text-marrom/50 mb-3">
          {(post as any)['Categoria Post'] && (
            <span className="bg-bege-fundo px-2.5 py-1 rounded-full">
              {(post as any)['Categoria Post']}
            </span>
          )}
          <span>{formatarData((post as any)['Data Publicação'])}</span>
          {(post as any)['Tempo Leitura (min)'] && (
            <span className="flex items-center gap-1">
              <Clock size={12} /> {(post as any)['Tempo Leitura (min)']} min
            </span>
          )}
        </div>

        <h1 className="font-serif text-4xl font-bold text-marrom leading-tight">
          {(post as any)['Título']}
        </h1>
        {(post as any)['Subtítulo'] && (
          <p className="text-xl text-marrom/70 mt-2 font-serif">
            {(post as any)['Subtítulo']}
          </p>
        )}

        {foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={foto}
            alt={(post as any)['Título']}
            className="w-full aspect-[16/9] object-cover rounded-3xl mt-8"
          />
        ) : (
          <Placeholder className="w-full aspect-[16/9] mt-8" label="Post" />
        )}

        <div className="prose prose-lg max-w-none text-marrom/80 mt-8 leading-relaxed whitespace-pre-line">
          {(post as any)['Conteúdo'] || (
            <p className="text-marrom/40 italic">
              Conteúdo será adicionado em breve.
            </p>
          )}
        </div>

        {(post as any)['CTA Principal'] && (post as any)['CTA URL'] && (
          <div className="mt-10 text-center">
            <a
              href={(post as any)['CTA URL']}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-marrom text-creme font-semibold px-8 py-3.5 rounded-full hover:bg-marrom-escuro transition-colors"
            >
              {(post as any)['CTA Principal']}
            </a>
          </div>
        )}

        {/* OUTROS POSTS */}
        {outros.length > 0 && (
          <section className="mt-16 pt-10 border-t border-bege">
            <h2 className="font-serif text-2xl font-bold text-marrom mb-6">
              Continue lendo
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {outros.map((p) => {
                const f = getImageUrl(p['Foto Capa']);
                return (
                  <Link
                    key={p.id}
                    href={`/diario/${p['Slug'] || p.id}`}
                    className="group"
                  >
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-bege">
                      {f ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={f}
                          alt={p['Título']}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <Placeholder className="w-full h-full" label="Post" />
                      )}
                    </div>
                    <p className="font-semibold text-marrom mt-2 group-hover:text-marrom-claro">
                      {p['Título']}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </article>

      <Footer perfil={perfil} />
    </main>
  );
}
