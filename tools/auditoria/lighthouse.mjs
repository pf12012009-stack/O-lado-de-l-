// Lighthouse local (gratuito, sem chave de API). Somente leitura.
// Uso: node lighthouse.mjs <url> [mobile|desktop]
// Mostra notas e apenas as auditorias reprovadas, para economizar tokens.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const [url, perfil = 'mobile'] = process.argv.slice(2);
if (!url) {
  console.error('Uso: node lighthouse.mjs <url> [mobile|desktop]');
  process.exit(2);
}
const here = dirname(fileURLToPath(import.meta.url));
const chrome = process.env.CHROME_PATH
  || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const out = join(mkdtempSync(join(tmpdir(), 'lh-')), 'lh.json');
const args = [
  join(here, 'node_modules/lighthouse/cli/index.js'), url, '--quiet', '--output=json', `--output-path=${out}`,
  '--chrome-flags=--headless=new --no-sandbox',
  perfil === 'desktop' ? '--preset=desktop' : '--form-factor=mobile',
];
const r = spawnSync(process.execPath, args, {
  stdio: ['ignore', 'ignore', 'inherit'],
  env: { ...process.env, ...(chrome ? { CHROME_PATH: chrome } : {}) },
});
if (r.status !== 0 || !existsSync(out)) process.exit(r.status || 1);
const lhr = JSON.parse(readFileSync(out, 'utf8'));
console.log(`Lighthouse ${lhr.lighthouseVersion} — ${url} (${perfil})`);
for (const [k, c] of Object.entries(lhr.categories)) console.log(`- ${k}: ${Math.round(c.score * 100)}`);
const falhas = Object.values(lhr.audits).filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative');
console.log(`\nAuditorias abaixo de 90 (${falhas.length}):`);
for (const a of falhas) console.log(`- ${a.id}: ${a.title}${a.displayValue ? ' — ' + a.displayValue : ''}`);
console.log(`\nRelatório completo: ${out}`);
