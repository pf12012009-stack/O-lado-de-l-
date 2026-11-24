import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import type { Fotografia } from '../data/tipos';
import { DescricaoTextual } from './DescricaoTextual';
import { IconeExpandir, IconeFechar, IconeSetaDireita, IconeSetaEsquerda } from './Icones';
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

const botaoPalco =
  'grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-[#0b3d2e]/60 text-[#fbf4e8] backdrop-blur-md transition hover:bg-[#0b3d2e]/85 hover:scale-105';

/**
 * Galeria: palco com a foto em destaque, miniaturas e, para a fotografia escolhida,
 * a descrição textual e a audiodescrição lado a lado, como recursos separados.
 */
export function Galeria({ fotografias, nomeLugar }: Props) {
  const [indice, setIndice] = useState(0);
  const [anuncio, setAnuncio] = useState('');
  const miniaturas = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogo = useRef<HTMLDialogElement>(null);
  const inicioToque = useRef<number | null>(null);
  const total = fotografias.length;
  const foto = fotografias[indice];

  // Restaura a fotografia indicada no endereço (?foto=…) depois da hidratação.
  useEffect(() => setIndice(indiceInicial(fotografias)), [fotografias]);

  if (!total || !foto) {
    return (
      <section aria-labelledby="titulo-galeria" className="reservado grid min-h-72 place-items-center rounded-[2rem] p-8 text-center">
        <div>
          <h2 id="titulo-galeria" className="text-3xl font-semibold">Fotografias</h2>
          <p className="mt-2 text-tinta-suave">As fotografias deste lugar serão publicadas em breve, depois de revisadas.</p>
        </div>
      </section>
    );
  }

  const rotulo = (i: number) => `fotografia ${i + 1} de ${total}`;

  const ir = (novo: number, focarMiniatura = false) => {
    const i = (novo + total) % total;
    setIndice(i);
    setAnuncio(`Mostrando ${rotulo(i)}: ${fotografias[i].titulo}`);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('foto', fotografias[i].id);
      window.history.replaceState(window.history.state, '', url);
    } catch {
      /* endereço não pode ser alterado neste ambiente: a galeria segue funcionando */
    }
    if (focarMiniatura) miniaturas.current[i]?.focus();
    miniaturas.current[i]?.scrollIntoView?.({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  };

  const teclasMiniaturas = (e: KeyboardEvent) => {
    const mapa: Record<string, number> = { ArrowRight: indice + 1, ArrowLeft: indice - 1, Home: 0, End: total - 1 };
    if (e.key in mapa) {
      e.preventDefault();
      ir(mapa[e.key], true);
    }
  };

  const teclasTelaCheia = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') ir(indice + 1);
    if (e.key === 'ArrowLeft') ir(indice - 1);
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
        <div>
          <p className="rotulo">Galeria</p>
          <h2 id="titulo-galeria" className="text-3xl font-semibold sm:text-4xl">Fotografias de {nomeLugar}</h2>
        </div>
        <p className="max-w-sm text-sm text-tinta-suave" id="instrucao-galeria">
          Escolha uma miniatura ou use as setas. No celular, deslize a foto para os lados.
        </p>
      </div>

      <figure className="overflow-hidden rounded-[2rem] bg-[#0b2a20] shadow-[var(--sombra-alta)]">
        <div
          className="relative isolate touch-pan-y select-none"
          onPointerDown={(e) => (inicioToque.current = e.clientX)}
          onPointerUp={fimToque}
          onPointerCancel={() => (inicioToque.current = null)}
        >
          {/* Reflexo desfocado da própria foto, como luz ambiente */}
          {foto.arquivo && (
            <img
              src={foto.miniatura ?? foto.arquivo}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 -z-10 h-full w-full scale-125 object-cover opacity-55 blur-2xl"
            />
          )}
          <div key={foto.id} className="animate-[aparecer_450ms_var(--ease-suave)]">
            <Imagem
              foto={foto}
              ajuste="inteira"
              className="h-[min(110vw,72vh)] min-h-64 w-full sm:h-[min(66vw,74vh)]"
              tamanhos="(min-width: 76rem) 76rem, (min-width: 40rem) 100vw, 380px"
            />
          </div>
          <div className="pointer-events-none absolute inset-x-3 top-3 flex justify-between">
            <span className="pointer-events-auto rounded-full bg-[#0b3d2e]/70 px-3 py-1.5 text-sm font-bold text-[#fbf4e8] backdrop-blur-md tabular-nums">
              {indice + 1} / {total}
            </span>
            {foto.arquivo && (
              <button
                type="button"
                className={`${botaoPalco} pointer-events-auto`}
                onClick={() => dialogo.current?.showModal()}
                aria-label={`Ver ${rotulo(indice)} em tela cheia`}
              >
                <IconeExpandir />
              </button>
            )}
          </div>
          {total > 1 && (
            <>
              <button type="button" onClick={() => ir(indice - 1)} className={`${botaoPalco} absolute left-3 top-1/2 -translate-y-1/2`}
                aria-label={`Fotografia anterior, ${rotulo((indice - 1 + total) % total)}`}>
                <IconeSetaEsquerda width={26} height={26} />
              </button>
              <button type="button" onClick={() => ir(indice + 1)} className={`${botaoPalco} absolute right-3 top-1/2 -translate-y-1/2`}
                aria-label={`Próxima fotografia, ${rotulo((indice + 1) % total)}`}>
                <IconeSetaDireita width={26} height={26} />
              </button>
            </>
          )}
        </div>
        <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-t border-white/10 px-5 py-4 text-[#fbf4e8] sm:px-7">
          <span className="font-display text-xl font-semibold">{foto.titulo}</span>
          <span className="sr-only">{rotulo(indice)} de {nomeLugar}</span>
        </figcaption>
      </figure>

      <div aria-live="polite" className="sr-only">{anuncio}</div>

      {total > 1 && (
        <ul
          className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-3 pt-1 [scrollbar-width:thin]"
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
                className={`block w-24 overflow-hidden rounded-2xl ring-offset-2 ring-offset-[var(--papel)] transition duration-300 sm:w-28 ${
                  i === indice ? 'scale-105 ring-4 ring-[#f4b43a]' : 'opacity-75 hover:-translate-y-1 hover:opacity-100'
                }`}
              >
                <Imagem foto={f} decorativa compacto so_miniatura className="aspect-square w-full" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="grid items-start gap-5 lg:grid-cols-2" key={`recursos-${foto.id}`}>
        <DescricaoTextual foto={foto} posicao={rotulo(indice)} />
        <PlayerAudiodescricao foto={foto} posicao={rotulo(indice)} />
      </div>

      {foto.arquivo && (
        <dialog
          ref={dialogo}
          aria-label={`${foto.titulo}, ${rotulo(indice)}, em tela cheia`}
          onKeyDown={teclasTelaCheia}
          className="m-0 h-full max-h-none w-full max-w-none bg-[#06140f]/95 p-0 text-[#fbf4e8] backdrop:bg-black/80"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-3 p-3 sm:p-4">
              <p className="font-display text-lg font-semibold">
                {foto.titulo} <span className="text-sm font-normal opacity-80">({indice + 1} de {total})</span>
              </p>
              <button type="button" className={botaoPalco} onClick={() => dialogo.current?.close()} aria-label="Fechar tela cheia" autoFocus>
                <IconeFechar />
              </button>
            </div>
            <div className="relative flex-1">
              <img src={foto.arquivo} alt={foto.textoAlternativo ?? foto.titulo} className="absolute inset-0 h-full w-full object-contain" />
              {total > 1 && (
                <>
                  <button type="button" onClick={() => ir(indice - 1)} className={`${botaoPalco} absolute left-3 top-1/2 -translate-y-1/2`} aria-label="Fotografia anterior">
                    <IconeSetaEsquerda width={26} height={26} />
                  </button>
                  <button type="button" onClick={() => ir(indice + 1)} className={`${botaoPalco} absolute right-3 top-1/2 -translate-y-1/2`} aria-label="Próxima fotografia">
                    <IconeSetaDireita width={26} height={26} />
                  </button>
                </>
              )}
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}
