import { Link } from 'wouter';
import { ListaDeFatos } from '../components/Fontes';
import { Galeria } from '../components/Galeria';
import { IconeExterno, IconeMapa } from '../components/Icones';
import { Pagina } from '../components/Layout';
import { atracaoPorSlug, categoriaPorId } from '../data/atracoes';
import { NaoEncontrada } from './NaoEncontrada';

export function AtracaoPagina({ slug }: { slug: string }) {
  const a = atracaoPorSlug(slug);
  if (!a) return <NaoEncontrada />;
  const cat = categoriaPorId(a.categoria);
  const mapa = a.localizacao.linkMapa ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.localizacao.buscaMapa)}`;

  return (
    <Pagina titulo={a.nome} descricao={`${a.resumo} Fotografias com descrição textual e audiodescrição.`}>
      <div className="conteudo pt-8">
        <nav aria-label="Você está em">
          <ol className="flex flex-wrap gap-x-2 text-sm text-tinta-suave">
            <li><Link href="/">Início</Link> <span aria-hidden="true">/</span></li>
            <li><Link href={`/categoria/${cat.id}`}>{cat.nome}</Link> <span aria-hidden="true">/</span></li>
            <li aria-current="page">{a.nome}</li>
          </ol>
        </nav>

        <header className="mt-6 max-w-3xl">
          <p className="font-bold text-terra">{cat.nome}</p>
          <h1 className="mt-2 text-4xl font-extrabold sm:text-6xl">{a.nome}</h1>
          <div className="mt-5 space-y-3 text-lg">
            {a.apresentacao.map((p) => <p key={p}>{p}</p>)}
          </div>
        </header>

        <div className="mt-12">
          <Galeria fotografias={a.fotografias} nomeLugar={a.nome} />
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <section aria-labelledby="titulo-info">
            <h2 id="titulo-info" className="text-2xl font-bold sm:text-3xl">Informações sobre o lugar</h2>
            <div className="mt-5"><ListaDeFatos fatos={a.fatos} /></div>
            {a.linkOficial && (
              <p className="mt-6">
                <a href={a.linkOficial.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold">
                  {a.linkOficial.titulo} <IconeExterno /> <span className="sr-only">(abre em nova aba)</span>
                </a>
              </p>
            )}
          </section>
          <section aria-labelledby="titulo-local" className="h-fit rounded-3xl bg-superficie p-6 shadow-[var(--sombra)]">
            <h2 id="titulo-local" className="flex items-center gap-2 text-2xl font-bold"><IconeMapa /> Localização</h2>
            <p className="mt-3">{a.localizacao.municipio}</p>
            {a.localizacao.endereco && <p className="mt-1">{a.localizacao.endereco}</p>}
            <a href={mapa} target="_blank" rel="noopener noreferrer" className="botao botao-primario mt-5">
              {a.localizacao.linkMapa ? 'Abrir no Google Maps' : 'Buscar no Google Maps'}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </section>
        </div>
      </div>
    </Pagina>
  );
}
