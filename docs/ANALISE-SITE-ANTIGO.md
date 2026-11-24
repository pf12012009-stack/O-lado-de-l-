# Análise do site antigo (oladela-jwfjssrm.manus.space)

Feita em 2026-11-23 com um navegador automatizado: 13 páginas visitadas em tamanho de celular, com capturas de tela, textos, imagens, áudios e links. O vídeo de referência ainda não tinha sido recebido.

## Estrutura e rotas (preservadas no novo site)
| Rota | Conteúdo |
|---|---|
| `/` | Abertura, cards de 6 pontos turísticos, comércios parceiros, apoio da Prefeitura |
| `/pontos-turisticos` | Lista: Santuário, Capelas, Rio Piquiri, Rio Guere, Pedal das Águas |
| `/pontos-turisticos/:slug` | santuario-sao-jose, capela-nossa-senhora-aparecida, capela-santo-antonio, rio-piquiri, rio-guere, pedal-das-aguas |
| `/turismo-religioso` | Santuário, Tour Capelas (4 capelas), contatos do Santuário |
| `/turismo-de-aventura` | Ficha oficial da ciclorrota (36 km, dificuldade 5,4, condições), ciclorrotas vizinhas |
| `/comercio-local` | Buscas no Google Maps por categoria (sem recomendar estabelecimentos não verificados) |
| `/sobre`, `/contato` | Visita a Alto Piquiri; canais da Prefeitura, do Santuário e do Pedala Paraná |

## Página de atração (padrão antigo)
Foto principal → "Fotografia selecionada" com descrição textual truncada ("Ler mais") → player de audiodescrição (ouvir, silenciar, volume, 1x/1,5x/2x) → galeria de miniaturas **no fim da página** → "Conteúdo em Libras" (pendente, sem avatar automático) → crédito "Fotografias e textos: Guia Virtual de Turismo e Patrimônio Cultural de Alto Piquiri, Projeto EPT, Colégio Estadual Alto Piquiri, 2026".

Fotografias existentes por atração: Santuário 7, Capela Aparecida 9, Capela Santo Antônio 3, Rio Piquiri 1, Ciclorrota 1, Rio Guere 0. Audiodescrições existentes: Capela Aparecida (vista externa) e Capela Santo Antônio (São Miguel Arcanjo). O áudio do Santuário é `santuario-fachada-exemplo.wav` (6 s), **provavelmente um arquivo de exemplo**, a confirmar.

## Pontos fortes a preservar
- Identidade: brasão redondo, verde-mata escuro, dourado e creme, títulos com serifa.
- Descrição textual e audiodescrição separadas, uma para cada foto.
- Honestidade: "foto em breve", "Libras pendente", ressalva sobre o Salto Paiquerê (endereço em Mariluz segundo o Viaje Paraná).
- Créditos do Projeto EPT e do idealizador.
- Comércios parceiros com endereço, mapa e WhatsApp; buscas por categoria no mapa.

## Problemas encontrados
1. **Erro em todas as páginas:** `/api/platform/config.js` responde 500 e o script é bloqueado (2 erros de console por página).
2. **Conteúdo invisível até rolar:** as animações de entrada deixam grandes áreas vazias (capturas e leitores apressados não veem o conteúdo).
3. **Galeria longe da foto:** as miniaturas ficam depois da descrição e do áudio. No celular, quem escolhe uma miniatura precisa rolar de volta para cima.
4. **Player roxo:** fora da paleta da marca.
5. **Rótulos em CAIXA ALTA com espaçamento largo** em muitos lugares: pior leitura para baixa visão e dislexia.
6. Miniaturas com `alt=""`. O botão tem nome, mas a imagem principal repetida no topo também usa `alt` vazio.
7. A meta description é a mesma em todas as páginas.
8. "Comércio local" (página) e "Comércios parceiros" (início) são duas coisas diferentes com nomes parecidos.

## Decisões para o novo site
- Mantém as rotas antigas (links já divulgados continuam valendo).
- Mantém a identidade do brasão, com tipografia de leitura acessível (Atkinson Hyperlegible) e títulos com serifa.
- Miniaturas logo abaixo da foto principal; descrição e áudio ao lado (computador) ou logo abaixo (celular).
- Descrição longa recolhível com botão acessível, sem esconder conteúdo do leitor de tela.
- Seção Libras preparada, honesta enquanto não houver vídeo.
- Conteúdo sempre visível sem depender de animação de rolagem.
- Fotos e áudios: aguardando o pacote do autor (estrutura e títulos já preparados com os nomes dos arquivos antigos).
