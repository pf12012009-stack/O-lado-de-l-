/**
 * Modelo de dados do O Lado de Lá Turismo.
 *
 * Cada Fotografia carrega, juntos e associados pelo mesmo `id`:
 *  - o arquivo da imagem,
 *  - a descrição textual (para ler),
 *  - a audiodescrição (arquivo de áudio narrado, para ouvir).
 * Descrição textual e audiodescrição são recursos independentes: um nunca substitui o outro.
 */

export type CategoriaId = 'religioso' | 'aventura';

export interface Categoria {
  id: CategoriaId;
  nome: string;
  descricao: string;
}

export interface Fonte {
  titulo: string;
  url: string;
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
  largura?: number;
  altura?: number;
  /** Texto alternativo curto (atributo alt), lido por leitores de tela. */
  textoAlternativo?: string;
  /** Descrição textual completa, em parágrafos. */
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
  /** Frase curta usada no card */
  resumo: string;
  /** Texto de apresentação da página (parágrafos) */
  apresentacao: string[];
  fatos: Fato[];
  localizacao: Localizacao;
  linkOficial?: Fonte;
  fotografias: Fotografia[];
}

export type CategoriaComercioId =
  | 'alimentacao'
  | 'hospedagem'
  | 'compras'
  | 'servicos'
  | 'lazer';

export interface Estabelecimento {
  slug: string;
  nome: string;
  categoria: CategoriaComercioId;
  descricao?: string;
  endereco?: string;
  linkMapa?: string;
  /** Somente números com DDI e DDD, ex.: 5544999999999 */
  whatsapp?: string;
  fotografia?: { arquivo: string; textoAlternativo: string };
  parceiro?: boolean;
}
