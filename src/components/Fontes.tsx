import type { Contato, Fato, Fonte } from '../data/tipos';
import { IconeExterno } from './Icones';

export function LinkFonte({ fonte, prefixo = 'Fonte: ' }: { fonte: Fonte; prefixo?: string }) {
  if (!fonte.url) return <span className="text-sm text-tinta-suave">{prefixo}{fonte.titulo}</span>;
  return (
    <a href={fonte.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm">
      {prefixo}{fonte.titulo} <IconeExterno /> <span className="sr-only">(abre em nova aba)</span>
    </a>
  );
}

/** Lista de fatos, cada um com a fonte que o confirma. */
export function ListaDeFatos({ fatos }: { fatos: Fato[] }) {
  return (
    <ul className="space-y-4">
      {fatos.map((f) => (
        <li key={f.texto} className="border-l-4 border-sol pl-4">
          <p>{f.texto}</p>
          <LinkFonte fonte={f.fonte} />
        </li>
      ))}
    </ul>
  );
}

/** Contatos com o valor sempre visível e selecionável (o link é só um atalho). */
export function ListaDeContatos({ contatos }: { contatos: Contato[] }) {
  return (
    <dl className="grid gap-3">
      {contatos.map((c) => (
        <div key={c.rotulo + c.valor} className="min-w-0">
          <dt className="text-sm font-bold text-tinta-suave">{c.rotulo}</dt>
          <dd className="break-words text-lg">
            {c.href ? (
              <a
                href={c.href}
                {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="font-bold"
              >
                {c.valor}
                {c.href.startsWith('http') && <span className="sr-only"> (abre em nova aba)</span>}
              </a>
            ) : (
              c.valor
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
