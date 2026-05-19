import type { Metadata } from 'next';
import './globals.css';
import { getPerfil } from '@/lib/airtable';

export async function generateMetadata(): Promise<Metadata> {
  const perfil = await getPerfil();
  const nome = perfil?.['Nome Apresentação'] || 'Larissa Linhares';
  const tagline = perfil?.['Tagline'] || 'Maquiadora cacheada · São Paulo';
  const bio = perfil?.['Bio Curta'] || 'Cachos sem mistério, make sem sufoco e a vida real entre os dois.';

  return {
    title: `${nome} — ${tagline}`,
    description: bio,
    keywords: ['Larissa Linhares', 'maquiadora cacheada', 'cachos', 'maquiagem', 'São Paulo', 'beleza'],
    openGraph: {
      title: `${nome} — ${tagline}`,
      description: bio,
      type: 'website',
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${nome} — ${tagline}`,
      description: bio,
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
