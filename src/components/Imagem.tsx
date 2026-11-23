import type { Fotografia } from '../data/tipos';
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
}

/**
 * Mostra a fotografia original ou, se ainda não foi enviada,
 * um espaço reservado claramente identificado (nunca uma imagem genérica).
 */
export function Imagem({ foto, className = '', prioridade, decorativa, tamanhos, compacto, ajuste = 'cobrir' }: Props) {
  if (foto?.arquivo) {
    return (
      <img
        src={foto.arquivo}
        alt={decorativa ? '' : foto.textoAlternativo ?? foto.titulo}
        width={foto.largura}
        height={foto.altura}
        loading={prioridade ? 'eager' : 'lazy'}
        fetchPriority={prioridade ? 'high' : 'auto'}
        decoding="async"
        sizes={tamanhos}
        className={`${ajuste === 'inteira' ? 'object-contain bg-superficie-2' : 'object-cover'} ${className}`}
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
          <span className="font-bold">Espaço reservado</span>
          <span className="text-sm">A fotografia original será adicionada pelo projeto</span>
        </>
      )}
    </div>
  );
}
