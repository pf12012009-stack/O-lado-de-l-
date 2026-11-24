import { FONTES } from './fontes';
import type { Contato, Fato } from './tipos';

export const SITE = {
  nome: 'O Lado de Lá Turismo',
  lema: 'Porque conhecer o mundo não deveria depender de dinheiro, distância ou condições físicas.',
  descricao:
    'Turismo virtual e acessível de Alto Piquiri (PR): conheça os lugares por fotografias, descrições textuais e audiodescrições.',
  /** Crédito do idealizador, preservado do site antigo */
  credito: 'Idealizado e desenvolvido por Lucas P.',
  /** Endereço público do site, usado no sitemap e nas tags canônicas. Defina em SITE_URL no build. */
  url: (typeof process !== 'undefined' && process.env?.SITE_URL) || '',
};

/** Canais oficiais reunidos no site antigo e nas páginas das instituições. */
export const CANAIS: { instituicao: string; descricao?: string; contatos: Contato[] }[] = [
  {
    instituicao: 'Prefeitura Municipal de Alto Piquiri',
    descricao: 'Informações gerais sobre o município.',
    contatos: [
      { rotulo: 'Telefone', valor: '(44) 3656-8000', href: 'tel:+554436568000' },
      { rotulo: 'E-mail', valor: 'contato@altopiquiri.pr.gov.br', href: 'mailto:contato@altopiquiri.pr.gov.br' },
      { rotulo: 'Site', valor: 'altopiquiri.pr.gov.br', href: FONTES.prefeitura.url },
      { rotulo: 'Instagram', valor: '@prefapiquiri', href: 'https://www.instagram.com/prefapiquiri/' },
      { rotulo: 'Facebook', valor: 'Prefeitura de Alto Piquiri', href: 'https://www.facebook.com/PrefeituradeAltoPiquiri1/' },
      { rotulo: 'Endereço', valor: 'Rua Santos Dumont, 341, CEP 87580-000', href: 'https://www.google.com/maps/search/?api=1&query=Rua+Santos+Dumont+341%2C+Alto+Piquiri%2C+PR' },
    ],
  },
  {
    instituicao: 'Santuário Diocesano São José',
    descricao: 'Celebrações, peregrinações e Tour Capelas.',
    contatos: [
      { rotulo: 'Telefone', valor: '(44) 3656-1334', href: 'tel:+554436561334' },
      { rotulo: 'WhatsApp', valor: '(44) 98828-3669', href: 'https://wa.me/5544988283669' },
      { rotulo: 'E-mail', valor: 'contato@paroquiaaltopiquiri.com.br', href: 'mailto:contato@paroquiaaltopiquiri.com.br' },
      { rotulo: 'Site', valor: 'santuarioaltopiquiri.com.br', href: FONTES.santuario.url },
    ],
  },
  {
    instituicao: 'Pedala Paraná, Secretaria do Esporte',
    descricao: 'Condições e arquivos oficiais da ciclorrota.',
    contatos: [{ rotulo: 'Ficha oficial', valor: 'Ciclorrota Pedal das Águas', href: FONTES.pedalaRota.url }],
  },
];

/** Dados de Alto Piquiri com fonte. */
export const CIDADE: { nome: string; fatos: Fato[] } = {
  nome: 'Alto Piquiri',
  fatos: [
    { texto: 'Tem 448,373 km² de área territorial.', fonte: FONTES.ibge },
    { texto: 'O Censo de 2022 contou 9.727 habitantes.', fonte: FONTES.ibge },
    { texto: 'O município foi criado pela Lei Estadual nº 4.245, de 25 de julho de 1960, a partir de Cruzeiro do Oeste, e instalado em 15 de novembro de 1961.', fonte: FONTES.tjpr },
  ],
};
