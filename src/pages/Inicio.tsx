import { Link } from 'wouter';
import { CardAtracao } from '../components/Cards';
import { ListaDeFatos } from '../components/Fontes';
import { IconeFone, IconeTexto } from '../components/Icones';
import { Pagina } from '../components/Layout';
import { ATRACOES, CATEGORIAS, atracoesDaCategoria } from '../data/atracoes';
import { CIDADE, SITE } from '../data/site';

/** Ilustração do horizonte: o lado de cá, o rio no meio e o lado de lá. */
function Horizonte() {
  return (
    <svg viewBox="0 0 1200 260" preserveAspectRatio="xMidYMax slice" className="h-44 w-full sm:h-60" aria-hidden="true" focusable="false">
      <circle cx="905" cy="118" r="54" fill="var(--sol)" />
      <path d="M0 150c140-36 260-40 400-14s220 6 340-22 280-22 460 10v136H0Z" fill="var(--rio-claro)" />
      <path d="M560 158c120-30 260-36 380-12s180 14 260 0v114H560Z" fill="var(--rio)" opacity=".55" />
      <path d="M0 196c160-30 300-26 450-4s250 18 380-6 250-20 370 0v74H0Z" fill="var(--rio)" />
      <path d="M0 226c180-22 330-18 470 2s300 14 440-6 210-10 290 0" fill="none" stroke="var(--papel)" strokeWidth="6" strokeLinecap="round" />
      <path d="M0 196c160-30 300-26 450-4s250 18 380-6 250-20 370 0" fill="none" stroke="var(--terra)" strokeWidth="3" opacity=".7" />
    </svg>
  );
}

export function Inicio() {
  return (
    <Pagina titulo={SITE.nome} descricao={SITE.descricao}>
      <section className="relative overflow-hidden pt-12 sm:pt-20" aria-labelledby="titulo-inicio">
        <div className="conteudo">
          <p className="font-bold text-terra">Turismo virtual e acessível em Alto Piquiri, Paraná</p>
          <h1 id="titulo-inicio" className="mt-3 max-w-[16ch] text-5xl font-extrabold sm:text-7xl">
            Do lado de cá, conheça o lado de lá.
          </h1>
          <p className="mt-6 max-w-[48ch] text-xl text-tinta-suave">{SITE.lema}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/atracoes" className="botao botao-primario text-lg">Ver os pontos turísticos</Link>
            <a href="#como-conhecer" className="botao botao-contorno text-lg">Como conhecer cada lugar</a>
          </div>
        </div>
        <div className="mt-10"><Horizonte /></div>
      </section>

      <section className="bg-rio py-14 text-papel" aria-labelledby="titulo-categorias">
        <div className="conteudo">
          <h2 id="titulo-categorias" className="text-3xl font-bold sm:text-4xl">Por onde você quer começar?</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {CATEGORIAS.map((c) => {
              const n = atracoesDaCategoria(c.id).length;
              return (
                <li key={c.id}>
                  <Link
                    href={`/categoria/${c.id}`}
                    className="flex h-full flex-col gap-2 rounded-3xl border-2 border-papel/40 p-6 text-papel no-underline transition-colors hover:bg-papel/10"
                  >
                    <span className="font-display text-2xl font-bold">{c.nome}</span>
                    <span className="opacity-95">{c.descricao}</span>
                    <span className="mt-2 text-sm font-bold">{n} {n === 1 ? 'lugar' : 'lugares'}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="conteudo mt-20" aria-labelledby="titulo-destaques">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="titulo-destaques" className="text-3xl font-bold sm:text-4xl">Pontos turísticos</h2>
          <Link href="/atracoes" className="font-bold">Ver todos os pontos turísticos</Link>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ATRACOES.map((a) => <li key={a.slug} className="flex"><CardAtracao atracao={a} /></li>)}
        </ul>
      </section>

      <section id="como-conhecer" className="conteudo mt-24 scroll-mt-6" aria-labelledby="titulo-como">
        <h2 id="titulo-como" className="text-3xl font-bold sm:text-4xl">Duas formas de conhecer cada fotografia</h2>
        <p className="mt-3 texto-corrido text-lg text-tinta-suave">
          Você escolhe como prefere conhecer cada imagem. As duas opções ficam sempre lado a lado, uma não substitui a outra.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-rio/30 bg-rio-claro/50 p-6">
            <h3 className="flex items-center gap-2 text-2xl font-bold text-rio"><IconeTexto width={26} height={26} /> Ler a descrição</h3>
            <p className="mt-3">
              Um texto que conta o que aparece na fotografia: os elementos, as cores, o ambiente. Para pessoas surdas, para quem prefere ler e para quem usa leitor de tela.
            </p>
          </div>
          <div className="rounded-3xl border-2 border-terra/40 bg-terra-clara/60 p-6">
            <h3 className="flex items-center gap-2 text-2xl font-bold text-terra"><IconeFone width={26} height={26} /> Ouvir a audiodescrição</h3>
            <p className="mt-3">
              Uma narração gravada que descreve a imagem, pensada para pessoas cegas e com baixa visão. Tem controles para tocar, pausar, voltar, avançar e mudar a velocidade.
            </p>
          </div>
        </div>
      </section>

      <section className="conteudo mt-24 grid gap-8 rounded-3xl bg-superficie p-6 shadow-[var(--sombra)] sm:p-10 md:grid-cols-[1fr_1.2fr]" aria-labelledby="titulo-comercio">
        <div>
          <h2 id="titulo-comercio" className="text-3xl font-bold">Comércio local</h2>
          <p className="mt-3 text-tinta-suave">
            Os estabelecimentos e parceiros de Alto Piquiri têm um espaço próprio, separado dos pontos turísticos, com endereço, mapa e contato.
          </p>
          <Link href="/comercio" className="botao botao-contorno mt-6">Conhecer o comércio local</Link>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Alto Piquiri em poucas linhas</h2>
          <div className="mt-4"><ListaDeFatos fatos={CIDADE.fatos} /></div>
        </div>
      </section>
    </Pagina>
  );
}
