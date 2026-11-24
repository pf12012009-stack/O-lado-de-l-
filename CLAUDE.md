# O Lado de Lá Turismo — regras permanentes

Plataforma de **turismo virtual, conhecimento, inclusão e acessibilidade**. Não é agência de viagens: não vende passeios nem pacotes.
Pontos turísticos de **Alto Piquiri (PR)**. Referência completa: `docs/PROJETO.md` (leia antes de tarefas de produto, design ou conteúdo).
Essenciais: **descrição textual ≠ audiodescrição** (narração gravada). São recursos independentes por foto; nunca juntar nem trocar por TTS. **Atração turística ≠ estabelecimento comercial** (cards e áreas distintos). Galerias e fotos originais são patrimônio.
Prioridade: 1 Segurança · 2 Acessibilidade · 3 Qualidade do código · 4 Design · 5 Desempenho · 6 SEO · 7 Economia de tokens.

## Proteção do projeto (nunca, sem autorização explícita)
- Apagar arquivos, páginas, imagens, áudios, audiodescrições ou descrições textuais; remover qualquer conteúdo.
- Modificar banco de dados, trocar autenticação, alterar hospedagem, publicar/deploy.
- Fazer alterações visuais (esta etapa é só de ambiente).
- Inventar histórias, datas, endereços, horários, preços, informações turísticas ou dados de estabelecimentos. Na dúvida: "a confirmar".
- Corrigir automaticamente falhas de segurança que mudem funcionalidade: primeiro explique e proponha.
- Instalar/ativar ferramenta paga, assinatura, API paga ou serviço externo com cobrança.

## Fluxo de trabalho
1. **Mapa primeiro**: para investigar partes grandes, use o Graphify (seção abaixo) antes de grep/leitura.
2. Leia só os arquivos e linhas necessários; não releia o que já foi compreendido.
3. **Tarefa pequena**: resolva direto. **Média/grande**: siga `.claude/ROUTER.md` e acione só os agentes necessários.
4. Carregue Skills apenas quando a tarefa pedir (tabela abaixo); nunca todas de uma vez.
5. Preserve funcionalidades; teste toda alteração (typecheck/lint/testes do projeto + `tools/auditoria`). Não diga que funciona sem testar.
6. Depois de mudança estrutural (arquivos/componentes/rotas novos ou movidos): `graphify update .`
7. Respostas e relatórios curtos e objetivos; sem análises repetidas.

## Site (código)
- Stack: React 19, TypeScript, Vite, Tailwind 4, Wouter, pré-renderização (`scripts/prerender.mjs`). Sem backend por enquanto.
- Conteúdo: `src/data/` (atracoes, comercio, site, fontes, midia-original). Todo fato tem fonte. Integração de mídia: `docs/MIDIA.md`.
- Identidade visual ("janela para o lado de lá"): tokens em `src/styles/global.css` (mata, floresta, tijolo, sol, turquesa, creme), arco do Santuário (`.arco`), curvas de nível (`.topografia`). Texto sobre foto precisa de 4,5:1: use o véu dos cards ou `TopoFoto`. Animações só com transform e sempre respeitando `prefers-reduced-motion`.
- Imagens: `srcsetDe()` em `src/lib/imagens.ts`; em fundos escurecidos no celular, use `sizes` pequenos (240px).
- Comandos: `npm run dev` · `npm test` · `npm run typecheck` · `npm run build` · `npm run check:midia` · `npx vite preview --port 4173`.

## Skills (`.claude/skills/`, sob demanda)
| Área | Skills |
|---|---|
| Design/Frontend | `frontend-design`, `frontend-doctor`, `web-design-guidelines`, `react-best-practices`, `composition-patterns` |
| Acessibilidade | `a11y-code-review` (principal), `wcag-guide`, `a11y-testing-coach`, `design-system-a11y`, `accessibility` |
| SEO/Desempenho | `seo`, `performance`, `core-web-vitals`, `web-quality-audit`, `best-practices` |
| Testes | `webapp-testing` (use o Playwright do Node já instalado; não rode `playwright install`) |
| Mapa | `graphify` |

## Agentes (`.claude/agents/`)
`designer`, `frontend-dev` (editam) · `acessibilidade`, `seo`, `performance` (somente leitura) · `testes` (só arquivos de teste).

## Comandos
- `/auditoria <url>` — auditoria geral sem alterar nada.
- `/seguranca [rapida|completa]` — npm audit, segredos, XSS/injeção, rotas/formulários.
- `/claude-security` — varredura profunda (plugin oficial; confirme custo de uso antes).
- `/security-review` — revisão de segurança do diff atual (nativo do Claude Code).
- `/mapa` — gera/atualiza o grafo.
- Scripts: `node tools/auditoria/site-check.mjs <url> [caminhos]` e `node tools/auditoria/lighthouse.mjs <url> [mobile|desktop]`.

## Ambiente
- Ferramentas locais: `graphify` (`uv tool install "graphifyy[mcp]==0.9.118"`), dependências de `tools/auditoria` (`PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci`).
- `GRAPHIFY_BACKEND=none`: grafo só por AST, sem LLM e sem custo. Não usar Graphify Cloud.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. When the answer is under a Markdown heading, `graphify section "<heading>"` prints that section's text, so the .md need not be opened. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
