import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { categoriaPorId, situacaoDaMidia } from '../data/atracoes';
import { linkWhatsapp, nomeCategoriaComercio } from '../data/comercio';
import type { Atracao, CategoriaComercioId, CategoriaId, Estabelecimento } from '../data/tipos';
import { IconeBicicleta, IconeCamera, IconeFolha, IconeFone, IconeIgreja, IconeLoja, IconeMapa, IconeSeta, IconeWhatsapp } from './Icones';
import { Imagem } from './Imagem';

/** Cor e ícone de cada categoria (texto sempre com contraste AA sobre o fundo). */
export const ESTILO_CATEGORIA: Record<CategoriaId, { chip: string; icone: (p: { width?: number; height?: number }) => ReactNode }> = {
  religioso: { chip: 'bg-[#f4b43a] text-[#0b3d2e]', icone: IconeIgreja },
  aventura: { chip: 'bg-[#a8471f] text-[#fffaf2]', icone: IconeBicicleta },
  natureza: { chip: 'bg-[#0b6e69] text-[#fffaf2]', icone: IconeFolha },
};

export function ChipCategoria({ id, className = '' }: { id: CategoriaId; className?: string }) {
  const e = ESTILO_CATEGORIA[id];
  const Icone = e.icone;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold shadow-sm ${e.chip} ${className}`}>
      <Icone width={16} height={16} /> {categoriaPorId(id).nome}
    </span>
  );
}

/** Card de ponto turístico: foto em destaque, texto sobre véu escuro, leva à página da atração. */
export function CardAtracao({
  atracao,
  nivelTitulo = 3,
  destaque = false,
  prioridade = false,
}: {
  atracao: Atracao;
  nivelTitulo?: 2 | 3;
  destaque?: boolean;
  prioridade?: boolean;
}) {
  const capa = atracao.fotografias.find((f) => f.arquivo) ?? atracao.fotografias[0];
  const midia = situacaoDaMidia(atracao);
  const Titulo = `h${nivelTitulo}` as 'h2' | 'h3';
  return (
    <article className={`cartao-foto group flex w-full flex-col justify-end bg-[#0b3d2e] ${destaque ? 'min-h-[26rem] sm:min-h-[34rem]' : 'min-h-[24rem]'}`}>
      <div className="absolute inset-0 -z-10">
        <Imagem
          foto={capa}
          decorativa
          compacto={!capa?.arquivo}
          prioridade={prioridade}
          className="foto h-full w-full"
          tamanhos={destaque ? '(min-width: 64rem) 50vw, 100vw' : '(min-width: 64rem) 25vw, (min-width: 40rem) 50vw, 100vw'}
        />
        <div className="veu absolute inset-0" />
      </div>
      <div className="absolute left-4 top-4"><ChipCategoria id={atracao.categoria} /></div>
      <div className="flex flex-col gap-2 bg-[linear-gradient(0deg,rgb(8_24_18/0.97)_0%,rgb(8_24_18/0.9)_78%,rgb(8_24_18/0)_100%)] p-5 pt-16 text-[#fbf4e8] sm:p-6 sm:pt-20">
        {atracao.local && <p className="text-sm font-bold text-[#f6c35a]">{atracao.local}</p>}
        <Titulo className={`font-semibold leading-tight ${destaque ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
          <Link
            href={`/pontos-turisticos/${atracao.slug}`}
            className="text-[#fbf4e8] no-underline after:absolute after:inset-0 after:content-['']"
          >
            {atracao.nome}
          </Link>
        </Titulo>
        <p className={`text-[#fbf4e8]/90 ${destaque ? 'max-w-xl' : 'line-clamp-3'}`}>{atracao.resumo}</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold" aria-label="Recursos disponíveis">
            <li className="flex items-center gap-1.5">
              <IconeCamera width={16} height={16} />
              {midia.fotos ? `${midia.fotos} ${midia.fotos === 1 ? 'foto' : 'fotos'}` : 'Fotos em breve'}
            </li>
            {midia.audios > 0 && (
              <li className="flex items-center gap-1.5">
                <IconeFone width={16} height={16} /> {midia.audios} {midia.audios === 1 ? 'audiodescrição' : 'audiodescrições'}
              </li>
            )}
          </ul>
          <span
            aria-hidden="true"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f4b43a] text-[#0b3d2e] transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-[-8deg]"
          >
            <IconeSeta />
          </span>
        </div>
      </div>
    </article>
  );
}

const ICONE_COMERCIO: Record<CategoriaComercioId, string> = {
  farmacia: 'bg-[#0b6e69]',
  hotel: 'bg-[#136f4f]',
  restaurante: 'bg-[#a8471f]',
  posto: 'bg-[#0b3d2e]',
  supermercado: 'bg-[#7a5418]',
};

/** Card de estabelecimento: ficha comercial, visual distinto do card turístico. */
export function CardEstabelecimento({ item }: { item: Estabelecimento }) {
  const mapa = item.linkMapa ?? (item.endereco
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.nome}, ${item.endereco}`)}`
    : undefined);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-linha bg-superficie shadow-[var(--sombra)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--sombra-alta)]">
      {item.fotografia ? (
        <div className="relative h-40 overflow-hidden">
          <img
            src={item.fotografia.arquivo}
            alt={item.fotografia.textoAlternativo}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="topografia-clara flex h-20 items-center gap-3 border-b border-dashed border-linha bg-superficie-2 px-5" aria-hidden="true">
          <span className={`grid h-11 w-11 place-items-center rounded-full text-[#fffaf2] ${ICONE_COMERCIO[item.categoria]}`}>
            <IconeLoja />
          </span>
          <span className="text-sm font-bold text-tinta-suave">Fotografia do estabelecimento em breve</span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-terra">
          {nomeCategoriaComercio(item.categoria)}
          {item.parceiro && <span className="rounded-full bg-terra-clara px-2 py-0.5 text-xs text-terra">Parceiro do projeto</span>}
        </p>
        <h3 className="text-2xl font-semibold">{item.nome}</h3>
        {item.descricao && <p className="text-tinta-suave">{item.descricao}</p>}
        {item.endereco && <p className="text-tinta-suave">{item.endereco}</p>}
        {(mapa || item.whatsapp) && (
          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            {item.whatsapp && (
              <a className="botao botao-primario text-sm" href={linkWhatsapp(item.whatsapp, item.mensagemWhatsapp)} target="_blank" rel="noopener noreferrer">
                <IconeWhatsapp /> Falar pelo WhatsApp<span className="sr-only"> com {item.nome} (abre em nova aba)</span>
              </a>
            )}
            {mapa && (
              <a className="botao botao-contorno text-sm" href={mapa} target="_blank" rel="noopener noreferrer">
                <IconeMapa /> Ver localização<span className="sr-only"> de {item.nome} (abre em nova aba)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
