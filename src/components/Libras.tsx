import { useId } from 'react';
import type { Atracao } from '../data/tipos';

/** Conteúdo em Libras: vídeo de intérprete humano. Nunca avatar ou tradução automática. */
export function SecaoLibras({ atracao }: { atracao: Atracao }) {
  const id = useId();
  const l = atracao.libras;
  return (
    <section aria-labelledby={id} className="rounded-2xl border-2 border-linha bg-superficie p-5 sm:p-6">
      <h2 id={id} className="text-2xl font-semibold">Conteúdo em Libras</h2>
      {l ? (
        <div className="mt-4 space-y-2">
          <video controls preload="none" className="w-full max-w-2xl rounded-xl" aria-describedby={`${id}-d`}>
            <source src={l.video} />
            {l.legendas && <track kind="captions" src={l.legendas} srcLang="pt-BR" label="Português" default />}
          </video>
          <p id={`${id}-d`} className="text-sm text-tinta-suave">
            Apresentação de {atracao.nome} em Libras{l.interprete ? `, com ${l.interprete}` : ''}.
          </p>
        </div>
      ) : (
        <p className="mt-2 text-tinta-suave">
          A tradução em Libras feita por intérprete está em preparação. Nenhum avatar ou tradução automática é apresentado como se fosse Libras.
        </p>
      )}
    </section>
  );
}
