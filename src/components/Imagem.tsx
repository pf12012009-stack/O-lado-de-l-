import type { Fotografia } from '../data/tipos';
import { srcsetDe } from '../lib/imagens';
import { IconeImagem } from './Icones';

interface Props {
  foto?: Fotografia;
  className?: string;
  /** Carregamento prioritário (imagem principal visível) */
  prioridade?: boolean;
  /** Imagem decorativa no contexto (ex.: card cujo título já nomeia o lugar) */
  decorativa?: boolean;
  tamanhos?: string;
  compacto?: boolean;
  /** 'cobrir' recorta para preencher (cards); 'inteira' mostra a foto completa (galeria) */
  ajuste?: 'cobrir' | 'inteira';
  /** Usa só a miniatura (miniaturas da galeria) */
  so_miniatura?: boolean;
}

/**
 * Mostra a fotografia original (com versões responsivas) ou, se ainda não foi enviada,
 * um espaço reservado claramente identificado (nunca uma imagem genérica).
 */
export function Imagem({ foto, className = '', prioridade, decorativa, tamanhos, compacto, ajuste = 'cobrir', so_miniatura }: Props) {
  if (foto?.arquivo) {
    const srcSet = so_miniatura ? undefined : srcsetDe(foto);
    return (
      <img
        src={so_miniatura && foto.miniatura ? foto.miniatura : foto.arquivo}
        srcSet={srcSet}
        sizes={srcSet ? tamanhos : undefined}
        alt={decorativa ? '' : foto.textoAlternativo ?? foto.titulo}
        width={foto.largura}
        height={foto.altura}
        loading={prioridade ? 'eager' : 'lazy'}
        fetchPriority={prioridade ? 'high' : 'auto'}
        decoding="async"
        className={`${ajuste === 'inteira' ? 'object-contain' : 'object-cover'} ${className}`}
      />
    );
  }
  return (
    <div
      className={`reservado flex flex-col items-center justify-center gap-1 p-3 text-center text-tinta-suave ${className}`}
      role={decorativa ? undefined : 'img'}
      aria-hidden={decorativa ? true : undefined}
      aria-label={decorativa ? undefined : `Espaço reservado: ${foto?.titulo ?? 'fotografia'} ainda não foi enviada`}
    >
      <IconeImagem width={compacto ? 18 : 32} height={compacto ? 18 : 32} />
      {!compacto && (
        <>
          <span className="font-bold">Fotografia em breve</span>
          <span className="text-sm">A imagem original será adicionada pelo projeto</span>
        </>
      )}
    </div>
  );
}
