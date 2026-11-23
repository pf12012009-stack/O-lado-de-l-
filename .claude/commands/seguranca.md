---
description: "Varredura de segurança gratuita (dependências, segredos, XSS, injeção, rotas e formulários) sem corrigir automaticamente"
argument-hint: "[rapida|completa]"
---
Varredura de segurança do projeto. Modo: $ARGUMENTS (padrão: rapida).

1. Dependências: em cada pasta com package-lock.json, `npm audit --omit=dev` (e `npm audit` completo no modo completa).
2. Segredos: `git grep -nIE "(api[_-]?key|secret|token|password|senha|BEGIN (RSA|EC|OPENSSH) PRIVATE KEY|AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9]{20,})"` e verifique se `.env*` está no .gitignore. Nunca imprima o valor de um segredo encontrado: só arquivo:linha.
3. Código: procure `dangerouslySetInnerHTML`, `innerHTML`, `eval(`, `new Function(`, `target="_blank"` sem `rel`, URLs montadas com entrada do usuário, chaves de serviço no frontend, regras de acesso (Supabase/Firebase RLS) e validação de formulários.
4. Modo completa: use `/claude-security` (escopo e esforço confirmados pelo usuário, pois consome uso).
5. Relatório ≤ 20 linhas: gravidade | arquivo:linha | risco | correção recomendada. Não aplique correções que alterem funcionalidades sem autorização.
Não ataque sistemas de terceiros e não exponha dados pessoais.
