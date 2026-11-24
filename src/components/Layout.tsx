import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { CATEGORIAS } from '../data/atracoes';
import { SITE } from '../data/site';
import { IconeFechar, IconeMenu } from './Icones';
import { Marca } from './Marca';
import { Preferencias } from './Preferencias';

const MENU = [
  { href: '/', rotulo: 'Início' },
  { href: '/pontos-turisticos', rotulo: 'Pontos turísticos' },
  { href: '/comercio-local', rotulo: 'Comércio local' },
  { href: '/sobre', rotulo: 'Sobre' },
  { href: '/contato', rotulo: 'Contato' },
];

function ativo(local: string, href: string) {
  if (href === '/') return local === '/';
  if (href === '/pontos-turisticos') return local.startsWith(href) || CATEGORIAS.some((c) => local === c.caminho);
  return local === href || local.startsWith(`${href}/`);
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
          className={`${classe} flex min-h-11 items-center rounded-full px-3.5 font-bold no-underline transition-colors hover:bg-white/10 aria-[current=page]:bg-[#f4b43a] aria-[current=page]:text-[#0b3d2e]`}
        >
          {m.rotulo}
        </Link>
      </li>
    ));

  return (
    <header className="faixa-marca sticky top-0 z-40 border-b border-[#f4b43a]/40 shadow-[0_8px_24px_-16px_rgb(0_0_0/0.6)] [background:rgb(11_61_46/0.94)] supports-[backdrop-filter]:backdrop-blur-md">
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
            className="botao botao-claro hidden px-3 text-sm sm:inline-flex"
            aria-expanded={prefs}
            aria-controls="painel-preferencias"
            onClick={() => setPrefs((p) => !p)}
          >
            Acessibilidade
          </button>
          <button
            type="button"
            className="botao botao-claro px-3 lg:hidden"
            aria-expanded={aberto}
            aria-controls="menu-movel"
            onClick={() => setAberto((a) => !a)}
          >
            {aberto ? <IconeFechar /> : <IconeMenu />} Menu
          </button>
        </div>
      </div>
      <div id="painel-preferencias" hidden={!prefs} className="border-t border-white/15 py-3">
        <div className="conteudo flex flex-wrap items-center justify-between gap-3">
          <Preferencias />
          <Link href="/acessibilidade" className="text-sm font-bold">Recursos de acessibilidade do site</Link>
        </div>
      </div>
      <nav id="menu-movel" aria-label="Principal" hidden={!aberto} className="border-t border-white/15 py-3 lg:hidden">
        <ul className="conteudo flex flex-col gap-1">{links('text-lg')}</ul>
        <div className="conteudo mt-3 space-y-3 border-t border-white/15 pt-3">
          <Preferencias />
          <Link href="/acessibilidade" className="inline-flex min-h-11 items-center font-bold">Recursos de acessibilidade do site</Link>
        </div>
      </nav>
    </header>
  );
}

function Rodape() {
  return (
    <footer className="faixa-marca topografia relative mt-28">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute inset-x-0 -top-px h-10 w-full sm:h-14" aria-hidden="true" focusable="false">
        <path d="M0 0h1440v20c-160 26-340 30-540 10S540 4 360 22 120 40 0 26Z" fill="var(--papel)" />
      </svg>
      <div className="conteudo grid gap-10 pb-12 pt-20 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <Marca tamanho="grande" />
          <p className="max-w-md">{SITE.lema}</p>
          <p className="max-w-md text-sm opacity-90">
            Plataforma de turismo virtual, conhecimento, inclusão e acessibilidade de Alto Piquiri (PR). Não somos agência de viagens: não vendemos passeios nem pacotes.
          </p>
        </div>
        <nav aria-label="Rodapé">
          <p className="ouro font-bold">Explorar</p>
          <ul className="mt-2">
            {[...MENU, { href: '/acessibilidade', rotulo: 'Acessibilidade' }].map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="inline-flex min-h-11 items-center">{m.rotulo}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-3 text-sm">
          <p className="ouro font-bold">Apoio institucional</p>
          <p>Prefeitura Municipal de Alto Piquiri</p>
          <p className="ouro pt-3 font-bold">Créditos</p>
          <p>{SITE.credito}</p>
          <p>Fotografias e textos dos pontos turísticos: Projeto EPT, Colégio Estadual Alto Piquiri.</p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#conteudo" className="sr-only-focavel fixed left-3 top-3 z-50 rounded-lg bg-[#f4b43a] px-4 py-3 font-bold text-[#0b3d2e]">
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
