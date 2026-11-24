import { Link } from 'wouter';
import { CardAtracao, CardEstabelecimento, ESTILO_CATEGORIA } from '../components/Cards';
import { BannerAbertura, type Slide } from '../components/Destaque';
import { ListaDeFatos } from '../components/Fontes';
import { IconeFone, IconeSeta, IconeTexto } from '../components/Icones';
import { Pagina } from '../components/Layout';
import { ATRACOES, CATEGORIAS, atracaoPorSlug, atracoesDaCategoria } from '../data/atracoes';
import { ESTABELECIMENTOS } from '../data/comercio';
import { CIDADE, SITE } from '../data/site';
import { fotoDe, srcsetDe } from '../lib/imagens';
import type { CategoriaId } from '../data/tipos';

const M = '/midia/atracoes';
const slideDe = (slug: string, id: string, legenda: string, posicao?: string): Slide => {
  const f = fotoDe(slug, id)!;
  return { imagem: f.arquivo!, srcset: srcsetDe(f), alt: '', legenda, href: `/pontos-turisticos/${slug}`, posicao };
};
const SLIDES: Slide[] = [
  slideDe('rio-piquiri', 'rio-piquiri', 'Rio Piquiri'),
  { imagem: '/img/hero-santuario.webp', alt: '', legenda: 'Santuário Diocesano São José', href: '/pontos-turisticos/santuario-sao-jose', posicao: '60% center' },
  slideDe('capela-nossa-senhora-aparecida', 'vista-externa', 'Capela Nossa Senhora Aparecida', 'center 60%'),
  slideDe('capela-santo-antonio', 'vitral-espirito-santo', 'Vitral do Espírito Santo, Capela Santo Antônio', 'center 40%'),
];

/** Foto que representa cada categoria nos portais da página inicial. */
const FOTO_CATEGORIA: Record<CategoriaId, string> = {
  religioso: `${M}/capela-nossa-senhora-aparecida/interior-nave-640.webp`,
  aventura: `${M}/pedal-das-aguas/abertura-640.webp`,
  natureza: `${M}/rio-piquiri/rio-piquiri-640.webp`,
};

export function Inicio() {
  const destaque = atracaoPorSlug('santuario-sao-jose')!;
  const demais = ATRACOES.filter((a) => a.slug !== destaque.slug);
  const exemplo = atracaoPorSlug('capela-santo-antonio')!.fotografias[0];

  return (
    <Pagina titulo={SITE.nome} descricao={SITE.descricao}>
      <BannerAbertura
        slides={SLIDES}
        titulo="Do lado de cá, conheça o lado de lá."
        texto="Um projeto para que todos possam conhecer, explorar e vivenciar as belezas de Alto Piquiri, independentemente de suas limitações."
      />

      {/* Portais das categorias */}
      <section className="conteudo relative z-10 -mt-6 sm:-mt-10" aria-labelledby="titulo-categorias">
        <h2 id="titulo-categorias" className="sr-only">Categorias de turismo</h2>
        <ul className="grid gap-5 md:grid-cols-3">
          {CATEGORIAS.map((c) => {
            const n = atracoesDaCategoria(c.id).length;
            const Icone = ESTILO_CATEGORIA[c.id].icone;
            return (
              <li key={c.id} className="revelar">
                <Link
                  href={c.caminho}
                  className="group flex h-full items-center gap-4 rounded-[1.75rem] border border-linha bg-superficie p-3 pr-5 text-tinta no-underline shadow-[var(--sombra)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--sombra-alta)]"
                >
                  <span className="arco relative h-24 w-20 shrink-0 overflow-hidden">
                    <img src={FOTO_CATEGORIA[c.id]} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className={`mb-1 inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${ESTILO_CATEGORIA[c.id].chip}`}>
                      <Icone width={14} height={14} /> {n} {n === 1 ? 'lugar' : 'lugares'}
                    </span>
                    <span className="font-display text-xl font-semibold leading-tight">{c.nome}</span>
                    <span className="text-sm text-tinta-suave">{c.descricao}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Pontos turísticos em mosaico */}
      <section className="conteudo mt-24" aria-labelledby="titulo-destaques">
        <div className="revelar flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="rotulo">Pontos turísticos</p>
            <h2 id="titulo-destaques" className="mt-1 text-4xl font-semibold sm:text-5xl">Escolha um lugar para conhecer</h2>
          </div>
          <Link href="/pontos-turisticos" className="botao botao-contorno">Ver todos <IconeSeta /></Link>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <li className="flex sm:col-span-2 lg:row-span-2"><CardAtracao atracao={destaque} destaque /></li>
          {demais.map((a) => <li key={a.slug} className="revelar flex"><CardAtracao atracao={a} /></li>)}
        </ul>
      </section>

      {/* Duas formas de conhecer */}
      <section id="como-conhecer" className="faixa-marca topografia relative mt-28 scroll-mt-20 overflow-hidden py-20 sm:py-28" aria-labelledby="titulo-como">
        <div className="conteudo grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="revelar relative mx-auto w-full max-w-sm">
            <div className="arco overflow-hidden border-4 border-[#f4b43a] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)]">
              <img src={exemplo.miniatura} alt={exemplo.textoAlternativo} loading="lazy" decoding="async" width={480} height={640} className="aspect-[3/4] w-full object-cover" />
            </div>
            <p className="absolute -bottom-5 left-1/2 w-max max-w-[90%] -translate-x-1/2 rounded-full bg-[#f4b43a] px-4 py-2 text-center text-sm font-bold text-[#0b3d2e] shadow-lg">
              {exemplo.titulo}
            </p>
          </div>
          <div>
            <p className="ouro font-bold">Acessibilidade em cada imagem</p>
            <h2 id="titulo-como" className="mt-2 text-4xl font-semibold sm:text-5xl">Duas formas de conhecer cada fotografia</h2>
            <p className="mt-4 max-w-xl text-lg opacity-95">
              Você escolhe como prefere conhecer cada imagem. As duas opções ficam junto da foto e uma não substitui a outra.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fbf4e8] text-[#0b3d2e]"><IconeTexto width={24} height={24} /></span>
                <h3 className="mt-4 text-2xl font-semibold">Ler a descrição</h3>
                <p className="mt-2 opacity-90">Um texto que conta o que aparece na foto. Para pessoas surdas, para quem prefere ler e para quem usa leitor de tela.</p>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f4b43a] text-[#0b3d2e]"><IconeFone width={24} height={24} /></span>
                <h3 className="mt-4 text-2xl font-semibold">Ouvir a audiodescrição</h3>
                <p className="mt-2 opacity-90">Uma narração gravada que descreve a imagem, pensada para pessoas cegas e com baixa visão.</p>
              </div>
            </div>
            <Link href="/pontos-turisticos/capela-santo-antonio" className="botao botao-ouro mt-8">
              Experimentar na Capela Santo Antônio <IconeSeta />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner da ciclorrota */}
      <section className="relative isolate overflow-hidden text-[#fffaf2]" aria-labelledby="titulo-rota">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img src={`${M}/pedal-das-aguas/abertura.webp`} srcSet={srcsetDe(fotoDe('pedal-das-aguas', 'abertura')!)} sizes="100vw" alt="" loading="lazy" decoding="async" className="paralaxe h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(122_44_14/0.95)_0%,rgb(168_71_31/0.82)_45%,rgb(168_71_31/0.25)_100%)]" />
        </div>
        <div className="conteudo grid gap-8 py-20 sm:py-28 md:grid-cols-[auto_1fr] md:items-center">
          <p className="revelar font-display text-[6rem] font-semibold leading-none sm:text-[9rem]" aria-hidden="true">
            36<span className="text-4xl sm:text-6xl"> km</span>
          </p>
          <div className="revelar max-w-xl">
            <p className="font-bold text-[#ffd98a]">Turismo de aventura</p>
            <h2 id="titulo-rota" className="mt-2 text-4xl font-semibold sm:text-5xl">Ciclorrota Pedal das Águas</h2>
            <p className="mt-4 text-lg">Uma rota oficial de 36 km do Pedala Paraná, por estradas rurais, trechos de mata e as corredeiras dos Apertados do Rio Piquiri.</p>
            <Link href="/turismo-de-aventura" className="botao botao-ouro mt-7">Ver a ficha da rota <IconeSeta /></Link>
          </div>
        </div>
      </section>

      {/* Comércios parceiros */}
      <section className="topografia-clara bg-superficie-2/60 py-20 sm:py-24" aria-labelledby="titulo-parceiros">
        <div className="conteudo">
          <div className="revelar flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="rotulo">Apoio local</p>
              <h2 id="titulo-parceiros" className="mt-1 text-4xl font-semibold sm:text-5xl">Comércios parceiros</h2>
              <p className="mt-3 max-w-xl text-tinta-suave">Estabelecimentos de Alto Piquiri que apoiam o projeto. Uma área separada dos pontos turísticos.</p>
            </div>
            <Link href="/comercio-local" className="botao botao-contorno">Ver o comércio local <IconeSeta /></Link>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ESTABELECIMENTOS.map((e) => <li key={e.slug} className="revelar"><CardEstabelecimento item={e} /></li>)}
          </ul>
        </div>
      </section>

      {/* Alto Piquiri */}
      <section className="conteudo mt-24 grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr]" aria-labelledby="titulo-cidade">
        <div className="revelar arco overflow-hidden shadow-[var(--sombra-alta)]">
          <img src="/img/prefeitura.webp" alt="Paço Municipal de Alto Piquiri, prédio claro com a inscrição Paço Municipal e bandeiras na frente" loading="lazy" decoding="async" width={1200} height={675} className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="revelar">
          <p className="rotulo">O município</p>
          <h2 id="titulo-cidade" className="mt-1 text-4xl font-semibold sm:text-5xl">Alto Piquiri em poucas linhas</h2>
          <div className="mt-6"><ListaDeFatos fatos={CIDADE.fatos} /></div>
        </div>
      </section>
    </Pagina>
  );
}
