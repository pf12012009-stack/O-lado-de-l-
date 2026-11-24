import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { CardAtracao } from '../components/Cards';
import { LinkFonte, ListaDeContatos } from '../components/Fontes';
import { Pagina } from '../components/Layout';
import { CATEGORIAS, atracaoPorSlug, atracoesDaCategoria, categoriaPorId } from '../data/atracoes';
import { FONTES } from '../data/fontes';
import type { Atracao, CategoriaId } from '../data/tipos';

function Filtros({ atual }: { atual?: CategoriaId }) {
  const itens = [
    { href: '/pontos-turisticos', rotulo: 'Todos', ativo: !atual },
    ...CATEGORIAS.map((c) => ({ href: c.caminho, rotulo: c.nome, ativo: atual === c.id })),
  ];
  return (
    <nav aria-label="Categorias" className="mt-6">
      <ul className="flex flex-wrap gap-2">
        {itens.map((i) => (
          <li key={i.href}>
            <Link href={i.href} aria-current={i.ativo ? 'page' : undefined} className={`botao text-sm ${i.ativo ? 'botao-primario' : 'botao-contorno'}`}>
              {i.rotulo}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Grade({ lista, nivel = 3 }: { lista: Atracao[]; nivel?: 2 | 3 }) {
  return (
    <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {lista.map((a) => <li key={a.slug} className="flex"><CardAtracao atracao={a} nivelTitulo={nivel} /></li>)}
    </ul>
  );
}

function Topo({ titulo, intro, atual, children }: { titulo: string; intro: string; atual?: CategoriaId; children?: ReactNode }) {
  return (
    <div className="faixa-marca pb-10 pt-12">
      <div className="conteudo">
        <h1 className="text-4xl font-semibold sm:text-6xl">{titulo}</h1>
        <p className="mt-4 max-w-3xl text-lg opacity-95">{intro}</p>
        {children}
      </div>
      <div className="conteudo [&_.botao-contorno]:border-[#f4eee3] [&_.botao-contorno]:text-[#f4eee3] [&_.botao-primario]:bg-[#e2c27e] [&_.botao-primario]:text-[#0e2a21]">
        <Filtros atual={atual} />
      </div>
    </div>
  );
}

export function Atracoes() {
  return (
    <Pagina titulo="Pontos turísticos" descricao="Conheça os pontos turísticos de Alto Piquiri (PR) por fotografias, descrições textuais e audiodescrições.">
      <Topo titulo="Pontos turísticos" intro="Escolha um lugar para ver as fotografias, ler as descrições e ouvir as audiodescrições." />
      <div className="conteudo">
        {CATEGORIAS.map((c) => (
          <section key={c.id} aria-labelledby={`sec-${c.id}`} className="mt-14">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-sol pb-3">
              <h2 id={`sec-${c.id}`} className="text-3xl font-semibold">{c.nome}</h2>
              <Link href={c.caminho} className="font-bold">Sobre {c.nome.toLowerCase()}</Link>
            </div>
            <Grade lista={atracoesDaCategoria(c.id)} />
          </section>
        ))}
      </div>
    </Pagina>
  );
}

function TourCapelas() {
  const capelas: { nome: string; slug?: string }[] = [
    { nome: 'Nossa Senhora Aparecida', slug: 'capela-nossa-senhora-aparecida' },
    { nome: 'Santo Antônio', slug: 'capela-santo-antonio' },
    { nome: 'São Judas Tadeu' },
    { nome: 'Nossa Senhora da Penha' },
  ];
  const santuario = atracaoPorSlug('santuario-sao-jose');
  return (
    <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <section aria-labelledby="titulo-tour">
        <h2 id="titulo-tour" className="text-3xl font-semibold">Tour Capelas</h2>
        <p className="mt-3 texto-corrido text-lg">
          O Santuário São José mantém quatro capelas ligadas à comunidade. No dia 19 de cada mês, peregrinos visitam as capelas no roteiro chamado Tour Capelas.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {capelas.map((c) => (
            <li key={c.nome} className="rounded-xl border-2 border-linha bg-superficie p-4">
              <p className="font-display text-xl font-semibold">{c.nome}</p>
              {c.slug ? (
                <Link href={`/pontos-turisticos/${c.slug}`} className="mt-1 inline-flex min-h-11 items-center font-bold">Conhecer a capela</Link>
              ) : (
                <p className="mt-1 text-sm text-tinta-suave">Fotografias em preparação.</p>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4"><LinkFonte fonte={FONTES.bemdito} /></p>
      </section>
      {santuario?.contatos && (
        <aside aria-labelledby="titulo-contato-santuario" className="h-fit rounded-2xl bg-superficie p-6 shadow-[var(--sombra)]">
          <h2 id="titulo-contato-santuario" className="text-2xl font-semibold">Fale com o Santuário</h2>
          <p className="mt-2 text-tinta-suave">Horários de missa, inscrições e caravanas são tratados diretamente pelo Santuário.</p>
          <div className="mt-4"><ListaDeContatos contatos={santuario.contatos} /></div>
          <p className="mt-4"><LinkFonte fonte={FONTES.santuario} prefixo="" /></p>
        </aside>
      )}
    </div>
  );
}

function FichaRota() {
  const dados = [
    { rotulo: 'Trajeto', valor: '36 km' },
    { rotulo: 'Nível de dificuldade', valor: '5,4' },
    { rotulo: 'Lançamento oficial', valor: '28/06/2026' },
    { rotulo: 'Programa', valor: 'Pedala Paraná' },
  ];
  return (
    <section aria-labelledby="titulo-ficha" className="mt-14 rounded-2xl bg-superficie p-6 shadow-[var(--sombra)] sm:p-8">
      <h2 id="titulo-ficha" className="text-3xl font-semibold">Ficha oficial da Ciclorrota Pedal das Águas</h2>
      <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {dados.map((d) => (
          <div key={d.rotulo} className="border-l-4 border-sol pl-3">
            <dt className="text-sm text-tinta-suave">{d.rotulo}</dt>
            <dd className="font-display text-2xl font-semibold tabular-nums">{d.valor}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 texto-corrido">A rota é pública e autoguiada. Leia as condições do trajeto antes de pedalar: não há água potável nem pontos de apoio ao longo do percurso.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/pontos-turisticos/pedal-das-aguas" className="botao botao-primario">Ver fotografias e condições</Link>
        <a href={FONTES.pedalaRota.url} target="_blank" rel="noopener noreferrer" className="botao botao-contorno">
          Mapa em PDF e rota em GPX<span className="sr-only"> no site do Pedala Paraná (abre em nova aba)</span>
        </a>
      </div>
      <p className="mt-4"><LinkFonte fonte={FONTES.pedalaRota} /></p>
    </section>
  );
}

export function CategoriaPagina({ id }: { id: CategoriaId }) {
  const c = categoriaPorId(id);
  const lista = atracoesDaCategoria(c.id);
  return (
    <Pagina titulo={c.nome} descricao={`${c.nome} em Alto Piquiri (PR): ${c.descricao}`}>
      <Topo titulo={c.nome} intro={c.descricao} atual={c.id} />
      <div className="conteudo">
        {id === 'aventura' && <FichaRota />}
        <section aria-labelledby="titulo-lugares" className="mt-14">
          <h2 id="titulo-lugares" className="border-b-2 border-sol pb-3 text-3xl font-semibold">Lugares para conhecer</h2>
          {lista.length ? <Grade lista={lista} /> : <p className="mt-6 text-tinta-suave">Ainda não há lugares publicados nesta categoria.</p>}
        </section>
        {id === 'religioso' && <TourCapelas />}
      </div>
    </Pagina>
  );
}

