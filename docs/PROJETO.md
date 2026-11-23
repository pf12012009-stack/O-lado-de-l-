# O Lado de Lá Turismo — referência do projeto

> Fonte: apresentação do responsável pelo projeto (2026-11-23). Código original ainda não recebido. Tudo abaixo precisa ser confirmado no código real antes de qualquer mudança.

## Propósito
Plataforma de **turismo virtual, conhecimento, inclusão e acessibilidade** que divulga pontos turísticos e lugares de **Alto Piquiri (PR)**.
Lema: *"Porque conhecer o mundo não deveria depender de dinheiro, distância ou condições físicas."*
Público: quem não pode viajar (por dinheiro, limitação física, mobilidade reduzida, cadeira de rodas ou distância) e curiosos.
**Não é agência de viagens.** Não vende passagens, pacotes nem passeios.

## Estrutura
```
Página inicial (identidade + categorias)
  └─ Cards de pontos turísticos → Página individual da atração
        └─ Galeria (foto principal + miniaturas)
              └─ por foto: Descrição textual  |  Audiodescrição   (dois recursos separados)
Comércio local (área independente e complementar)
  └─ Categorias → Cards de estabelecimentos → informações, endereço, Google Maps, WhatsApp
Institucional: Sobre, Contato
```
Categorias turísticas conhecidas: **turismo religioso** (ex.: Santuário São José, capelas) e **turismo de aventura** (ex.: Ciclorrota Pedal das Águas). Pode haver outras.

## Componentes-chave
- **Card turístico**: foto representativa, nome, descrição curta, categoria e chamada "conhecer mais". Leva à página individual. Não juntar todas as atrações numa página só.
- **Página da atração**: nome, foto principal, galeria com miniaturas, descrições textuais, audiodescrições, informações, localização e mapa (quando houver). Cada atração tem identidade e conteúdo próprios.
- **Galeria**: clicar numa miniatura troca a imagem principal. Requisitos: imagens grandes e nítidas, toque no celular, transições suaves, carregamento otimizado e leitor de tela. Nunca trocar, remover ou degradar sem necessidade as fotos originais (são patrimônio do projeto).
- **Descrição textual**: texto que descreve os elementos visuais relevantes da foto. Não pode ser um título ou uma frase genérica. Atende pessoas surdas, quem prefere ler e quem usa leitor de tela.
- **Audiodescrição**: narração **gravada** em áudio para pessoas cegas e com baixa visão. Preservar o player (reproduzir, pausar, controles, velocidade quando existir) e a identificação do que é narrado.
- **Regra dos dois recursos**: são independentes. O visitante escolhe ler ou ouvir. Não juntar num botão genérico. Não substituir a audiodescrição por leitura automática do texto (TTS).
- **Card comercial**: nome, foto, categoria, descrição, endereço, Google Maps e WhatsApp (quando configurado). Visual próprio, distinto do card turístico. Valoriza o comércio local sem virar loja.
- **Mapas**: links do Google Maps e endereços complementam a galeria, não a substituem. Verificar dependências externas antes de mexer.
- **Sobre / Contato**: manter os canais existentes. Nunca inventar telefone, e-mail ou rede social.

## Stack informada (confirmar no código)
React 19, TypeScript, Vite, Tailwind CSS, Wouter (rotas), Node.js, Drizzle ORM (preparado para MySQL), pré-renderização de páginas, configurações para Netlify e Vercel. Pode haver backend, autenticação, mídia dinâmica e integrações externas. Não presumir que estejam configurados ou funcionando.

## Requisitos transversais
- Acessibilidade WCAG 2.2 AA em **todo** o site: contraste, fontes legíveis, botões com nomes claros, teclado, HTML semântico, leitor de tela, alt, controles de áudio acessíveis, hierarquia de títulos.
- Celular em primeiro lugar: cards adaptáveis, galeria por toque, alvos grandes, menu simples, player acessível, sem rolagem horizontal. Também tablet e computador.
- Evolução visual: mais bonito, moderno, profissional, acolhedor e confiável, **sem template genérico** e sem perder a identidade.

## Proibido
Virar agência ou vender pacotes; eliminar o comércio local; confundir estabelecimento com atração; remover galerias, fotos, descrições textuais ou audiodescrições; misturar os dois recursos; inventar atrações, estabelecimentos, patrocinadores, avaliações, preços, endereços, contatos, distâncias, horários, regras de percurso, datas, histórias ou informações religiosas; trocar conteúdo real por fictício; remover conteúdo sem autorização; contratar serviços pagos; publicar sem autorização.

## Plano para quando o código chegar
1. `graphify update .` e análise da arquitetura real.
2. Inventário: páginas e rotas, componentes, cards turísticos, cards comerciais, galerias, descrições textuais, players de audiodescrição, mapas e WhatsApp, origem dos dados (estáticos ou banco).
3. Auditoria: acessibilidade, design e navegação, desempenho (fotos e áudios), SEO e segurança (formulários, autenticação, chaves).
4. Proposta de evolução priorizada, apresentada para aprovação **antes** de qualquer mudança.
