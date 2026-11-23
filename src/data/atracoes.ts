import { FONTES } from './fontes';
import type { Atracao, Categoria, CategoriaId, Fotografia } from './tipos';

export const CATEGORIAS: Categoria[] = [
  {
    id: 'religioso',
    nome: 'Turismo religioso',
    descricao: 'Santuário, capelas e lugares de fé para conhecer pelas fotografias.',
  },
  {
    id: 'aventura',
    nome: 'Turismo de aventura',
    descricao: 'Percursos e paisagens ao ar livre para explorar de onde você estiver.',
  },
];

export function categoriaPorId(id: CategoriaId): Categoria {
  const c = CATEGORIAS.find((x) => x.id === id);
  if (!c) throw new Error(`Categoria desconhecida: ${id}`);
  return c;
}

/**
 * Espaços reservados para as fotografias que ainda serão enviadas.
 * Cada espaço já tem o id que liga imagem, descrição textual e audiodescrição.
 * Para integrar: preencha `arquivo`, `textoAlternativo`, `descricaoTextual` e `audiodescricao`.
 */
function espacosReservados(quantidade: number): Fotografia[] {
  return Array.from({ length: quantidade }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return { id: `foto-${n}`, titulo: `Fotografia ${i + 1}` };
  });
}

export const ATRACOES: Atracao[] = [
  {
    slug: 'santuario-sao-jose',
    nome: 'Santuário São José',
    categoria: 'religioso',
    resumo: 'O santuário diocesano de Alto Piquiri, com suas capelas e o Jardim da Imaculada.',
    apresentacao: [
      'O Santuário São José fica em Alto Piquiri e reúne a antiga Igreja Matriz, capelas temáticas e um jardim usado para encontros e retiros.',
      'Percorra os ambientes pelas fotografias. Em cada imagem você pode ler a descrição textual ou ouvir a audiodescrição.',
    ],
    fatos: [
      { texto: 'A Igreja Matriz de São José foi elevada a Santuário Diocesano em março de 2023.', fonte: FONTES.ilustrado },
      { texto: 'O complexo tem quatro capelas temáticas: Nossa Senhora Aparecida, Santo Antônio, São Judas Tadeu e Nossa Senhora da Penha.', fonte: FONTES.bemdito },
      { texto: 'O Jardim da Imaculada é usado para eventos e retiros.', fonte: FONTES.bemdito },
      { texto: 'No dia 19 de cada mês, peregrinos visitam as capelas no chamado Tour Capelas.', fonte: FONTES.bemdito },
      { texto: 'Pertence à Diocese de Umuarama, na Forania de Iporã.', fonte: FONTES.gcatholic },
    ],
    localizacao: { municipio: 'Alto Piquiri (PR)', buscaMapa: 'Santuário São José, Alto Piquiri, PR' },
    linkOficial: FONTES.santuario,
    fotografias: espacosReservados(8),
  },
  {
    slug: 'ciclorrota-pedal-das-aguas',
    nome: 'Ciclorrota Pedal das Águas',
    categoria: 'aventura',
    resumo: 'Ciclorrota oficial de Alto Piquiri no programa estadual Pedala Paraná.',
    apresentacao: [
      'A Ciclorrota Pedal das Águas faz parte do Pedala Paraná, o programa do Governo do Estado que reúne rotas de ciclismo turístico e esportivo.',
      'Conheça o percurso e as paisagens pelas fotografias, com descrição textual e audiodescrição em cada imagem.',
    ],
    fatos: [
      { texto: 'É a ciclorrota de número 71 do programa Pedala Paraná.', fonte: FONTES.pedalaParana },
      { texto: 'Foi lançada em 28 de junho de 2026.', fonte: FONTES.pedalaParana },
      { texto: 'Pertence ao Polo Regional 06, de Umuarama.', fonte: FONTES.pedalaParana },
    ],
    localizacao: { municipio: 'Alto Piquiri (PR)', buscaMapa: 'Alto Piquiri, PR' },
    fotografias: espacosReservados(8),
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
