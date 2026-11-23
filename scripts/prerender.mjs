// Pré-renderiza cada rota em HTML estático (bom para SEO, compartilhamento e leitores de tela).
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');
const { rotas, renderizar } = await import(pathToFileURL(join(raiz, 'dist-ssr/entry-server.js')).href);
const modelo = readFileSync(join(dist, 'index.html'), 'utf8');
const site = (process.env.SITE_URL || '').replace(/\/$/, '');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function pagina(caminho, titulo, descricao) {
  const canon = site ? `<link rel="canonical" href="${site}${caminho}" />\n    <meta property="og:url" content="${site}${caminho}" />` : '';
  const cabeca = `${canon}
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="O Lado de Lá Turismo" />
    <meta property="og:title" content="${esc(titulo)}" />
    <meta property="og:description" content="${esc(descricao)}" />`;
  return modelo
    .replace(/<title>.*?<\/title>/, `<title>${esc(titulo)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${esc(descricao)}" />`)
    .replace('<!--cabeca-->', cabeca)
    .replace('<div id="raiz">', `<div id="raiz" data-caminho="${caminho}">`)
    .replace('<!--app-->', renderizar(caminho));
}

const lista = rotas();
for (const r of lista) {
  const arquivo = r.caminho === '/' ? join(dist, 'index.html') : join(dist, r.caminho, 'index.html');
  mkdirSync(dirname(arquivo), { recursive: true });
  const html = pagina(r.caminho, r.titulo, r.descricao);
  writeFileSync(arquivo, html);
  // Cópia em /caminho.html para servidores que não resolvem /caminho -> /caminho/index.html
  if (r.caminho !== '/') writeFileSync(join(dist, `${r.caminho}.html`), html);
}
writeFileSync(join(dist, '404.html'), pagina('/404', 'Página não encontrada | O Lado de Lá Turismo', 'Esta página não existe.').replace('<head>', '<head>\n    <meta name="robots" content="noindex" />'));

if (site) {
  const urls = lista.map((r) => `  <url><loc>${site}${r.caminho}</loc></url>`).join('\n');
  writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
} else {
  writeFileSync(join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n');
  console.warn('Aviso: SITE_URL não definido; sitemap.xml e links canônicos não foram gerados.');
}
console.log(`Pré-renderizadas ${lista.length} páginas + 404.`);
