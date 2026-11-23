---
description: "Auditoria geral do site (visual, funcionamento, acessibilidade, desempenho, SEO) sem alterar nada"
argument-hint: "<url-do-site-rodando> [caminhos...]"
---
Faça uma auditoria somente leitura do site em: $ARGUMENTS

1. Se não houver URL, descubra o comando de dev em package.json, rode-o em segundo plano e use a URL local. Pare o servidor ao terminar.
2. Rode `node tools/auditoria/site-check.mjs <url> <caminhos>` (instale antes com `cd tools/auditoria && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci` se faltar node_modules).
3. Rode `node tools/auditoria/lighthouse.mjs <url> mobile` na página inicial e em 1 página interna.
4. Siga `.claude/skills/web-quality-audit/SKILL.md` só para interpretar o que os números não cobrem.
5. Se houver muitos itens de acessibilidade, acione o agente `acessibilidade` com a lista (não repita os testes).
6. Relatório final ≤ 30 linhas: Visual | Funcionamento | Acessibilidade | Desempenho | SEO, cada item com gravidade e arquivo. Não corrija nada sem autorização.
