import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { ATRACOES, CATEGORIAS } from '../src/data/atracoes';
import { ESTABELECIMENTOS } from '../src/data/comercio';
import { CIDADE } from '../src/data/site';

describe('Integridade do conteúdo', () => {
  it('slugs de atrações são únicos e cada atração tem categoria válida', () => {
    const slugs = ATRACOES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const a of ATRACOES) expect(CATEGORIAS.map((c) => c.id)).toContain(a.categoria);
  });

  it('cada fotografia tem id único na atração (liga imagem, texto e áudio)', () => {
    for (const a of ATRACOES) {
      const ids = a.fotografias.map((f) => f.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('toda foto publicada tem texto alternativo', () => {
    for (const a of ATRACOES) for (const f of a.fotografias) if (f.arquivo) expect(f.textoAlternativo, `${a.slug}/${f.id}`).toBeTruthy();
  });

  it('todo fato informado tem fonte com link https', () => {
    for (const fato of [...CIDADE.fatos, ...ATRACOES.flatMap((a) => a.fatos)]) {
      expect(fato.fonte.url).toMatch(/^https:\/\//);
    }
  });

  it('nenhum estabelecimento tem WhatsApp em formato inválido', () => {
    for (const e of ESTABELECIMENTOS) if (e.whatsapp) expect(e.whatsapp).toMatch(/^\d{12,13}$/);
  });

  it('o site nunca usa voz sintetizada no lugar da audiodescrição', () => {
    const arquivos: string[] = [];
    const varrer = (d: string) => {
      for (const n of readdirSync(d)) {
        const p = join(d, n);
        if (statSync(p).isDirectory()) varrer(p);
        else arquivos.push(p);
      }
    };
    varrer('src');
    for (const p of arquivos) expect(readFileSync(p, 'utf8'), p).not.toMatch(/speechSynthesis|SpeechSynthesisUtterance/);
  });
});
