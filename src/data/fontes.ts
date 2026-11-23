import type { Fonte } from './tipos';

/** Fontes públicas consultadas em novembro de 2026. */
export const FONTES = {
  ibge: { titulo: 'IBGE Cidades: Alto Piquiri (PR)', url: 'https://www.ibge.gov.br/cidades-e-estados/pr/alto-piquiri.html' },
  tjpr: { titulo: 'TJPR: Alto Piquiri, de município a comarca', url: 'https://www.tjpr.jus.br/documents/397262/4513290/ALTO+PIQUIRI/b7aff075-4090-439d-b28e-29d878ec67fc?version=1.0' },
  santuario: { titulo: 'Site oficial do Santuário São José de Alto Piquiri', url: 'https://santuarioaltopiquiri.com.br/' },
  ilustrado: { titulo: 'Jornal Ilustrado: Igreja Matriz de Alto Piquiri passa a ser Santuário de São José', url: 'https://ilustrado.com.br/igreja-matriz-de-alto-piquiri-passa-a-ser-santuario-de-sao-jose-e-atrai-mais-fieis/' },
  bemdito: { titulo: 'O Bemdito: Santuário de São José em Alto Piquiri', url: 'https://obemdito.com.br/noticia/393073/santuario-diocesano-de-sao-jose-alto-piquiri' },
  gcatholic: { titulo: 'GCatholic: Santuário São José, Alto Piquiri', url: 'https://gcatholic.org/churches/brazil/57378' },
  pedalaParana: { titulo: 'Secretaria do Esporte do Paraná: ciclorrotas lançadas do Pedala Paraná', url: 'https://www.esporte.pr.gov.br/PedalaParana/Pagina/Ciclorrotas-Lancadas' },
} satisfies Record<string, Fonte>;
