// Confere a integração das mídias: cada fotografia com imagem, texto alternativo,
// descrição textual e audiodescrição, e se os arquivos existem em /public.
// Uso: npm run build (uma vez) e depois npm run check:midia
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const { ATRACOES } = await import(pathToFileURL(join(raiz, 'dist-ssr/entry-server.js')).href);
const existe = (p) => existsSync(join(raiz, 'public', p));
let erros = 0;

for (const a of ATRACOES) {
  console.log(`\n${a.nome} (${a.fotografias.length} fotografias)`);
  for (const f of a.fotografias) {
    const falta = [];
    if (!f.arquivo) falta.push('imagem');
    else if (!existe(f.arquivo)) { falta.push(`arquivo de imagem não encontrado: ${f.arquivo}`); erros++; }
    if (f.arquivo && !f.textoAlternativo) { falta.push('texto alternativo'); erros++; }
    if (!f.descricaoTextual?.length) falta.push('descrição textual');
    if (!f.audiodescricao) falta.push('audiodescrição');
    else if (!existe(f.audiodescricao.arquivo)) { falta.push(`áudio não encontrado: ${f.audiodescricao.arquivo}`); erros++; }
    console.log(`  ${f.id} ${f.titulo}: ${falta.length ? 'falta ' + falta.join(', ') : 'completa'}`);
  }
}
console.log(erros ? `\n${erros} erro(s) de integração.` : '\nNenhum erro de integração (itens "falta" são material ainda não enviado).');
process.exit(erros ? 1 : 0);
