import { Link } from 'wouter';
import { categoriaPorId, situacaoDaMidia } from '../data/atracoes';
import { nomeCategoriaComercio } from '../data/comercio';
import type { Atracao, Estabelecimento } from '../data/tipos';
import { IconeFone, IconeMapa, IconeTexto, IconeWhatsapp } from './Icones';
import { Imagem } from './Imagem';

const COR_CATEGORIA = {
  religioso: 'bg-terra text-papel',
  aventura: 'bg-rio text-papel',
} as const;

/** Card de ponto turístico: porta de entrada para a página individual da atração. */
export function CardAtracao({ atracao, nivelTitulo = 3 }: { atracao: Atracao; nivelTitulo?: 2 | 3 }) {
  const capa = atracao.fotografias.find((f) => f.arquivo) ?? atracao.fotografias[0];
  const midia = situacaoDaMidia(atracao);
  const Titulo = `h${nivelTitulo}` as 'h2' | 'h3';
  const categoria = categoriaPorId(atracao.categoria);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-superficie shadow-[var(--sombra)] transition-transform duration-200 focus-within:-translate-y-1 hover:-translate-y-1">
      <div className="relative">
        <Imagem foto={capa} decorativa className="aspect-[4/3] w-full" tamanhos="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw" />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-bold ${COR_CATEGORIA[atracao.categoria]}`}>
          {categoria.nome}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Titulo className="text-2xl font-bold">
          <Link
            href={`/atracoes/${atracao.slug}`}
            className="text-tinta no-underline after:absolute after:inset-0 after:content-[''] group-hover:text-rio"
          >
            {atracao.nome}
          </Link>
        </Titulo>
        <p className="text-tinta-suave">{atracao.resumo}</p>
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-sm text-tinta-suave" aria-label="Recursos disponíveis">
          <li className="flex items-center gap-1.5">
            <IconeTexto width={16} height={16} /> {midia.textos ? `${midia.textos} descrições textuais` : 'Descrições em preparação'}
          </li>
          <li className="flex items-center gap-1.5">
            <IconeFone width={16} height={16} /> {midia.audios ? `${midia.audios} audiodescrições` : 'Audiodescrições em produção'}
          </li>
        </ul>
        <span className="font-bold text-rio" aria-hidden="true">Conhecer o lugar</span>
      </div>
    </article>
  );
}

/** Card de estabelecimento do comércio local: visual de ficha, distinto do card turístico. */
export function CardEstabelecimento({ item }: { item: Estabelecimento }) {
  const mapa = item.linkMapa ?? (item.endereco
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.nome}, ${item.endereco}`)}`
    : undefined);
  return (
    <article className="flex gap-4 rounded-xl border-2 border-linha border-l-8 border-l-terra bg-superficie p-4">
      {item.fotografia && (
        <img
          src={item.fotografia.arquivo}
          alt={item.fotografia.textoAlternativo}
          loading="lazy"
          className="h-24 w-24 shrink-0 rounded-lg object-cover"
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="text-sm font-bold text-terra">
          {nomeCategoriaComercio(item.categoria)}
          {item.parceiro && ', parceiro do projeto'}
        </p>
        <h3 className="text-xl font-bold">{item.nome}</h3>
        {item.descricao && <p className="text-tinta-suave">{item.descricao}</p>}
        {item.endereco && <p className="text-sm">{item.endereco}</p>}
        {(mapa || item.whatsapp) && (
          <div className="mt-2 flex flex-wrap gap-2">
            {mapa && (
              <a className="botao botao-contorno text-sm" href={mapa} target="_blank" rel="noopener noreferrer">
                <IconeMapa /> Ver no mapa<span className="sr-only"> (abre em nova aba)</span>
              </a>
            )}
            {item.whatsapp && (
              <a
                className="botao botao-primario text-sm"
                href={`https://wa.me/${item.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconeWhatsapp /> Conversar no WhatsApp<span className="sr-only"> (abre em nova aba)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
