import { useId, useState } from 'react';
import type { Fotografia } from '../data/tipos';
import { IconeTexto } from './Icones';

/** Acima deste tamanho, a descrição começa recolhida no celular para o player ficar à vista. */
const LIMITE_RECOLHER = 600;

/** Descrição escrita da fotografia. Recurso independente da audiodescrição. */
export function DescricaoTextual({ foto, posicao }: { foto: Fotografia; posicao: string }) {
  const id = useId();
  const paragrafos = foto.descricaoTextual ?? [];
  const longa = paragrafos.join(' ').length > LIMITE_RECOLHER;
  const [aberta, setAberta] = useState(false);

  return (
    <section aria-labelledby={id} className="rounded-2xl border-2 border-rio/25 bg-rio-claro/60 p-5">
      <h3 id={id} className="flex items-center gap-2 text-xl font-semibold text-rio">
        <IconeTexto /> Ler a descrição
      </h3>
      <p className="mt-1 text-sm text-tinta-suave">
        Descrição textual da {posicao}: {foto.titulo}
      </p>
      {paragrafos.length ? (
        <>
          <div
            id={`${id}-texto`}
            className={`mt-3 space-y-3 texto-corrido ${longa && !aberta ? 'max-h-48 overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent)]' : ''}`}
          >
            {paragrafos.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {longa && (
            <button
              type="button"
              className="botao botao-contorno mt-3 text-sm"
              aria-expanded={aberta}
              aria-controls={`${id}-texto`}
              onClick={() => setAberta((a) => !a)}
            >
              {aberta ? 'Mostrar menos' : 'Ler a descrição completa'}
            </button>
          )}
        </>
      ) : (
        <p className="mt-3 text-tinta-suave">
          A descrição textual desta fotografia está em preparação e será publicada aqui.
        </p>
      )}
      {foto.credito && <p className="mt-3 text-sm text-tinta-suave">Fotografia: {foto.credito}</p>}
    </section>
  );
}
