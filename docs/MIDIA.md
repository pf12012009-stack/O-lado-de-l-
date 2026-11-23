# Integração de fotografias, descrições textuais e audiodescrições

Cada fotografia fica em `src/data/atracoes.ts`, dentro de `fotografias`, e já tem um `id` (`foto-01`, `foto-02`…). Esse `id` liga os três materiais da mesma foto.

## 1. Onde colocar os arquivos
```
public/midia/atracoes/<slug-da-atracao>/foto-01.webp   ← imagem
public/midia/atracoes/<slug-da-atracao>/foto-01.mp3    ← audiodescrição narrada
```
Slugs atuais: `santuario-sao-jose`, `ciclorrota-pedal-das-aguas`.

## 2. Como preencher cada fotografia
```ts
{
  id: 'foto-01',
  titulo: 'Fachada do santuário',                     // título curto
  arquivo: '/midia/atracoes/santuario-sao-jose/foto-01.webp',
  largura: 1600, altura: 1067,                        // evita salto de layout
  textoAlternativo: 'Fachada do Santuário São José…', // alt curto (1–2 frases)
  descricaoTextual: ['Primeiro parágrafo…', 'Segundo parágrafo…'], // texto completo
  audiodescricao: { arquivo: '/midia/atracoes/santuario-sao-jose/foto-01.mp3', narracao: 'Nome de quem narra (opcional)' },
  credito: 'Autor da foto (opcional)',
}
```
- Faltou algum material? Deixe o campo vazio. O site mostra "em preparação" naquele ponto, sem inventar nada.
- Mais ou menos de 8 fotos: troque `espacosReservados(8)` pela lista real.
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
- Estabelecimentos: `src/data/comercio.ts` (somente dados reais enviados pelo estabelecimento ou pelo projeto).
- Canais oficiais: `CONTATO` em `src/data/site.ts`.
- Endereço do site (sitemap e links canônicos): defina `SITE_URL` no build, ex.: `SITE_URL=https://exemplo.com.br npm run build`.
