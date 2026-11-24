import { Link } from 'wouter';
import { LinkFonte, ListaDeContatos, ListaDeFatos } from '../components/Fontes';
import { Galeria } from '../components/Galeria';
import { IconeMapa } from '../components/Icones';
import { Pagina } from '../components/Layout';
import { SecaoLibras } from '../components/Libras';
import { ChipCategoria } from '../components/Cards';
import { TopoFoto } from '../components/TopoFoto';
import { situacaoDaMidia } from '../data/atracoes';
import { IconeCamera, IconeFone } from '../components/Icones';
import { atracaoPorSlug, categoriaPorId } from '../data/atracoes';
import { NaoEncontrada } from './NaoEncontrada';

export function AtracaoPagina({ slug }: { slug: string }) {
  const a = atracaoPorSlug(slug);
  if (!a) return <NaoEncontrada />;
  const cat = categoriaPorId(a.categoria);
  const capa = a.fotografias.find((f) => f.arquivo);
  const midia = situacaoDaMidia(a);
  const mapa = a.localizacao.linkMapa ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.localizacao.buscaMapa)}`;

  return (
    <Pagina titulo={a.nome} descricao={`${a.resumo} Fotografias com descrição textual e audiodescrição.`}>
      <TopoFoto foto={capa} posicao="center 40%" alto>
        <nav aria-label="Você está em">
          <ol className="flex flex-wrap gap-x-2 text-sm">
            <li><Link href="/">Início</Link> <span aria-hidden="true">/</span></li>
            <li><Link href="/pontos-turisticos">Pontos turísticos</Link> <span aria-hidden="true">/</span></li>
            <li><Link href={cat.caminho}>{cat.nome}</Link> <span aria-hidden="true">/</span></li>
            <li aria-current="page" className="opacity-90">{a.nome}</li>
          </ol>
        </nav>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <ChipCategoria id={a.categoria} />
          {a.local && <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-bold backdrop-blur-md">{a.local}</span>}
        </div>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.02] drop-shadow-[0_2px_18px_rgb(0_0_0/0.35)] sm:text-7xl">{a.nome}</h1>
        <div className="mt-5 max-w-2xl space-y-3 text-lg text-[#fbf4e8]/95">
          {a.apresentacao.map((p) => <p key={p}>{p}</p>)}
        </div>
        <ul className="mt-6 flex flex-wrap gap-3 text-sm font-bold" aria-label="Neste lugar">
          <li className="flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 backdrop-blur-md"><IconeCamera width={16} height={16} /> {midia.fotos ? `${midia.fotos} ${midia.fotos === 1 ? 'fotografia' : 'fotografias'}` : 'Fotografias em breve'}</li>
          {midia.audios > 0 && <li className="flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 backdrop-blur-md"><IconeFone width={16} height={16} /> {midia.audios} {midia.audios === 1 ? 'audiodescrição' : 'audiodescrições'}</li>}
        </ul>
      </TopoFoto>

      <div className="conteudo mt-12">
        <Galeria fotografias={a.fotografias} nomeLugar={a.nome} />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-10">
            {a.fatos.length > 0 && (
              <section aria-labelledby="titulo-info">
                <h2 id="titulo-info" className="text-2xl font-semibold sm:text-3xl">Informações sobre o lugar</h2>
                <div className="mt-5"><ListaDeFatos fatos={a.fatos} /></div>
              </section>
            )}
            {a.avisos && a.avisos.length > 0 && (
              <section aria-labelledby="titulo-avisos" className="rounded-2xl border-2 border-sol bg-terra-clara/60 p-5 sm:p-6">
                <h2 id="titulo-avisos" className="text-2xl font-semibold">Antes de ir: condições do trajeto</h2>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                  {a.avisos.map((v) => <li key={v.texto}>{v.texto}</li>)}
                </ul>
                <p className="mt-4"><LinkFonte fonte={a.avisos[0].fonte} /></p>
              </section>
            )}
            <SecaoLibras atracao={a} />
          </div>

          <aside className="space-y-6" aria-label="Localização e contatos">
            <section aria-labelledby="titulo-local" className="rounded-2xl bg-superficie p-6 shadow-[var(--sombra)]">
              <h2 id="titulo-local" className="flex items-center gap-2 text-2xl font-semibold"><IconeMapa /> Localização</h2>
              {a.localizacao.endereco && <p className="mt-3">{a.localizacao.endereco}</p>}
              <p className="mt-1">{a.localizacao.municipio}</p>
              <a href={mapa} target="_blank" rel="noopener noreferrer" className="botao botao-primario mt-5">
                {a.localizacao.linkMapa ? 'Abrir no Google Maps' : 'Ver no Google Maps'}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </section>
            {a.contatos && (
              <section aria-labelledby="titulo-contatos" className="rounded-2xl bg-superficie p-6 shadow-[var(--sombra)]">
                <h2 id="titulo-contatos" className="text-2xl font-semibold">Contatos oficiais</h2>
                <div className="mt-4"><ListaDeContatos contatos={a.contatos} /></div>
              </section>
            )}
            {a.links && (
              <section aria-labelledby="titulo-links" className="rounded-2xl bg-superficie p-6 shadow-[var(--sombra)]">
                <h2 id="titulo-links" className="text-2xl font-semibold">Links oficiais</h2>
                <ul className="mt-3 space-y-2">
                  {a.links.map((l) => <li key={l.titulo}><LinkFonte fonte={l} prefixo="" /></li>)}
                </ul>
              </section>
            )}
          </aside>
        </div>

        {a.credito && <p className="mt-12 border-t border-linha pt-5 text-sm text-tinta-suave">{a.credito}</p>}
        <p className="mt-6">
          <Link href={cat.caminho} className="font-bold">Ver mais lugares de {cat.nome.toLowerCase()}</Link>
        </p>
      </div>
    </Pagina>
  );
}
