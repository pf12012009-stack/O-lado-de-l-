import type { CategoriaComercioId, Estabelecimento } from './tipos';

export const CATEGORIAS_COMERCIO: { id: CategoriaComercioId; nome: string }[] = [
  { id: 'farmacia', nome: 'Farmácia' },
  { id: 'hotel', nome: 'Hotel' },
  { id: 'restaurante', nome: 'Restaurante' },
  { id: 'posto', nome: 'Posto de combustível' },
  { id: 'supermercado', nome: 'Supermercado' },
];

const MSG_ATENDIMENTO = 'Olá, gostaria de saber se estão atendendo hoje?\n#OLadoDeLáTurismo';
const busca = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

/**
 * Comércios parceiros, migrados do site antigo do projeto (dados cadastrados pelo autor).
 * Só cadastre dados reais. Nunca crie estabelecimentos, patrocinadores, contatos ou avaliações fictícios.
 */
export const ESTABELECIMENTOS: Estabelecimento[] = [
  {
    slug: 'drogamais-alto-piquiri',
    nome: 'Drogamais Alto Piquiri',
    categoria: 'farmacia',
    endereco: 'Avenida Brasil, 1731, Alto Piquiri (PR)',
    linkMapa: busca('Drogamais Alto Piquiri, Avenida Brasil 1731, Alto Piquiri, PR'),
    whatsapp: '554436561317',
    mensagemWhatsapp: MSG_ATENDIMENTO,
    parceiro: true,
  },
  {
    slug: 'hotel-e-churrascaria-frison',
    nome: 'Hotel e Churrascaria Frison',
    categoria: 'hotel',
    endereco: 'Avenida Brasil, 1321, Centro, Alto Piquiri (PR), CEP 87580-000',
    linkMapa: busca('Hotel E Churrascaria Frison, Avenida Brasil 1321, Centro, Alto Piquiri, PR 87580-000, Brasil'),
    whatsapp: '5544997418403',
    mensagemWhatsapp: 'Olá, gostaria de saber se tem disponibilidade para hospedagem?\n#OLadoDeLáTurismo',
    parceiro: true,
  },
  {
    slug: 'hotel-restaurante-frison',
    nome: 'Hotel Restaurante Frison',
    categoria: 'restaurante',
    endereco: 'Avenida Brasil, 1321, Alto Piquiri (PR), CEP 87580-000',
    linkMapa: busca('Hotel Restaurante Frison, Avenida Brasil 1321, Alto Piquiri, PR'),
    whatsapp: '5544997143719',
    mensagemWhatsapp: MSG_ATENDIMENTO,
    parceiro: true,
  },
  {
    slug: 'posto-delta',
    nome: 'Posto Delta',
    categoria: 'posto',
    endereco: 'Avenida Brasil, 1412, Centro, Alto Piquiri (PR), CEP 87580-000',
    linkMapa:
      'https://www.google.com/maps/place/Posto+Delta+-+Centro,+Alto+Piquiri/@-24.0228603,-53.4442166,1030m/data=!3m2!1e3!4b1!4m6!3m5!1s0x94f321087c959e0b:0x57d07cd80a90822a!8m2!3d-24.0228603!4d-53.4416417!16s%2Fg%2F11rtdp55tk',
    parceiro: true,
  },
  {
    slug: 'supermercado-isaelle',
    nome: 'Supermercado Isaelle',
    categoria: 'supermercado',
    endereco: 'Avenida Brasil, 1204, Alto Piquiri (PR)',
    linkMapa: busca('Supermercado Isaelle, Avenida Brasil, 1204, Alto Piquiri, PR, Brasil'),
    parceiro: true,
  },
];

/** Buscas ao vivo no mapa (sem recomendar estabelecimentos não verificados). */
export const BUSCAS_NO_MAPA: { rotulo: string; descricao: string; termo: string }[] = [
  { rotulo: 'Comércio', descricao: 'Mercados, lojas e serviços', termo: 'comércio em Alto Piquiri PR' },
  { rotulo: 'Restaurantes', descricao: 'Refeições perto de você', termo: 'restaurantes em Alto Piquiri PR' },
  { rotulo: 'Lanchonetes', descricao: 'Lanches e cafés', termo: 'lanchonetes em Alto Piquiri PR' },
  { rotulo: 'Hospedagem', descricao: 'Hotéis e pousadas', termo: 'hospedagem em Alto Piquiri PR' },
  { rotulo: 'Serviços', descricao: 'Combustível, oficinas, banco e saúde', termo: 'serviços em Alto Piquiri PR' },
  { rotulo: 'Pesque-pague', descricao: 'Citado na ficha da ciclorrota', termo: 'pesque pague em Alto Piquiri PR' },
  { rotulo: 'Artesanato', descricao: 'Citado na ficha da ciclorrota', termo: 'artesanato em Alto Piquiri PR' },
];

export const linkBuscaMapa = (termo: string) => `https://www.google.com/maps/search/${encodeURIComponent(termo).replace(/%20/g, '+')}`;

export function nomeCategoriaComercio(id: CategoriaComercioId): string {
  return CATEGORIAS_COMERCIO.find((c) => c.id === id)?.nome ?? id;
}

export function linkWhatsapp(numero: string, mensagem?: string): string {
  const base = `https://wa.me/${numero.replace(/\D/g, '')}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}
