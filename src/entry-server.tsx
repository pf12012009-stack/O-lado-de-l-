import { renderToString } from 'react-dom/server';
import { App } from './App';
import { ATRACOES, CATEGORIAS } from './data/atracoes';
import { SITE } from './data/site';

export interface Rota {
  caminho: string;
  titulo: string;
  descricao: string;
}

/** Todas as rotas públicas, usadas na pré-renderização e no sitemap. */
export function rotas(): Rota[] {
  const t = (titulo: string) => `${titulo} | ${SITE.nome}`;
  return [
    { caminho: '/', titulo: SITE.nome, descricao: SITE.descricao },
    { caminho: '/pontos-turisticos', titulo: t('Pontos turísticos'), descricao: 'Conheça os pontos turísticos de Alto Piquiri (PR) por fotografias, descrições textuais e audiodescrições.' },
    ...CATEGORIAS.map((c) => ({ caminho: c.caminho, titulo: t(c.nome), descricao: `${c.nome} em Alto Piquiri (PR): ${c.descricao}` })),
    ...ATRACOES.map((a) => ({ caminho: `/pontos-turisticos/${a.slug}`, titulo: t(a.nome), descricao: `${a.resumo} Fotografias com descrição textual e audiodescrição.` })),
    { caminho: '/comercio-local', titulo: t('Comércio local'), descricao: 'Comércios parceiros e busca de serviços em Alto Piquiri (PR), com endereço, mapa e WhatsApp.' },
    { caminho: '/sobre', titulo: t('Sobre o projeto'), descricao: 'O Lado de Lá Turismo é uma plataforma de turismo virtual, conhecimento, inclusão e acessibilidade de Alto Piquiri (PR).' },
    { caminho: '/contato', titulo: t('Contato e canais oficiais'), descricao: 'Canais oficiais da Prefeitura de Alto Piquiri, do Santuário São José e do Pedala Paraná.' },
    { caminho: '/acessibilidade', titulo: t('Acessibilidade'), descricao: 'Recursos de acessibilidade do O Lado de Lá Turismo e como usá-los.' },
  ];
}

export function renderizar(caminho: string): string {
  return renderToString(<App caminho={caminho} />);
}

export { ATRACOES } from './data/atracoes';
export { ESTABELECIMENTOS } from './data/comercio';
