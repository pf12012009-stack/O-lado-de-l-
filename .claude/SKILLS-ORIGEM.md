# Origem das Skills e ferramentas (instaladas em 2026-11-23)

| Skill (`.claude/skills/`) | Repositório @ commit | Licença |
|---|---|---|
| frontend-design, webapp-testing | anthropics/skills @ e4bb5d9 | Apache-2.0 |
| a11y-code-review, wcag-guide, a11y-testing-coach, design-system-a11y | joedevon/a11y-skills @ 58607bf | MIT (declarada no README; o repositório não tem arquivo LICENSE) |
| react-best-practices, composition-patterns, web-design-guidelines | vercel-labs/agent-skills @ 5a37a63 | MIT |
| frontend-doctor | MikelMartinC/frontend-doctor @ 55c9800 | MIT |
| accessibility, web-quality-audit, core-web-vitals, performance, best-practices, seo | addyosmani/web-quality-skills @ afa8da9 | MIT |
| graphify | gerada por `graphify install --project` (graphifyy 0.9.118) | Apache-2.0 |

Revisão de segurança: só há scripts locais e somente leitura (`web-quality-audit/scripts/analyze.sh`, `webapp-testing/scripts/with_server.py`). Nenhum depende de serviço pago. `web-design-guidelines/references/command.md` confere com o SHA-256 publicado.

Não instaladas (motivo):
- Vercel `deploy-to-vercel`, `vercel-cli-with-tokens`, `vercel-optimize`: fazem deploy ou exigem conta/métricas da Vercel (publicar é proibido; pode gerar cobrança).
- Vercel `react-native-skills`, a11y `mobile-a11y`: voltadas a apps nativos; o projeto é web.
- Vercel `react-view-transitions`, `writing-guidelines`; a11y `document-a11y`, `markdown-a11y`; demais Skills da Anthropic (docx, pptx, canvas…): fora do escopo do site.
- Plugin `frontend-design` (marketplace oficial): duplicaria a Skill `frontend-design`.

Plugins (marketplace `anthropics/claude-plugins-official`, escopo de projeto): `claude-security` 0.12.0, `security-guidance` 2.0.21 (Apache-2.0).
Para atualizar uma Skill: clonar o repositório, revisar o diff e copiar a pasta. Nunca baixar sem revisar.
