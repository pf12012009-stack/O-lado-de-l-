# Router — distribuição de tarefas

O Claude Code principal é sempre o coordenador. Leia este arquivo só para tarefas médias/grandes.

## 1. Classificar o tamanho
| Tamanho | Exemplo | Ação |
|---|---|---|
| Pequena | 1–2 arquivos, ajuste pontual, pergunta | Resolver direto, sem agentes |
| Média | 1 área (ex.: acessibilidade de uma página) | 1 agente especialista |
| Grande | várias áreas ou auditoria geral | 2–3 agentes, em etapas (abaixo) |

## 2. Escolher o agente (palavra-chave → agente)
| Pedido | Agente | Edita? |
|---|---|---|
| layout, cores, tipografia, visual, identidade, UX, responsivo | `designer` | sim (se autorizado) |
| React, TypeScript, componente, bug, funcionalidade, estrutura | `frontend-dev` | sim |
| WCAG, leitor de tela, teclado, alt, audiodescrição, contraste, surdos/cegos | `acessibilidade` | não |
| SEO, metadados, título, indexação, sitemap, robots | `seo` | não |
| lento, imagens/áudios pesados, Core Web Vitals, celular fraco | `performance` | não |
| testar, verificar correção, erro, navegação, formulário, galeria | `testes` | só testes |
| vulnerabilidade, XSS, segredo, dependência | nenhum agente: use `/claude-security` ou `/seguranca` | não |

## 3. Regras de coordenação
- Ordem de prioridade: Segurança > Acessibilidade > Qualidade do código > Design > Desempenho > SEO > Economia de tokens.
- Auditores (`acessibilidade`, `seo`, `performance`) podem rodar em paralelo: não editam.
- Quem edita (`designer`, `frontend-dev`) roda um por vez, ou em paralelo só com listas de arquivos disjuntas definidas pelo coordenador.
- Fluxo padrão de tarefa grande: auditores → coordenador consolida e pede autorização → `frontend-dev`/`designer` implementam → `testes` verifica.
- Prompt para o agente: objetivo + arquivos relevantes (do Graphify) + limites. Não repasse a conversa inteira.
- Não peça a dois agentes a mesma análise. Reaproveite relatórios já recebidos.
- Resultado final ao usuário: resumo curto consolidado pelo coordenador.
