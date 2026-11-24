import { FONTES } from './fontes';
import { MIDIA_ORIGINAL } from './midia-original';
import type { Atracao, Categoria, CategoriaId, Fotografia } from './tipos';

export const CATEGORIAS: Categoria[] = [
  {
    id: 'religioso',
    nome: 'Turismo religioso',
    descricao: 'O Santuário São José e as capelas ligadas a ele, para conhecer pelas fotografias.',
    caminho: '/turismo-religioso',
  },
  {
    id: 'aventura',
    nome: 'Turismo de aventura',
    descricao: 'A Ciclorrota Pedal das Águas, com a ficha oficial do percurso.',
    caminho: '/turismo-de-aventura',
  },
  {
    id: 'natureza',
    nome: 'Natureza',
    descricao: 'Rios e paisagens naturais de Alto Piquiri.',
    caminho: '/turismo-de-natureza',
  },
];

export function categoriaPorId(id: CategoriaId): Categoria {
  const c = CATEGORIAS.find((x) => x.id === id);
  if (!c) throw new Error(`Categoria desconhecida: ${id}`);
  return c;
}

/**
 * Espaços preparados para as fotografias originais.
 * O `id` segue o nome do arquivo usado no site antigo e liga imagem, descrição textual e audiodescrição.
 * Para integrar, preencha `arquivo`, `textoAlternativo`, `descricaoTextual` e `audiodescricao` (veja docs/MIDIA.md).
 */
function fotos(slug: string, lista: [id: string, titulo: string][]): Fotografia[] {
  return lista.map(([id, titulo]) => ({ id, titulo, ...MIDIA_ORIGINAL[slug]?.[id] }));
}

const CREDITO_EPT = 'Fotografias e textos: Guia Virtual de Turismo e Patrimônio Cultural de Alto Piquiri, Projeto EPT, Colégio Estadual Alto Piquiri, 2026.';

export const ATRACOES: Atracao[] = [
  {
    slug: 'santuario-sao-jose',
    nome: 'Santuário Diocesano São José',
    categoria: 'religioso',
    local: 'Centro',
    resumo: 'Um marco de fé local e ponto de partida para conhecer a comunidade e as capelas ligadas ao Santuário.',
    apresentacao: [
      'O Santuário Diocesano São José fica no Centro de Alto Piquiri. Percorra a fachada, o altar e as capelas internas pelas fotografias.',
      'Em cada imagem você escolhe: ler a descrição textual ou ouvir a audiodescrição.',
    ],
    fatos: [
      { texto: 'A Igreja Matriz de São José foi elevada a Santuário Diocesano em março de 2023.', fonte: FONTES.ilustrado },
      { texto: 'O Santuário mantém quatro capelas ligadas à comunidade: Nossa Senhora Aparecida, Santo Antônio, São Judas Tadeu e Nossa Senhora da Penha.', fonte: FONTES.bemdito },
      { texto: 'No dia 19 de cada mês, peregrinos visitam as capelas no roteiro chamado Tour Capelas.', fonte: FONTES.bemdito },
      { texto: 'O Jardim da Imaculada é usado para eventos e retiros.', fonte: FONTES.bemdito },
      { texto: 'Pertence à Diocese de Umuarama, na Forania de Iporã.', fonte: FONTES.gcatholic },
    ],
    localizacao: {
      municipio: 'Alto Piquiri (PR)',
      endereco: 'Praça da Matriz, s/n, Centro, CEP 87580-000',
      buscaMapa: 'Santuário São José, Praça da Matriz, Alto Piquiri, PR',
    },
    links: [FONTES.santuario, FONTES.diocese],
    contatos: [
      { rotulo: 'Telefone do Santuário', valor: '(44) 3656-1334', href: 'tel:+554436561334' },
      { rotulo: 'WhatsApp do Santuário', valor: '(44) 98828-3669', href: 'https://wa.me/5544988283669' },
      { rotulo: 'E-mail da paróquia', valor: 'contato@paroquiaaltopiquiri.com.br', href: 'mailto:contato@paroquiaaltopiquiri.com.br' },
    ],
    fotografias: fotos('santuario-sao-jose', [
      ['fachada', 'Fachada do Santuário Diocesano São José'],
      ['sao-jose-menino-jesus', 'Imagem de São José com o Menino Jesus'],
      ['pia-batismal-nicho-mariano', 'Pia Batismal e Nicho Mariano'],
      ['painel-sagrado-coracao', 'Painel do Sagrado Coração de Jesus'],
      ['altar-principal', 'Altar Principal do Santuário São José'],
      ['capela-sagrado-coracao', 'Capela do Sagrado Coração de Jesus'],
      ['presbiterio', 'Presbitério e Altar Litúrgico'],
    ]),
    credito: CREDITO_EPT,
  },
  {
    slug: 'capela-nossa-senhora-aparecida',
    nome: 'Capela Nossa Senhora Aparecida',
    categoria: 'religioso',
    local: 'Mirante do Piquiri',
    resumo: 'Capela da comunidade de Mirante do Piquiri: nave, altar principal, sacrário, vitrais e o painel dos pescadores.',
    apresentacao: [
      'A Capela Nossa Senhora Aparecida fica na comunidade de Mirante do Piquiri, em Alto Piquiri.',
      'Conheça a fachada, a torre sineira, o interior e a arte sacra pelas fotografias.',
    ],
    fatos: [
      { texto: 'Capela da comunidade de Mirante do Piquiri, com nave, altar principal, sacrário, vitrais e o painel dos pescadores.', fonte: FONTES.guiaEPT },
      { texto: 'É uma das quatro capelas visitadas no Tour Capelas, todo dia 19.', fonte: FONTES.bemdito },
    ],
    localizacao: { municipio: 'Alto Piquiri (PR)', endereco: 'Comunidade de Mirante do Piquiri', buscaMapa: 'Capela Nossa Senhora Aparecida, Mirante do Piquiri, Alto Piquiri, PR' },
    fotografias: fotos('capela-nossa-senhora-aparecida', [
      ['vista-externa', 'Vista externa do conjunto religioso'],
      ['fachada-torre', 'Fachada principal e torre sineira'],
      ['interior-nave', 'Interior da capela: nave e altar principal'],
      ['sacrario-painel', 'Sacrário e painel litúrgico'],
      ['vitral', 'Vitral artístico'],
      ['nossa-senhora-painel-pescadores', 'Imagem de Nossa Senhora Aparecida e painel dos pescadores'],
      ['oratorio-painel-encontro', 'Oratório de Nossa Senhora Aparecida e painel do encontro da imagem'],
      ['vista-geral-interna', 'Vista geral interna da capela'],
      ['altar-principal', 'Altar principal da capela'],
    ]),
    credito: CREDITO_EPT,
  },
  {
    slug: 'capela-santo-antonio',
    nome: 'Capela Santo Antônio',
    categoria: 'religioso',
    local: 'Paulistânia',
    resumo: 'Capela do distrito de Paulistânia, com arte sacra: imagem de São Miguel Arcanjo, sacrário e vitral do Espírito Santo.',
    apresentacao: [
      'A Capela Santo Antônio fica no distrito de Paulistânia, em Alto Piquiri.',
      'Conheça a arte sacra da capela pelas fotografias, com descrição textual e audiodescrição.',
    ],
    fatos: [
      { texto: 'Capela do distrito de Paulistânia, com imagem de São Miguel Arcanjo, sacrário e vitral do Espírito Santo.', fonte: FONTES.guiaEPT },
      { texto: 'É uma das quatro capelas visitadas no Tour Capelas, todo dia 19.', fonte: FONTES.bemdito },
    ],
    localizacao: { municipio: 'Alto Piquiri (PR)', endereco: 'Distrito de Paulistânia', buscaMapa: 'Capela Santo Antônio, Paulistânia, Alto Piquiri, PR' },
    fotografias: fotos('capela-santo-antonio', [
      ['sao-miguel-arcanjo', 'Imagem de São Miguel Arcanjo'],
      ['sacrario', 'Sacrário da Capela Santo Antônio'],
      ['vitral-espirito-santo', 'Vitral do Espírito Santo'],
    ]),
    credito: CREDITO_EPT,
  },
  {
    slug: 'rio-piquiri',
    nome: 'Rio Piquiri',
    categoria: 'natureza',
    resumo: 'Quedas d’água, corredeiras e mata formam um dos cenários naturais mais marcantes da região.',
    apresentacao: ['O Rio Piquiri dá nome ao município. Conheça suas águas e a mata ao redor pelas fotografias.'],
    fatos: [
      { texto: 'As corredeiras dos Apertados do Rio Piquiri são citadas pela ficha oficial da Ciclorrota Pedal das Águas como um dos principais cartões-postais da região.', fonte: FONTES.pedalaRota },
    ],
    localizacao: { municipio: 'Alto Piquiri (PR)', buscaMapa: 'Rio Piquiri, Alto Piquiri, PR' },
    fotografias: fotos('rio-piquiri', [['rio-piquiri', 'Quedas d’água do Rio Piquiri']]),
  },
  {
    slug: 'rio-guere',
    nome: 'Rio Guere',
    categoria: 'natureza',
    resumo: 'Um ponto natural de Alto Piquiri. Fotografias e informações em preparação.',
    apresentacao: ['As fotografias e as informações do Rio Guere estão em preparação e serão publicadas aqui depois de revisadas.'],
    fatos: [],
    localizacao: { municipio: 'Alto Piquiri (PR)', buscaMapa: 'Rio Guere, Alto Piquiri, PR' },
    fotografias: [],
  },
  {
    slug: 'pedal-das-aguas',
    nome: 'Ciclorrota Pedal das Águas',
    categoria: 'aventura',
    resumo: 'Uma rota oficial de 36 km por estradas rurais e trechos de mata, no programa Pedala Paraná.',
    apresentacao: [
      'A Ciclorrota Pedal das Águas faz parte do Pedala Paraná, o programa estadual de rotas de cicloturismo. É uma rota pública e autoguiada.',
      'Veja as fotografias do percurso e leia a ficha oficial antes de pedalar.',
    ],
    fatos: [
      { texto: 'Trajeto de 36 km, com nível de dificuldade 5,4.', fonte: FONTES.pedalaRota },
      { texto: 'É a ciclorrota nº 71 do Pedala Paraná, lançada em 28 de junho de 2026, no Polo Regional de Umuarama.', fonte: FONTES.pedalaParana },
      { texto: 'A descrição oficial cita o Salto Paiquerê, a Cascata do Pinhal e as corredeiras dos Apertados do Rio Piquiri ao longo do percurso.', fonte: FONTES.pedalaRota },
      { texto: 'O portal Viaje Paraná informa o endereço do Salto Paiquerê em Mariluz. Ele aparece aqui só como referência da rota, não como atração de Alto Piquiri.', fonte: FONTES.viajeSalto },
    ],
    avisos: [
      { texto: 'Trajeto misto (amplo e mata fechada), com piso seco.', fonte: FONTES.pedalaRota },
      { texto: 'Não há ponto natural de água potável no trajeto. Leve água extra: predominam altas temperaturas.', fonte: FONTES.pedalaRota },
      { texto: 'Não há pontos de apoio (comércio) ao longo da rota.', fonte: FONTES.pedalaRota },
      { texto: 'Tráfego intenso de máquinas agrícolas e moradores.', fonte: FONTES.pedalaRota },
    ],
    localizacao: { municipio: 'Alto Piquiri (PR)', buscaMapa: 'Alto Piquiri, PR' },
    links: [{ titulo: 'Ficha oficial com mapa em PDF e rota em GPX (Pedala Paraná)', url: FONTES.pedalaRota.url }],
    fotografias: fotos('pedal-das-aguas', [['abertura', 'Ciclistas na abertura da Ciclorrota Pedal das Águas']]),
  },
];

export function atracaoPorSlug(slug: string): Atracao | undefined {
  return ATRACOES.find((a) => a.slug === slug);
}

export function atracoesDaCategoria(id: CategoriaId): Atracao[] {
  return ATRACOES.filter((a) => a.categoria === id);
}

/** Resumo do material já enviado, usado nos cards e no painel de integração. */
export function situacaoDaMidia(a: Atracao) {
  const total = a.fotografias.length;
  const fotos = a.fotografias.filter((f) => f.arquivo).length;
  const textos = a.fotografias.filter((f) => f.descricaoTextual?.length).length;
  const audios = a.fotografias.filter((f) => f.audiodescricao).length;
  return { total, fotos, textos, audios };
}
