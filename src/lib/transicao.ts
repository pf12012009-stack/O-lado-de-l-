import { flushSync } from 'react-dom';
import { useBrowserLocation } from 'wouter/use-browser-location';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Navegar = (para: any, opcoes?: any) => void;

function movimentoReduzido() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/** Envolve uma navegação numa transição de página suave, quando o navegador suporta. */
export function comTransicao<N extends Navegar>(navegar: N): N {
  return ((para: Parameters<N>[0], opcoes?: Parameters<N>[1]) => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (!doc.startViewTransition || movimentoReduzido()) return navegar(para, opcoes);
    doc.startViewTransition(() => flushSync(() => navegar(para, opcoes)));
  }) as N;
}

/** Hook de localização do navegador com transição entre páginas. */
export function useLocalizacaoComTransicao(): ReturnType<typeof useBrowserLocation> {
  const [local, navegar] = useBrowserLocation();
  return [local, comTransicao(navegar)];
}
