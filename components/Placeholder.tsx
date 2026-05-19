export default function Placeholder({
  label = '',
  className = '',
  rounded = 'rounded-2xl',
}: {
  label?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-bege-claro to-bege text-marrom/40 ${rounded} ${className}`}
    >
      <div className="text-center px-4">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          className="mx-auto mb-2 opacity-50"
        >
          <path
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {label && <p className="text-xs font-medium font-sans">{label}</p>}
      </div>
    </div>
  );
}
