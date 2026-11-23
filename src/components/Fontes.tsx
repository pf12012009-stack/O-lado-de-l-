import type { Fato } from '../data/tipos';
import { IconeExterno } from './Icones';

/** Lista de fatos, cada um com o link da fonte que o confirma. */
export function ListaDeFatos({ fatos }: { fatos: Fato[] }) {
  return (
    <ul className="space-y-3">
      {fatos.map((f) => (
        <li key={f.texto} className="border-l-4 border-sol pl-4">
          <p>{f.texto}</p>
          <a href={f.fonte.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm">
            Fonte: {f.fonte.titulo} <IconeExterno /> <span className="sr-only">(abre em nova aba)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
