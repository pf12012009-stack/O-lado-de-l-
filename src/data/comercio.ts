import type { CategoriaComercioId, Estabelecimento } from './tipos';

export const CATEGORIAS_COMERCIO: { id: CategoriaComercioId; nome: string }[] = [
  { id: 'alimentacao', nome: 'Alimentação' },
  { id: 'hospedagem', nome: 'Hospedagem' },
  { id: 'compras', nome: 'Compras' },
  { id: 'servicos', nome: 'Serviços' },
  { id: 'lazer', nome: 'Lazer' },
];

/**
 * Estabelecimentos parceiros e do comércio local.
 * Só cadastre dados reais, enviados pelo próprio estabelecimento ou pelo projeto.
 * Nunca crie estabelecimentos, patrocinadores, contatos ou avaliações fictícios.
 */
export const ESTABELECIMENTOS: Estabelecimento[] = [];

export function nomeCategoriaComercio(id: CategoriaComercioId): string {
  return CATEGORIAS_COMERCIO.find((c) => c.id === id)?.nome ?? id;
}
