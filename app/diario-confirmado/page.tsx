import Link from 'next/link';

export const metadata = {
  title: 'Inscrição confirmada — Larissa Linhares',
  robots: { index: false },
};

export default function DiarioConfirmado({
  searchParams,
}: {
  searchParams: { erro?: string };
}) {
  const erro = searchParams?.erro === '1';

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md anim-fade-up">
        {erro ? (
          <>
            <div className="w-16 h-16 mx-auto rounded-full bg-bege-fundo flex items-center justify-center">
              <span className="text-3xl">😕</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-marrom mt-6">
              Ops, esse link não funcionou
            </h1>
            <p className="text-marrom/70 mt-3 leading-relaxed">
              O link pode ter expirado ou já foi usado. Tenta se inscrever de novo
              pela página inicial, tá bom?
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto rounded-full bg-marrom flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#FAF6F1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="font-serif text-4xl font-bold text-marrom mt-6">
              Tá tudo pronto! 🤍
            </h1>
            <p className="text-marrom/70 mt-3 leading-relaxed">
              Sua inscrição foi confirmada. Agora você vai receber meu diário
              direto no seu email. Vou te mandar coisas boas, prometo.
            </p>
          </>
        )}

        <Link
          href="/"
          className="btn-premium inline-block mt-8 bg-marrom text-creme font-semibold px-8 py-3.5 rounded-full hover:bg-marrom-escuro transition-colors"
        >
          Voltar pro início
        </Link>
      </div>
    </main>
  );
}
