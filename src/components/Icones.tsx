import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  'aria-hidden': true, focusable: false, ...p,
});

export const IconeTexto = (p: P) => (
  <svg {...base(p)}><path d="M4 6h16M4 11h16M4 16h10" /></svg>
);
export const IconeFone = (p: P) => (
  <svg {...base(p)}><path d="M4 15v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></svg>
);
export const IconePlay = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
);
export const IconePausa = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
);
export const IconeVoltar10 = (p: P) => (
  <svg {...base(p)}><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v4h4" /><text x="12" y="15.5" fontSize="7" textAnchor="middle" fill="currentColor" stroke="none">10</text></svg>
);
export const IconeAvancar10 = (p: P) => (
  <svg {...base(p)}><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v4h-4" /><text x="12" y="15.5" fontSize="7" textAnchor="middle" fill="currentColor" stroke="none">10</text></svg>
);
export const IconeSetaEsquerda = (p: P) => (
  <svg {...base(p)}><path d="m15 18-6-6 6-6" /></svg>
);
export const IconeSetaDireita = (p: P) => (
  <svg {...base(p)}><path d="m9 18 6-6-6-6" /></svg>
);
export const IconeMapa = (p: P) => (
  <svg {...base(p)}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const IconeWhatsapp = (p: P) => (
  <svg {...base(p)}><path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12Z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2L9 9.5Z" /></svg>
);
export const IconeMenu = (p: P) => (
  <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const IconeFechar = (p: P) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const IconeImagem = (p: P) => (
  <svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 16-5-5-9 9" /></svg>
);
export const IconeExterno = (p: P) => (
  <svg {...base(p)} width={16} height={16}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
);
export const IconeIgreja = (p: P) => (
  <svg {...base(p)}><path d="M12 2v4M10 4h4" /><path d="M6 21V11l6-4 6 4v10" /><path d="M3 21h18" /><path d="M10 21v-4a2 2 0 0 1 4 0v4" /></svg>
);
export const IconeBicicleta = (p: P) => (
  <svg {...base(p)}><circle cx="5.5" cy="17" r="3.5" /><circle cx="18.5" cy="17" r="3.5" /><path d="M5.5 17 9 9h6l3.5 8M9 9 12 17h-1M14 5h2l1 4" /></svg>
);
export const IconeFolha = (p: P) => (
  <svg {...base(p)}><path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16Z" /><path d="M4 20 14 10" /></svg>
);
export const IconeSeta = (p: P) => (
  <svg {...base(p)} className={`seta ${p.className ?? ''}`}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconeExpandir = (p: P) => (
  <svg {...base(p)}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
);
export const IconeCamera = (p: P) => (
  <svg {...base(p)}><path d="M4 8h3l2-3h6l2 3h3v11H4Z" /><circle cx="12" cy="13" r="3.5" /></svg>
);
export const IconeLoja = (p: P) => (
  <svg {...base(p)}><path d="M3 9l2-5h14l2 5M4 9v11h16V9M3 9h18M9 20v-6h6v6" /></svg>
);
