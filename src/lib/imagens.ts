import { atracaoPorSlug } from '../data/atracoes';
import type { Fotografia } from '../data/tipos';

/**
 * Conjunto de versões de uma foto para o navegador escolher a menor suficiente:
 * miniatura (lado maior 640), intermediária (lado maior 1024, quando a original passa de 1100) e original.
 */
export function srcsetDe(f: Pick<Fotografia, 'arquivo' | 'miniatura' | 'largura' | 'altura'>): string | undefined {
  if (!f.arquivo || !f.largura || !f.altura) return undefined;
  const maior = Math.max(f.largura, f.altura);
  const larg = (lado: number) => Math.round((f.largura! * lado) / maior);
  const partes: string[] = [];
  if (f.miniatura) partes.push(`${f.miniatura} ${larg(640)}w`);
  if (maior > 1100) partes.push(`${f.arquivo.replace(/\.webp$/, '-1024.webp')} ${larg(1024)}w`);
  partes.push(`${f.arquivo} ${f.largura}w`);
  return partes.join(', ');
}

/** Fotografia original de uma atração pelo id (para banners e topos). */
export function fotoDe(slug: string, id: string): Fotografia | undefined {
  return atracaoPorSlug(slug)?.fotografias.find((f) => f.id === id);
}
