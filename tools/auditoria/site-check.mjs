// Auditoria rápida e somente leitura de páginas do site.
// Uso: node site-check.mjs <url-base> [caminho1 caminho2 ...]
// Ex.: node site-check.mjs http://localhost:5173 / /destinos
// Verifica: axe-core (WCAG 2.0/2.1/2.2 A e AA), imagens sem alt, áudio/vídeo
// sem controles ou sem alternativa textual, links quebrados (mesma origem),
// título, meta description, lang, h1, rolagem horizontal no celular e erros
// de console. Não altera nada no site. Saída curta para economizar tokens.
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { existsSync } from 'node:fs';

const [base, ...paths] = process.argv.slice(2);
if (!base) {
  console.error('Uso: node site-check.mjs <url-base> [caminhos...]');
  process.exit(2);
}
const pages = paths.length ? paths : ['/'];
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium';
const launchOpts = existsSync(CHROME) ? { executablePath: CHROME } : {};
const VIEWPORTS = { celular: { width: 375, height: 812 }, desktop: { width: 1280, height: 800 } };
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const browser = await chromium.launch(launchOpts);
let totalProblemas = 0;
const linksVerificados = new Map();

for (const path of pages) {
  const url = new URL(path, base).href;
  for (const [nome, viewport] of Object.entries(VIEWPORTS)) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const consoleErros = [];
    page.on('console', (m) => m.type() === 'error' && consoleErros.push(m.text().slice(0, 160)));
    page.on('pageerror', (e) => consoleErros.push(String(e).slice(0, 160)));
    const resp = await page.goto(url, { waitUntil: 'networkidle' }).catch((e) => ({ err: e }));
    const problemas = [];
    if (!resp || resp.err || !resp.ok()) {
      problemas.push(`página não carregou (${resp?.err?.message?.slice(0, 80) ?? resp?.status()})`);
    } else {
      const info = await page.evaluate(() => {
        const q = (s) => [...document.querySelectorAll(s)];
        return {
          lang: document.documentElement.lang,
          titulo: document.title,
          descricao: document.querySelector('meta[name="description"]')?.content ?? '',
          h1: q('h1').length,
          imgSemAlt: q('img:not([alt])').map((i) => i.currentSrc || i.src).slice(0, 10),
          imgQuebrada: q('img').filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src).slice(0, 10),
          midiaSemControles: q('audio:not([controls]),video:not([controls])').filter((m) => !m.closest('section')?.querySelector('button')).length,
          videoSemLegenda: q('video').filter((v) => !v.querySelector('track[kind="captions"],track[kind="subtitles"]')).length,
          audios: q('audio').length,
          overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
          links: q('a[href]').map((a) => a.href).filter((h) => h.startsWith(location.origin)),
        };
      });
      if (!info.lang) problemas.push('<html> sem atributo lang');
      if (!info.titulo) problemas.push('página sem <title>');
      if (!info.descricao) problemas.push('sem meta description');
      if (info.h1 !== 1) problemas.push(`${info.h1} elementos <h1> (esperado 1)`);
      if (info.imgSemAlt.length) problemas.push(`imagens sem alt: ${info.imgSemAlt.join(', ')}`);
      if (info.imgQuebrada.length) problemas.push(`imagens quebradas: ${info.imgQuebrada.join(', ')}`);
      if (info.midiaSemControles) problemas.push(`${info.midiaSemControles} áudio/vídeo sem controles`);
      if (info.videoSemLegenda) problemas.push(`${info.videoSemLegenda} vídeo(s) sem faixa de legenda`);
      if (info.audios) problemas.push(`AVISO manual: ${info.audios} áudio(s) — confirmar transcrição/audiodescrição textual próxima`);
      if (nome === 'celular' && info.overflowX) problemas.push('rolagem horizontal em 375px');
      if (nome === 'celular') {
        for (const href of new Set(info.links)) {
          const alvo = href.split('#')[0];
          if (linksVerificados.has(alvo)) continue;
          const r = await page.request.get(alvo).catch(() => null);
          linksVerificados.set(alvo, r ? r.status() : 'erro');
          if (!r || r.status() >= 400) problemas.push(`link quebrado: ${alvo} (${r ? r.status() : 'erro'})`);
        }
      }
      const axe = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
      for (const v of axe.violations) {
        problemas.push(`axe[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length}x) ${v.nodes[0]?.target?.join(' ') ?? ''}`);
      }
      if (consoleErros.length) problemas.push(`erros de console: ${consoleErros.slice(0, 3).join(' | ')}`);
    }
    totalProblemas += problemas.filter((p) => !p.startsWith('AVISO')).length;
    console.log(`\n## ${path} [${nome}] — ${problemas.length ? problemas.length + ' item(ns)' : 'OK'}`);
    for (const p of problemas) console.log(`- ${p}`);
    await context.close();
  }
}
await browser.close();
console.log(`\nTotal de problemas: ${totalProblemas}. axe cobre ~30-40% dos critérios WCAG: teste manual com teclado e leitor de tela continua obrigatório.`);
process.exit(totalProblemas ? 1 : 0);
