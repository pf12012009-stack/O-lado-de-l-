import type { ReactNode } from 'react';
import type { Fotografia } from '../data/tipos';
import { srcsetDe } from '../lib/imagens';

/** Topo de página com fotografia de fundo, véu escuro e a linha do horizonte. */
export function TopoFoto({
  foto,
  posicao = 'center',
  children,
  alto = false,
}: {
  foto?: Fotografia;
  posicao?: string;
  children: ReactNode;
  alto?: boolean;
}) {
  return (
    <div className="faixa-marca topografia relative isolate overflow-hidden">
      {foto?.arquivo && (
        <div className="absolute inset-0 -z-10">
          <img
            src={foto.arquivo}
            srcSet={srcsetDe(foto)}
            sizes="(min-width: 64rem) 100vw, 240px"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            style={{ objectPosition: posicao }}
            className="h-full w-full scale-105 animate-[zoom-lento_14s_ease-out_both] object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(8_30_22/0.95)_0%,rgb(8_30_22/0.86)_50%,rgb(8_30_22/0.62)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(0deg,rgb(8_30_22/0.9),transparent)]" />
        </div>
      )}
      <div className={`conteudo entrada pb-20 pt-10 sm:pb-24 ${alto ? 'flex min-h-[62svh] flex-col justify-end sm:min-h-[68svh]' : 'sm:pt-16'}`}>{children}</div>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-[-1px] h-8 w-full sm:h-12" aria-hidden="true" focusable="false">
        <path d="M0 36c180-24 360-24 540-4s360 20 540 0 270-18 360-8v36H0Z" fill="var(--papel)" />
        <path d="M0 36c180-24 360-24 540-4s360 20 540 0 270-18 360-8" fill="none" stroke="#f4b43a" strokeWidth="2.5" />
      </svg>
    </div>
  );
}
