// =====================================================
// ÍCONES SVG ESTILIZADOS
// Desenhos próprios que remetem a cada rede social
// sem copiar logos oficiais (seguro p/ direitos autorais).
// Estilo de traço consistente, elegante e profissional.
// =====================================================

type IconProps = { size?: number; className?: string };

export function InstagramIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M14 3v10.2a3.4 3.4 0 1 1-3.4-3.4c.36 0 .7.05 1 .15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 3c.5 2.4 2.2 4 4.5 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PinterestIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9.3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.6 18.5L12 10.2m0 0c-.4-1.4.3-2.7 1.6-3 1.3-.3 2.5.5 2.5 2 0 1.8-1 3.4-2.6 3.4-.9 0-1.6-.6-1.5-1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function YouTubeIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.2 9.2l4.6 2.8-4.6 2.8V9.2z" fill="currentColor" />
    </svg>
  );
}

export function MailIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 6.5l7.4 5.3a2 2 0 0 0 2.2 0l7.4-5.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WhatsAppIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3.5 20.5l1.3-4.4A8 8 0 1 1 8 19.3l-4.5 1.2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.3c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .6.5l.7 1.6c0 .2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6.5.9 1.3 1.6 2.2 2 .3.2.5 0 .6-.1l.5-.6c.2-.2.3-.1.5-.1l1.5.8c.2.1.4.2.4.3.1.5-.1 1.3-.4 1.6-.4.4-1 .7-1.7.6-1.8-.2-3.4-1.1-4.7-2.5C9.3 13 8.6 11.7 8.5 10.3c0-.7.2-1.4.5-2z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SparklesIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3l1.6 4.6L18 9.2l-4.4 1.6L12 15l-1.6-4.2L6 9.2l4.4-1.6L12 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M18 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" fill="currentColor" />
    </svg>
  );
}

export function HeartIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 20.5l-1.4-1.3C5.4 14.5 2.5 11.9 2.5 8.5 2.5 6 4.5 4 7 4c1.7 0 3.3.9 4 2.3C11.7 4.9 13.3 4 15 4c2.5 0 4.5 2 4.5 4.5 0 3.4-2.9 6-8.1 10.7L12 20.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BookIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 4.5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4v-13z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M20 4.5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7v-13z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FileIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 2.5h8l5 5v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-18a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 2.5v5h5M8.5 13h7M8.5 16.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function BagIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 7.5h14l-1 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1l-1-13z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8.5 7.5V6a3.5 3.5 0 0 1 7 0v1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ExternalIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M14 4h6v6M20 4l-9 9M18 13.5V19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V8a1.5 1.5 0 0 1 1.5-1.5H11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Mapa nome → componente (usado nos botões dinâmicos do Airtable)
export const ICON_MAP: Record<string, (p: IconProps) => JSX.Element> = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  pinterest: PinterestIcon,
  youtube: YouTubeIcon,
  mail: MailIcon,
  email: MailIcon,
  whatsapp: WhatsAppIcon,
  sparkles: SparklesIcon,
  heart: HeartIcon,
  book: BookIcon,
  diary: BookIcon,
  file: FileIcon,
  midiakit: FileIcon,
  bag: BagIcon,
  shopping: BagIcon,
  link: ExternalIcon,
};

export function getIconComponent(name: string = '') {
  return ICON_MAP[name.toLowerCase().trim()] || ExternalIcon;
}
