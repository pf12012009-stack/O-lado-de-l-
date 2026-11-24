import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { IconeMapa, IconePausa, IconePlay, IconeSeta } from './Icones';

export interface Slide {
  imagem: string;
  srcset?: string;
  alt: string;
  legenda: string;
  href: string;
  posicao?: string;
}

const INTERVALO = 7000;

/**
 * Banner de abertura com fotografias que se alternam (zoom lento + troca suave).
 * Tem botão de pausa e não troca sozinho para quem prefere movimento reduzido.
 */
export function BannerAbertura({ slides, titulo, texto }: { slides: Slide[]; titulo: string; texto: string }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  // As demais fotos só são baixadas depois que a página terminou de carregar (não disputam com a primeira).
  const [todas, setTodas] = useState(false);
  useEffect(() => {
    let t = 0;
    const liberar = () => (t = window.setTimeout(() => setTodas(true), 1200));
    if (document.readyState === 'complete') liberar();
    else window.addEventListener('load', liberar, { once: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('load', liberar);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) setPausado(true);
  }, []);
  useEffect(() => {
    if (pausado || !todas) return;
    const t = window.setInterval(() => setAtual((a) => (a + 1) % slides.length), INTERVALO);
    return () => window.clearInterval(t);
  }, [pausado, todas, slides.length]);

  const s = slides[atual];
  return (
    <section aria-labelledby="titulo-inicio" className="relative isolate overflow-hidden bg-[#0b3d2e] text-[#fbf4e8]">
      <div className="absolute inset-0 -z-10" data-movimento={pausado ? 'pausado' : undefined}>
        {slides.map((sl, i) => (i === 0 || todas) && (
          <img
            key={sl.imagem}
            src={sl.imagem}
            srcSet={sl.srcset}
            sizes="(min-width: 64rem) 100vw, 240px"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority={i === 0 ? 'high' : 'low'}
            decoding="async"
            style={{ objectPosition: sl.posicao ?? 'center' }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${i === atual ? 'opacity-100' : 'opacity-0'} ${
              i === atual && !pausado ? 'animate-[zoom-lento_9s_ease-out_both]' : 'scale-[1.04]'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(8_30_22/0.92)_0%,rgb(8_30_22/0.7)_45%,rgb(8_30_22/0.15)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgb(8_30_22/0.85),transparent)]" />
      </div>

      <div className="conteudo flex min-h-[78svh] max-h-[900px] flex-col justify-end gap-10 pb-28 pt-20 sm:min-h-[86svh] sm:pb-32">
        <div className="entrada max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-bold backdrop-blur-md">
            <IconeMapa width={16} height={16} /> Alto Piquiri, Paraná
          </p>
          <h1 id="titulo-inicio" className="mt-5 text-5xl font-semibold leading-[1.02] drop-shadow-[0_2px_18px_rgb(0_0_0/0.35)] sm:text-7xl lg:text-8xl">
            {titulo}
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg text-[#fbf4e8]/95 sm:text-xl">{texto}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/pontos-turisticos" className="botao botao-ouro text-lg">
              Explorar os lugares <IconeSeta />
            </Link>
            <a href="#como-conhecer" className="botao botao-vidro text-lg">Como conhecer cada lugar</a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={s.href}
            className="group inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 text-sm font-bold text-[#fbf4e8] no-underline backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-[#f4b43a]" aria-hidden="true" />
            Na foto: {s.legenda}
            <IconeSeta width={16} height={16} />
          </Link>
          <div className="flex items-center gap-2">
            <ul className="flex gap-1" aria-label="Fotografias do banner">
              {slides.map((sl, i) => (
                <li key={sl.imagem}>
                  <button
                    type="button"
                    onClick={() => setAtual(i)}
                    aria-label={`Mostrar foto ${i + 1}: ${sl.legenda}`}
                    aria-current={i === atual ? 'true' : undefined}
                    className="grid h-11 w-8 place-items-center"
                  >
                    <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === atual ? 'w-7 bg-[#f4b43a]' : 'w-3 bg-white/60'}`} />
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setPausado((p) => !p)}
              aria-label={pausado ? 'Retomar a troca de fotos' : 'Pausar a troca de fotos'}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/30 backdrop-blur-md"
            >
              {pausado ? <IconePlay width={16} height={16} /> : <IconePausa width={16} height={16} />}
            </button>
          </div>
        </div>
      </div>
      {/* Linha do horizonte: o rio que separa o lado de cá do lado de lá */}
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-x-0 bottom-[-1px] h-12 w-full sm:h-20" aria-hidden="true" focusable="false">
        <path d="M0 50c180-30 360-30 540-6s360 26 540 2 270-24 360-12v46H0Z" fill="var(--papel)" />
        <path d="M0 50c180-30 360-30 540-6s360 26 540 2 270-24 360-12" fill="none" stroke="#f4b43a" strokeWidth="3" />
      </svg>
    </section>
  );
}
