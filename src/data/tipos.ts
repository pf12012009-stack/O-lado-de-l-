/**
 * Modelo de dados do O Lado de Lá Turismo.
 *
 * Cada Fotografia carrega, juntos e associados pelo mesmo `id`:
 *  - o arquivo da imagem,
 *  - a descrição textual (para ler),
 *  - a audiodescrição (arquivo de áudio narrado, para ouvir).
 * Descrição textual e audiodescrição são recursos independentes: um nunca substitui o outro.
 */

export type CategoriaId = 'religioso' | 'aventura' | 'natureza';

export interface Categoria {
  id: CategoriaId;
  nome: string;
  descricao: string;
  /** Rota da página da categoria, ex.: /turismo-religioso */
  caminho: string;
}

export interface Fonte {
  titulo: string;
  /** Link público da fonte. Ausente para material impresso ou do próprio projeto. */
  url?: string;
}

export interface Contato {
  rotulo: string;
  valor: string;
  /** tel:, https://wa.me/…, mailto: ou https:// */
  href?: string;
}

/** Informação factual sempre ligada à fonte que a confirma. */
export interface Fato {
  texto: string;
  fonte: Fonte;
}

export interface Audiodescricao {
  /** Caminho do arquivo em /public, ex.: /midia/atracoes/santuario-sao-jose/foto-01.mp3 */
  arquivo: string;
  /** Formato alternativo opcional (ex.: .ogg ou .m4a) */
  arquivoAlternativo?: string;
  duracaoSegundos?: number;
  /** Quem narra, se o autor quiser creditar */
  narracao?: string;
}

export interface Fotografia {
  /** Identificador único dentro da atração, ex.: "foto-01". Liga imagem, texto e áudio. */
  id: string;
  /** Título curto da fotografia, ex.: "Fachada do santuário" */
  titulo: string;
  /** Caminho da imagem em /public. Ausente = espaço reservado. */
  arquivo?: string;
  /** Versão menor (≈640 px) para cards e miniaturas */
  miniatura?: string;
  largura?: number;
  altura?: number;
  /** Texto alternativo curto (atributo alt), lido por leitores de tela. */
  textoAlternativo?: string;
  /** Descrição textual completa, em parágrafos. Linhas que começam com "## " são subtítulos. */
  descricaoTextual?: string[];
  /** Narração em áudio da fotografia. */
  audiodescricao?: Audiodescricao;
  credito?: string;
}

export interface Localizacao {
  municipio: string;
  endereco?: string;
  /** Link do Google Maps cadastrado pelo projeto */
  linkMapa?: string;
  /** Texto usado para buscar no Google Maps quando ainda não há link cadastrado */
  buscaMapa: string;
}

export interface Atracao {
  slug: string;
  nome: string;
  categoria: CategoriaId;
  /** Bairro, distrito ou comunidade, ex.: "Centro", "Paulistânia" */
  local?: string;
  /** Frase curta usada no card */
  resumo: string;
  /** Texto de apresentação da página (parágrafos) */
  apresentacao: string[];
  fatos: Fato[];
  localizacao: Localizacao;
  /** Links oficiais (site do lugar, ficha da rota, diocese…) */
  links?: Fonte[];
  contatos?: Contato[];
  /** Avisos importantes ao visitante, sempre com fonte */
  avisos?: Fato[];
  fotografias: Fotografia[];
  /** Vídeo em Libras feito por intérprete. Ausente = pendente (nunca avatar automático). */
  libras?: { video: string; legendas?: string; interprete?: string };
  /** Crédito das fotografias e textos */
  credito?: string;
}

export type CategoriaComercioId = 'farmacia' | 'hotel' | 'restaurante' | 'posto' | 'supermercado';

export interface Estabelecimento {
  slug: string;
  nome: string;
  categoria: CategoriaComercioId;
  descricao?: string;
  endereco?: string;
  linkMapa?: string;
  /** Somente números com DDI e DDD, ex.: 5544999999999 */
  whatsapp?: string;
  /** Mensagem já escrita ao abrir o WhatsApp */
  mensagemWhatsapp?: string;
  fotografia?: { arquivo: string; textoAlternativo: string };
  parceiro?: boolean;
}
