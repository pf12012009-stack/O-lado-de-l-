import { Link } from 'wouter';
import { CardAtracao, CardEstabelecimento } from '../components/Cards';
import { ListaDeFatos } from '../components/Fontes';
import { IconeFone, IconeTexto } from '../components/Icones';
import { Pagina } from '../components/Layout';
import { ATRACOES, CATEGORIAS, atracoesDaCategoria } from '../data/atracoes';
import { ESTABELECIMENTOS } from '../data/comercio';
import { CIDADE, SITE } from '../data/site';

/** Horizonte: do lado de cá, o rio no meio, o sol do lado de lá. */
function Horizonte() {
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="block h-24 w-full sm:h-36" aria-hidden="true" focusable="false">
      <circle cx="900" cy="96" r="46" fill="#c9a04e" />
      <path d="M0 110c140-30 260-34 400-12s220 4 340-18 280-18 460 8v112H0Z" fill="#1e4d3a" />
      <path d="M0 150c160-24 300-20 450-2s250 14 380-4 250-16 370 0v56H0Z" fill="var(--papel)" />
      <path d="M0 150c160-24 300-20 450-2s250 14 380-4 250-16 370 0" fill="none" stroke="#c9a04e" strokeWidth="3" />
    </svg>
  );
}

export function Inicio() {
  return (
    <Pagina titulo={SITE.nome} descricao={SITE.descricao}>
      <section className="faixa-marca pt-14 sm:pt-20" aria-labelledby="titulo-inicio">
        <div className="conteudo">
          <p className="ouro font-bold">Turismo virtual e acessível em Alto Piquiri, Paraná</p>
          <h1 id="titulo-inicio" className="mt-4 max-w-[15ch] text-5xl font-semibold leading-[1.05] sm:text-7xl">
            Do lado de cá, conheça o lado de lá.
          </h1>
          <p className="mt-6 max-w-[50ch] text-xl opacity-95">
            Um projeto para que todos possam conhecer, explorar e vivenciar as belezas de Alto Piquiri, independentemente de suas limitações.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 pb-4">
            <Link href="/pontos-turisticos" className="botao botao-ouro text-lg">Ver os pontos turísticos</Link>
            <a href="#como-conhecer" className="botao botao-claro text-lg">Como conhecer cada lugar</a>
          </div>
        </div>
        <Horizonte />
      </section>

      <section className="conteudo mt-8" aria-labelledby="titulo-categorias">
        <h2 id="titulo-categorias" className="text-3xl font-semibold sm:text-4xl">Por onde você quer começar?</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {CATEGORIAS.map((c) => {
            const n = atracoesDaCategoria(c.id).length;
            return (
              <li key={c.id}>
                <Link
                  href={c.caminho}
                  className="flex h-full flex-col gap-2 rounded-2xl border-2 border-linha bg-superficie p-6 text-tinta no-underline transition-colors hover:border-sol"
                >
                  <span className="font-display text-2xl font-semibold text-rio">{c.nome}</span>
                  <span className="text-tinta-suave">{c.descricao}</span>
                  <span className="mt-auto pt-2 text-sm font-bold text-terra">{n} {n === 1 ? 'lugar' : 'lugares'}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="conteudo mt-20" aria-labelledby="titulo-destaques">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-sol pb-3">
          <h2 id="titulo-destaques" className="text-3xl font-semibold sm:text-4xl">Pontos turísticos</h2>
          <Link href="/pontos-turisticos" className="font-bold">Ver todos</Link>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ATRACOES.map((a) => <li key={a.slug} className="flex"><CardAtracao atracao={a} /></li>)}
        </ul>
      </section>

      <section id="como-conhecer" className="conteudo mt-24 scroll-mt-6" aria-labelledby="titulo-como">
        <h2 id="titulo-como" className="text-3xl font-semibold sm:text-4xl">Duas formas de conhecer cada fotografia</h2>
        <p className="mt-3 texto-corrido text-lg text-tinta-suave">
          Você escolhe como prefere conhecer cada imagem. As duas opções ficam juntas da foto e uma não substitui a outra.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-rio/25 bg-rio-claro/60 p-6">
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-rio"><IconeTexto width={26} height={26} /> Ler a descrição</h3>
            <p className="mt-3">Um texto que conta o que aparece na fotografia: os elementos, as cores e o ambiente. Para pessoas surdas, para quem prefere ler e para quem usa leitor de tela.</p>
          </div>
          <div className="rounded-2xl border-2 border-sol/60 bg-terra-clara/60 p-6">
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-terra"><IconeFone width={26} height={26} /> Ouvir a audiodescrição</h3>
            <p className="mt-3">Uma narração gravada que descreve a imagem, pensada para pessoas cegas e com baixa visão. Tem botões para ouvir, pausar, voltar, avançar e mudar a velocidade.</p>
          </div>
        </div>
      </section>

      <section className="conteudo mt-24" aria-labelledby="titulo-parceiros">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-sol pb-3">
          <h2 id="titulo-parceiros" className="text-3xl font-semibold sm:text-4xl">Comércios parceiros</h2>
          <Link href="/comercio-local" className="font-bold">Ver o comércio local</Link>
        </div>
        <p className="mt-4 texto-corrido text-tinta-suave">Estabelecimentos de Alto Piquiri que apoiam o projeto. Esta área é separada dos pontos turísticos.</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {ESTABELECIMENTOS.map((e) => <li key={e.slug}><CardEstabelecimento item={e} /></li>)}
        </ul>
      </section>

      <section className="conteudo mt-24 rounded-2xl bg-superficie p-6 shadow-[var(--sombra)] sm:p-10" aria-labelledby="titulo-cidade">
        <h2 id="titulo-cidade" className="text-3xl font-semibold">Alto Piquiri em poucas linhas</h2>
        <div className="mt-5 max-w-3xl"><ListaDeFatos fatos={CIDADE.fatos} /></div>
      </section>
    </Pagina>
  );
}
