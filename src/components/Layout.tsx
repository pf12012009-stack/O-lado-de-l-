import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { SITE } from '../data/site';
import { IconeFechar, IconeMenu } from './Icones';
import { Marca } from './Marca';
import { Preferencias } from './Preferencias';

const MENU = [
  { href: '/', rotulo: 'Início' },
  { href: '/atracoes', rotulo: 'Pontos turísticos' },
  { href: '/comercio', rotulo: 'Comércio local' },
  { href: '/sobre', rotulo: 'Sobre' },
  { href: '/contato', rotulo: 'Contato' },
];

function ativo(local: string, href: string) {
  return href === '/' ? local === '/' : local === href || local.startsWith(`${href}/`) || (href === '/atracoes' && local.startsWith('/categoria'));
}

function Cabecalho() {
  const [local] = useLocation();
  const [aberto, setAberto] = useState(false);
  const [prefs, setPrefs] = useState(false);
  useEffect(() => setAberto(false), [local]);

  const links = (classe: string) =>
    MENU.map((m) => (
      <li key={m.href}>
        <Link
          href={m.href}
          aria-current={ativo(local, m.href) ? 'page' : undefined}
          className={`${classe} flex min-h-11 items-center rounded-full px-3 font-bold no-underline aria-[current=page]:bg-rio-claro aria-[current=page]:text-rio-forte text-tinta hover:text-rio`}
        >
          {m.rotulo}
        </Link>
      </li>
    ));

  return (
    <header className="border-b border-linha bg-papel/95">
      <div className="conteudo flex min-h-18 items-center justify-between gap-4 py-2">
        <Link href="/" className="no-underline" aria-label={`${SITE.nome}, página inicial`}>
          <Marca />
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">{links('')}</ul>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="botao botao-contorno hidden px-3 text-sm sm:inline-flex"
            aria-expanded={prefs}
            aria-controls="painel-preferencias"
            onClick={() => setPrefs((p) => !p)}
          >
            Acessibilidade
          </button>
          <button
            type="button"
            className="botao botao-contorno px-3 lg:hidden"
            aria-expanded={aberto}
            aria-controls="menu-movel"
            onClick={() => setAberto((a) => !a)}
          >
            {aberto ? <IconeFechar /> : <IconeMenu />} Menu
          </button>
        </div>
      </div>
      <div id="painel-preferencias" hidden={!prefs} className="border-t border-linha bg-superficie py-3">
        <div className="conteudo flex flex-wrap items-center justify-between gap-3">
          <Preferencias />
          <Link href="/acessibilidade" className="text-sm font-bold">Recursos de acessibilidade do site</Link>
        </div>
      </div>
      <nav id="menu-movel" aria-label="Principal" hidden={!aberto} className="border-t border-linha bg-superficie py-3 lg:hidden">
        <ul className="conteudo flex flex-col gap-1">{links('text-lg')}</ul>
        <div className="conteudo mt-3 border-t border-linha pt-3">
          <Preferencias />
        </div>
      </nav>
    </header>
  );
}

function Rodape() {
  return (
    <footer className="rodape mt-24">
      <div className="conteudo grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-display text-2xl font-bold">O Lado de Lá Turismo</p>
          <p className="max-w-md">{SITE.lema}</p>
          <p className="max-w-md text-sm opacity-90">
            Plataforma de turismo virtual e acessível de Alto Piquiri (PR). Não somos agência de viagens: não vendemos passeios nem pacotes.
          </p>
        </div>
        <nav aria-label="Rodapé">
          <ul className="space-y-1">
            {[...MENU, { href: '/acessibilidade', rotulo: 'Acessibilidade' }].map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="inline-flex min-h-11 items-center font-bold">{m.rotulo}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-2 text-sm">
          <p className="font-bold">Como acessar cada lugar</p>
          <p>Cada fotografia tem duas opções: ler a descrição textual ou ouvir a audiodescrição narrada.</p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#conteudo" className="sr-only-focavel fixed left-3 top-3 z-50 rounded-lg bg-rio px-4 py-3 font-bold text-papel">
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo" tabIndex={-1}>{children}</main>
      <Rodape />
    </>
  );
}

/**
 * Envolve cada página: define título e descrição e, ao navegar,
 * move o foco para o título principal para o leitor de tela anunciar a nova página.
 */
export function Pagina({ titulo, descricao, children }: { titulo: string; descricao: string; children: ReactNode }) {
  const primeira = useRef(true);
  useEffect(() => {
    document.title = titulo === SITE.nome ? titulo : `${titulo} | ${SITE.nome}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', descricao);
    if (primeira.current && !window.__navegou) {
      primeira.current = false;
      window.__navegou = true;
      return;
    }
    const h1 = document.querySelector<HTMLElement>('main h1');
    if (h1) {
      h1.setAttribute('tabindex', '-1');
      h1.focus();
    }
    window.scrollTo(0, 0);
  }, [titulo, descricao]);
  return <>{children}</>;
}

declare global {
  interface Window {
    __navegou?: boolean;
  }
}
