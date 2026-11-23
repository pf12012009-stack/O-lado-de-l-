import { useId } from 'react';
import type { Fotografia } from '../data/tipos';
import { IconeTexto } from './Icones';

/** Descrição escrita da fotografia. Recurso independente da audiodescrição. */
export function DescricaoTextual({ foto, posicao }: { foto: Fotografia; posicao: string }) {
  const id = useId();
  return (
    <section aria-labelledby={id} className="rounded-2xl border-2 border-rio/30 bg-rio-claro/50 p-5">
      <h3 id={id} className="flex items-center gap-2 text-lg font-bold text-rio">
        <IconeTexto /> Ler a descrição
      </h3>
      <p className="mt-1 text-sm text-tinta-suave">
        Descrição textual da {posicao}: {foto.titulo}
      </p>
      {foto.descricaoTextual?.length ? (
        <div className="mt-3 space-y-3 texto-corrido">
          {foto.descricaoTextual.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      ) : (
        <p className="mt-3 text-tinta-suave">
          A descrição textual desta fotografia está em preparação e será publicada aqui.
        </p>
      )}
      {foto.credito && <p className="mt-3 text-sm text-tinta-suave">Fotografia: {foto.credito}</p>}
    </section>
  );
}
