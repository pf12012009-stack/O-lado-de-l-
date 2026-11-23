import { FONTES } from './fontes';
import type { Fato } from './tipos';

export const SITE = {
  nome: 'O Lado de Lá Turismo',
  lema: 'Porque conhecer o mundo não deveria depender de dinheiro, distância ou condições físicas.',
  descricao:
    'Turismo virtual e acessível de Alto Piquiri (PR): conheça lugares por fotografias, descrições textuais e audiodescrições.',
  /** Endereço público do site, usado no sitemap e nas tags canônicas. Defina em SITE_URL no build. */
  url: (typeof process !== 'undefined' && process.env?.SITE_URL) || '',
};

/**
 * Canais de contato oficiais do projeto.
 * Preencha somente com canais reais. Campos vazios não aparecem no site.
 */
export const CONTATO: { email?: string; whatsapp?: string; instagram?: string; facebook?: string } = {};

/** Dados de Alto Piquiri com fonte. */
export const CIDADE: { nome: string; fatos: Fato[] } = {
  nome: 'Alto Piquiri',
  fatos: [
    { texto: 'Tem 448,373 km² de área territorial.', fonte: FONTES.ibge },
    { texto: 'O Censo de 2022 contou 9.727 habitantes.', fonte: FONTES.ibge },
    { texto: 'O município foi criado pela Lei Estadual nº 4.245, de 25 de julho de 1960, a partir de Cruzeiro do Oeste, e instalado em 15 de novembro de 1961.', fonte: FONTES.tjpr },
  ],
};
