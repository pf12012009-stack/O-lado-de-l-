import { Link } from 'wouter';
import { categoriaPorId, situacaoDaMidia } from '../data/atracoes';
import { linkWhatsapp, nomeCategoriaComercio } from '../data/comercio';
import type { Atracao, Estabelecimento } from '../data/tipos';
import { IconeFone, IconeMapa, IconeTexto, IconeWhatsapp } from './Icones';
import { Imagem } from './Imagem';

const COR_CATEGORIA = {
  religioso: 'bg-[#0e2a21] text-[#f4eee3]',
  aventura: 'bg-[#e2c27e] text-[#0e2a21]',
  natureza: 'bg-[#dde9e0] text-[#0e2a21]',
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
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-bold shadow ${COR_CATEGORIA[atracao.categoria]}`}>
          {categoria.nome}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        {atracao.local && <p className="text-sm font-bold text-terra">{atracao.local}</p>}
        <Titulo className="text-2xl font-bold">
          <Link
            href={`/pontos-turisticos/${atracao.slug}`}
            className="text-tinta no-underline after:absolute after:inset-0 after:content-[''] group-hover:text-rio"
          >
            {atracao.nome}
          </Link>
        </Titulo>
        <p className="text-tinta-suave">{atracao.resumo}</p>
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1 border-t border-linha pt-3 text-sm text-tinta-suave" aria-label="Recursos disponíveis">
          <li className="flex items-center gap-1.5">
            <IconeTexto width={16} height={16} /> {midia.textos ? `${midia.textos} ${midia.textos === 1 ? 'descrição textual' : 'descrições textuais'}` : 'Descrições em preparação'}
          </li>
          <li className="flex items-center gap-1.5">
            <IconeFone width={16} height={16} /> {midia.audios ? `${midia.audios} ${midia.audios === 1 ? 'audiodescrição' : 'audiodescrições'}` : 'Audiodescrições em produção'}
          </li>
        </ul>
        <span className="font-bold text-rio underline decoration-sol decoration-2 underline-offset-4" aria-hidden="true">Conhecer o lugar</span>
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
    <article className="flex h-full gap-4 rounded-xl border-2 border-linha bg-superficie p-4 sm:p-5">
      {item.fotografia && (
        <img
          src={item.fotografia.arquivo}
          alt={item.fotografia.textoAlternativo}
          loading="lazy"
          className="h-24 w-24 shrink-0 rounded-lg object-cover"
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-terra">
          {nomeCategoriaComercio(item.categoria)}
          {item.parceiro && <span className="rounded-full bg-terra-clara px-2 py-0.5 text-xs text-terra">Parceiro do projeto</span>}
        </p>
        <h3 className="text-xl font-bold">{item.nome}</h3>
        {item.descricao && <p className="text-tinta-suave">{item.descricao}</p>}
        {item.endereco && <p className="text-sm">{item.endereco}</p>}
        {(mapa || item.whatsapp) && (
          <div className="mt-2 flex flex-wrap gap-2">
            {mapa && (
              <a className="botao botao-contorno text-sm" href={mapa} target="_blank" rel="noopener noreferrer">
                <IconeMapa /> Ver localização<span className="sr-only"> de {item.nome} (abre em nova aba)</span>
              </a>
            )}
            {item.whatsapp && (
              <a
                className="botao botao-primario text-sm"
                href={linkWhatsapp(item.whatsapp, item.mensagemWhatsapp)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconeWhatsapp /> Falar pelo WhatsApp<span className="sr-only"> com {item.nome} (abre em nova aba)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
