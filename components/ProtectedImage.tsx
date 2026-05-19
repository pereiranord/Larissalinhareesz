'use client';

// =====================================================
// IMAGEM PROTEGIDA
// Dificulta ao máximo o salvamento pelo navegador:
// - bloqueia menu de contexto (botão direito / long-press)
// - bloqueia arrastar a imagem
// - camada transparente por cima (impede "salvar imagem")
// - desabilita seleção
// NOTA: nenhum método bloqueia 100% (print sempre funciona),
// mas isso barra o usuário comum, que é a grande maioria.
// =====================================================

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function ProtectedImage({ src, alt, className = '' }: Props) {
  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        className="w-full h-full object-cover pointer-events-none"
        style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
      />
      {/* camada de proteção transparente por cima */}
      <div
        className="absolute inset-0 z-10"
        onContextMenu={(e) => e.preventDefault()}
        style={{ background: 'transparent' }}
        aria-hidden="true"
      />
    </div>
  );
}
