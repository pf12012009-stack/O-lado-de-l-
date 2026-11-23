// Gera uma prévia em ARQUIVO ÚNICO (HTML + CSS + JS + fontes embutidos) para visualização privada.
// Não é deploy. Uso: npm run previa -- <arquivo-de-saida.html>
import { execSync } from 'node:child_process';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const saida = process.argv[2] || join(raiz, 'dist-previa', 'previa.html');
const env = { ...process.env, VITE_PREVIA: '1' };
execSync('npx vite build --outDir dist-previa --emptyOutDir', { cwd: raiz, env, stdio: 'inherit' });
execSync('npx vite build --ssr src/entry-server.tsx --outDir dist-previa-ssr --emptyOutDir', { cwd: raiz, env, stdio: 'inherit' });

const assets = join(raiz, 'dist-previa', 'assets');
const ler = (ext) => readdirSync(assets).filter((f) => f.endsWith(ext)).map((f) => readFileSync(join(assets, f), 'utf8')).join('\n');
const css = ler('.css');
const js = ler('.js').replace(/<\/script/gi, '<\\/script');
const { renderizar } = await import(pathToFileURL(join(raiz, 'dist-previa-ssr', 'entry-server.js')).href);
const fav = readFileSync(join(raiz, 'public', 'favicon.svg'), 'base64');

const html = `<title>O Lado de Lá Turismo</title>
<meta name="description" content="Prévia privada do site O Lado de Lá Turismo.">
<link rel="icon" href="data:image/svg+xml;base64,${fav}">
<style>${css}</style>
<div id="raiz" data-caminho="/">${renderizar('/')}</div>
<script type="module">${js}</script>
`;
writeFileSync(saida, html);
console.log(`Prévia gerada: ${saida} (${(html.length / 1024).toFixed(0)} KB)`);
