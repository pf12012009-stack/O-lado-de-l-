import type { Fonte } from './tipos';

/** Fontes consultadas em novembro de 2026. */
export const FONTES = {
  ibge: { titulo: 'IBGE Cidades: Alto Piquiri (PR)', url: 'https://www.ibge.gov.br/cidades-e-estados/pr/alto-piquiri.html' },
  tjpr: { titulo: 'TJPR: Alto Piquiri, de município a comarca', url: 'https://www.tjpr.jus.br/documents/397262/4513290/ALTO+PIQUIRI/b7aff075-4090-439d-b28e-29d878ec67fc?version=1.0' },
  santuario: { titulo: 'Site oficial do Santuário São José de Alto Piquiri', url: 'https://santuarioaltopiquiri.com.br/' },
  diocese: { titulo: 'Diocese de Umuarama: Paróquia Santuário São José', url: 'https://diocesedeumuarama.org.br/paroquia/paroquia-santuario-sao-jose-alto-piquiri' },
  ilustrado: { titulo: 'Jornal Ilustrado: Igreja Matriz de Alto Piquiri passa a ser Santuário de São José', url: 'https://ilustrado.com.br/igreja-matriz-de-alto-piquiri-passa-a-ser-santuario-de-sao-jose-e-atrai-mais-fieis/' },
  bemdito: { titulo: 'O Bemdito: Santuário de São José em Alto Piquiri', url: 'https://obemdito.com.br/noticia/393073/santuario-diocesano-de-sao-jose-alto-piquiri' },
  gcatholic: { titulo: 'GCatholic: Santuário São José, Alto Piquiri', url: 'https://gcatholic.org/churches/brazil/57378' },
  pedalaParana: { titulo: 'Pedala Paraná: ciclorrotas lançadas', url: 'https://www.esporte.pr.gov.br/PedalaParana/Pagina/Ciclorrotas-Lancadas' },
  pedalaRota: { titulo: 'Pedala Paraná: ficha oficial da Ciclorrota Pedal das Águas', url: 'https://www.esporte.pr.gov.br/PedalaParana/Pagina/Ciclorrota-Pedal-das-Aguas-Alto-Piquiri' },
  viajeSalto: { titulo: 'Viaje Paraná: Salto do Paiquerê', url: 'https://www.viajeparana.com/Endereco/SALTO-DO-PAIQUERE' },
  prefeitura: { titulo: 'Prefeitura Municipal de Alto Piquiri', url: 'https://www.altopiquiri.pr.gov.br/' },
  guiaEPT: { titulo: 'Guia Virtual de Turismo e Patrimônio Cultural de Alto Piquiri, Projeto EPT, Colégio Estadual Alto Piquiri (2026)' },
} satisfies Record<string, Fonte>;
