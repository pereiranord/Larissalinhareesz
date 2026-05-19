import Link from 'next/link';
import { getPerfil, getDiario, getImageUrl } from '@/lib/airtable';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Placeholder from '@/components/Placeholder';
import { Clock } from 'lucide-react';

export const revalidate = 60;

export const metadata = {
  title: 'Diário — Larissa Linhares',
  description: 'Meu cantinho onde compartilho mais do que cabe em um stories.',
};

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

export default async function Diario() {
  const [perfil, posts] = await Promise.all([getPerfil(), getDiario()]);
  const nome = perfil?.['Nome Apresentação'] || 'Lari';

  return (
    <main className="min-h-screen">
      <Nav nome={nome} />

      <div className="max-w-3xl mx-auto px-5 py-12">
        <h1 className="font-serif text-4xl font-bold text-marrom text-center">
          Meu Diário
        </h1>
        <p className="text-center text-marrom/60 mt-3 max-w-md mx-auto">
          Meu cantinho onde compartilho mais do que cabe em um stories ✨
        </p>

        {(posts as any[]).length === 0 ? (
          <p className="text-center text-marrom/40 italic py-20">
            Em breve, posts por aqui. Volta logo! 🤍
          </p>
        ) : (
          <div className="mt-12 space-y-8">
            {(posts as any[]).map((post) => {
              const foto = getImageUrl(post['Foto Capa']);
              return (
                <Link
                  key={post.id}
                  href={`/diario/${post['Slug'] || post.id}`}
                  className="block group"
                >
                  <article className="bg-white border border-bege rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-[16/9] bg-bege">
                      {foto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={foto}
                          alt={post['Título']}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      ) : (
                        <Placeholder className="w-full h-full" label="Post" />
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-marrom/50">
                        {post['Categoria Post'] && (
                          <span className="bg-bege-fundo px-2.5 py-1 rounded-full">
                            {post['Categoria Post']}
                          </span>
                        )}
                        <span>{formatarData(post['Data Publicação'])}</span>
                        {post['Tempo Leitura (min)'] && (
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {post['Tempo Leitura (min)']} min
                          </span>
                        )}
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-marrom mt-3 group-hover:text-marrom-claro">
                        {post['Título']}
                      </h2>
                      {post['Subtítulo'] && (
                        <p className="text-marrom/70 mt-1">{post['Subtítulo']}</p>
                      )}
                      {post['Resumo'] && (
                        <p className="text-marrom/60 mt-3 line-clamp-2">
                          {post['Resumo']}
                        </p>
                      )}
                      <span className="inline-block text-sm font-semibold text-marrom mt-4 group-hover:underline">
                        Ler mais →
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA newsletter (placeholder MVP) */}
        <div className="mt-16 bg-bege-fundo border border-bege rounded-3xl p-8 text-center">
          <h3 className="font-serif text-xl font-bold text-marrom">
            Quer receber por email?
          </h3>
          <p className="text-sm text-marrom/60 mt-2">
            Em breve você vai poder assinar e receber meus posts direto na sua caixa de entrada. 🤍
          </p>
        </div>
      </div>

      <Footer perfil={perfil} />
    </main>
  );
}
