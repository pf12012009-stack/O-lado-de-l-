# Integração de fotografias, descrições textuais e audiodescrições

> **Situação (2026-11-24):** o material original do site antigo foi importado: 21 fotografias, as descrições textuais e 17 audiodescrições. Os dados ficam em `src/data/midia-original.ts` e os arquivos em `public/midia/atracoes/`. Não foi importado o áudio `santuario-fachada-exemplo.wav`, que parece ser de exemplo. Sem audiodescrição: fachada e São José com o Menino Jesus (Santuário), Rio Piquiri e a abertura da ciclorrota. Quando o pacote novo chegar, substitua os arquivos com o mesmo nome e rode `npm run check:midia`.
>
> Cada foto precisa de 3 versões WebP: `<id>.webp` (lado maior 1600), `<id>-1024.webp` (quando a original passa de 1100 px) e `<id>-640.webp` (miniatura).

Cada fotografia fica em `src/data/atracoes.ts`, dentro de `fotografias`, e já tem um `id` igual ao nome do arquivo no site antigo (ex.: `sao-miguel-arcanjo`, `fachada`). Esse `id` liga os três materiais da mesma foto.

## 1. Onde colocar os arquivos
```
public/midia/atracoes/<slug-da-atracao>/<id>.webp   ← imagem
public/midia/atracoes/<slug-da-atracao>/<id>.mp3    ← audiodescrição narrada
```
Slugs: `santuario-sao-jose` (7 fotos), `capela-nossa-senhora-aparecida` (9), `capela-santo-antonio` (3), `rio-piquiri` (1), `rio-guere` (0), `pedal-das-aguas` (1).
Libras: preencha `libras: { video: '/midia/atracoes/<slug>/libras.mp4', legendas?: '….vtt', interprete?: 'Nome' }` na atração.

## 2. Como preencher cada fotografia
```ts
{
  id: 'fachada',
  titulo: 'Fachada do Santuário Diocesano São José',  // título curto
  arquivo: '/midia/atracoes/santuario-sao-jose/fachada.webp',
  largura: 1600, altura: 1067,                        // evita salto de layout
  textoAlternativo: 'Fachada do Santuário São José…', // alt curto (1–2 frases)
  descricaoTextual: ['Primeiro parágrafo…', 'Segundo parágrafo…'], // texto completo
  audiodescricao: { arquivo: '/midia/atracoes/santuario-sao-jose/fachada.mp3', narracao: 'Nome de quem narra (opcional)' },
  credito: 'Autor da foto (opcional)',
}
```
- Faltou algum material? Deixe o campo vazio. O site mostra "em preparação" naquele ponto, sem inventar nada.
- Fotos novas: acrescente `['id', 'Título']` na lista `fotos([...])` da atração.
- Descrição textual e audiodescrição são recursos separados. Não converter texto em voz sintética.

## 3. Formatos recomendados (sem perder qualidade visível)
- Imagem: WebP ou AVIF, 1600–2000 px no lado maior, qualidade de 80 a 85. Guarde o original fora do site.
- Áudio: MP3 mono, de 64 a 96 kbps (voz). Opcional: `arquivoAlternativo` em .ogg ou .m4a.

## 4. Conferir
```bash
npm run build && npm run check:midia
```
O comando lista o que falta em cada fotografia e acusa erro se algum arquivo indicado não existir ou se uma foto publicada estiver sem texto alternativo.

## 5. Comércio local e contato
- Estabelecimentos: `src/data/comercio.ts` (somente dados reais). Foto do estabelecimento: `fotografia: { arquivo, textoAlternativo }`.
- Canais oficiais: `CANAIS` em `src/data/site.ts`.
- Atenção: no site antigo o áudio do Santuário era `santuario-fachada-exemplo.wav` (6 s), que parece arquivo de exemplo. Confirme antes de integrar.
- Endereço do site (sitemap e links canônicos): defina `SITE_URL` no build, ex.: `SITE_URL=https://exemplo.com.br npm run build`.
