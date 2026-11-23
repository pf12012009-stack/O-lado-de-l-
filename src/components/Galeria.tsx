import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import type { Fotografia } from '../data/tipos';
import { DescricaoTextual } from './DescricaoTextual';
import { IconeSetaDireita, IconeSetaEsquerda } from './Icones';
import { Imagem } from './Imagem';
import { PlayerAudiodescricao } from './PlayerAudiodescricao';

interface Props {
  fotografias: Fotografia[];
  nomeLugar: string;
}

function indiceInicial(fotos: Fotografia[]): number {
  if (typeof window === 'undefined') return 0;
  const id = new URLSearchParams(window.location.search).get('foto');
  const i = fotos.findIndex((f) => f.id === id);
  return i >= 0 ? i : 0;
}

/**
 * Galeria: imagem principal em destaque, miniaturas e, para a fotografia escolhida,
 * a descrição textual e a audiodescrição lado a lado, como recursos separados.
 */
export function Galeria({ fotografias, nomeLugar }: Props) {
  const [indice, setIndice] = useState(0);
  const [anuncio, setAnuncio] = useState('');
  const miniaturas = useRef<(HTMLButtonElement | null)[]>([]);
  const inicioToque = useRef<number | null>(null);
  const total = fotografias.length;
  const foto = fotografias[indice];

  // Restaura a fotografia indicada no endereço (?foto=foto-03) depois da hidratação.
  useEffect(() => setIndice(indiceInicial(fotografias)), [fotografias]);

  if (!total || !foto) {
    return <p className="text-tinta-suave">As fotografias deste lugar serão publicadas em breve.</p>;
  }

  const rotulo = (i: number) => `fotografia ${i + 1} de ${total}`;

  const ir = (novo: number, focarMiniatura = false) => {
    const i = (novo + total) % total;
    setIndice(i);
    setAnuncio(`Mostrando ${rotulo(i)}: ${fotografias[i].titulo}`);
    const url = new URL(window.location.href);
    url.searchParams.set('foto', fotografias[i].id);
    window.history.replaceState(window.history.state, '', url);
    if (focarMiniatura) miniaturas.current[i]?.focus();
  };

  const teclasMiniaturas = (e: KeyboardEvent) => {
    const mapa: Record<string, number> = { ArrowRight: indice + 1, ArrowLeft: indice - 1, Home: 0, End: total - 1 };
    if (e.key in mapa) {
      e.preventDefault();
      ir(mapa[e.key], true);
    }
  };

  const fimToque = (e: PointerEvent) => {
    if (inicioToque.current === null) return;
    const dx = e.clientX - inicioToque.current;
    inicioToque.current = null;
    if (Math.abs(dx) > 50) ir(indice + (dx < 0 ? 1 : -1));
  };

  return (
    <section aria-labelledby="titulo-galeria" className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="titulo-galeria" className="text-2xl font-bold sm:text-3xl">Fotografias</h2>
        <p className="text-sm text-tinta-suave" id="instrucao-galeria">
          Escolha uma miniatura ou use as setas. No celular, deslize a foto para os lados.
        </p>
      </div>

      <figure className="overflow-hidden rounded-3xl bg-superficie shadow-[var(--sombra)]">
        <div
          className="relative touch-pan-y select-none"
          onPointerDown={(e) => (inicioToque.current = e.clientX)}
          onPointerUp={fimToque}
          onPointerCancel={() => (inicioToque.current = null)}
        >
          <div key={foto.id} className="animate-[aparecer_250ms_ease-out]">
            <Imagem foto={foto} prioridade ajuste="inteira" className="h-[min(66.6vw,72vh)] min-h-56 w-full" tamanhos="(min-width: 72rem) 72rem, 100vw" />
          </div>
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => ir(indice - 1)}
                className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-superficie/90 text-tinta shadow-[var(--sombra)] hover:bg-superficie"
                aria-label={`Fotografia anterior, ${rotulo((indice - 1 + total) % total)}`}
              >
                <IconeSetaEsquerda width={26} height={26} />
              </button>
              <button
                type="button"
                onClick={() => ir(indice + 1)}
                className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-superficie/90 text-tinta shadow-[var(--sombra)] hover:bg-superficie"
                aria-label={`Próxima fotografia, ${rotulo((indice + 1) % total)}`}
              >
                <IconeSetaDireita width={26} height={26} />
              </button>
            </>
          )}
        </div>
        <figcaption className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4">
          <span className="font-display text-lg font-bold">{foto.titulo}</span>
          <span className="text-sm text-tinta-suave">
            {indice + 1} de {total} <span className="sr-only">fotografias de {nomeLugar}</span>
          </span>
        </figcaption>
      </figure>

      <div aria-live="polite" className="sr-only">{anuncio}</div>

      {total > 1 && (
        <ul
          className="flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]"
          aria-label={`Miniaturas das fotografias de ${nomeLugar}`}
          aria-describedby="instrucao-galeria"
        >
          {fotografias.map((f, i) => (
            <li key={f.id} className="snap-start">
              <button
                ref={(el) => {
                  miniaturas.current[i] = el;
                }}
                type="button"
                onClick={() => ir(i)}
                onKeyDown={teclasMiniaturas}
                tabIndex={i === indice ? 0 : -1}
                aria-current={i === indice ? 'true' : undefined}
                aria-label={`Mostrar ${rotulo(i)}: ${f.titulo}`}
                className={`block w-24 overflow-hidden rounded-xl border-[3px] transition-[border-color] sm:w-28 ${
                  i === indice ? 'border-terra' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <Imagem foto={f} decorativa compacto className="aspect-square w-full" tamanhos="7rem" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="grid gap-4 md:grid-cols-2" key={`recursos-${foto.id}`}>
        <DescricaoTextual foto={foto} posicao={rotulo(indice)} />
        <PlayerAudiodescricao foto={foto} posicao={rotulo(indice)} />
      </div>
    </section>
  );
}
