/** Marca: o horizonte com o rio no meio, separando o lado de cá do lado de lá. */
export function SimboloMarca({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <circle cx="32" cy="18" r="8" fill="var(--sol)" />
      <path d="M2 30c8-5 14-5 22 0s14 5 22 0v16H2Z" fill="var(--rio)" />
      <path d="M2 36c8-4 14-4 22 0s14 4 22 0" fill="none" stroke="var(--papel)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Marca() {
  return (
    <span className="flex items-center gap-2.5">
      <SimboloMarca className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-tight text-tinta">O Lado de Lá</span>
        <span className="text-sm text-tinta-suave">Turismo</span>
      </span>
    </span>
  );
}
