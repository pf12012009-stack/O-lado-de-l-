import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Galeria } from '../src/components/Galeria';
import type { Fotografia } from '../src/data/tipos';

const fotos: Fotografia[] = [
  {
    id: 'foto-01',
    titulo: 'Fachada',
    arquivo: '/midia/teste/foto-01.webp',
    textoAlternativo: 'Fachada da igreja',
    descricaoTextual: ['Texto da fachada.'],
    audiodescricao: { arquivo: '/midia/teste/foto-01.mp3' },
  },
  { id: 'foto-02', titulo: 'Interior', descricaoTextual: ['Texto do interior.'] },
  { id: 'foto-03', titulo: 'Jardim' },
];

describe('Galeria', () => {
  beforeEach(() => window.history.replaceState(null, '', '/'));

  it('abre na fotografia indicada no endereço', () => {
    window.history.replaceState(null, '', '/?foto=foto-02');
    render(<Galeria fotografias={fotos} nomeLugar="Lugar" />);
    expect(screen.getByText('Texto do interior.')).toBeInTheDocument();
  });

  it('mostra a foto principal e associa descrição e audiodescrição da mesma foto', () => {
    const { container } = render(<Galeria fotografias={fotos} nomeLugar="Lugar" />);
    expect(screen.getByRole('img', { name: 'Fachada da igreja' })).toBeInTheDocument();
    expect(screen.getByText('Texto da fachada.')).toBeInTheDocument();
    expect(container.querySelector('audio source')?.getAttribute('src')).toBe('/midia/teste/foto-01.mp3');
  });

  it('troca a foto ao escolher a miniatura e atualiza os dois recursos', async () => {
    const { container } = render(<Galeria fotografias={fotos} nomeLugar="Lugar" />);
    await userEvent.click(screen.getByRole('button', { name: /Mostrar fotografia 2 de 3: Interior/ }));
    expect(screen.getByText('Texto do interior.')).toBeInTheDocument();
    expect(screen.queryByText('Texto da fachada.')).not.toBeInTheDocument();
    expect(container.querySelector('audio')).toBeNull();
    expect(screen.getByText(/audiodescrição narrada desta fotografia está em produção/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Mostrar fotografia 2 de 3/ })).toHaveAttribute('aria-current', 'true');
  });

  it('mostra espaço reservado identificado quando a foto não foi enviada', async () => {
    render(<Galeria fotografias={fotos} nomeLugar="Lugar" />);
    await userEvent.click(screen.getByRole('button', { name: /Mostrar fotografia 3 de 3/ }));
    expect(screen.getByRole('img', { name: /Espaço reservado: Jardim ainda não foi enviada/ })).toBeInTheDocument();
    expect(screen.getByText(/descrição textual desta fotografia está em preparação/)).toBeInTheDocument();
  });

  it('navega pelas miniaturas com as setas do teclado', async () => {
    render(<Galeria fotografias={fotos} nomeLugar="Lugar" />);
    const lista = screen.getByRole('list', { name: /Miniaturas/ });
    within(lista).getAllByRole('button')[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: /Mostrar fotografia 2 de 3/ })).toHaveFocus();
    await userEvent.keyboard('{End}');
    expect(screen.getByRole('button', { name: /Mostrar fotografia 3 de 3/ })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: /Mostrar fotografia 1 de 3/ })).toHaveFocus();
  });

  it('oferece tela cheia para fotos publicadas e mostra subtítulos da descrição', async () => {
    const comSub: Fotografia[] = [{ ...fotos[0], descricaoTextual: ['Texto.', '## Importância histórica', 'Mais texto.'] }];
    render(<Galeria fotografias={comSub} nomeLugar="Lugar" />);
    expect(screen.getByRole('button', { name: /em tela cheia/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Importância histórica', level: 4 })).toBeInTheDocument();
  });

  it('mantém leitura e audição como recursos separados', () => {
    render(<Galeria fotografias={fotos} nomeLugar="Lugar" />);
    expect(screen.getByRole('heading', { name: /Ler a descrição/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Ouvir a audiodescrição/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ouvir audiodescrição da fotografia 1 de 3/ })).toBeInTheDocument();
  });
});
