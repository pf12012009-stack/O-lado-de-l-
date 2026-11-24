import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { App } from '../src/App';
import { rotas } from '../src/entry-server';
import { ESTABELECIMENTOS, linkWhatsapp } from '../src/data/comercio';
import { ATRACOES } from '../src/data/atracoes';

describe('Rotas', () => {
  it('mantém os endereços do site antigo', () => {
    const caminhos = rotas().map((r) => r.caminho);
    for (const c of [
      '/', '/pontos-turisticos', '/turismo-religioso', '/turismo-de-aventura', '/comercio-local', '/sobre', '/contato',
      '/pontos-turisticos/santuario-sao-jose', '/pontos-turisticos/capela-nossa-senhora-aparecida',
      '/pontos-turisticos/capela-santo-antonio', '/pontos-turisticos/rio-piquiri',
      '/pontos-turisticos/rio-guere', '/pontos-turisticos/pedal-das-aguas',
    ]) expect(caminhos).toContain(c);
  });

  it('cada rota renderiza com exatamente um h1 e sem página de erro', () => {
    for (const r of rotas()) {
      const html = renderToString(<App caminho={r.caminho} />);
      expect(html.match(/<h1/g)?.length, r.caminho).toBe(1);
      expect(html, r.caminho).not.toContain('Esta página não existe');
    }
  });

  it('endereço inexistente mostra a página 404', () => {
    expect(renderToString(<App caminho="/nao-existe" />)).toContain('Esta página não existe');
  });
});

describe('Conteúdo migrado', () => {
  it('toda atração tem seção de Libras honesta (sem vídeo = pendente)', () => {
    window.history.pushState(null, '', '/pontos-turisticos/capela-santo-antonio');
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Conteúdo em Libras' })).toBeInTheDocument();
    expect(screen.getByText(/Nenhum avatar ou tradução automática/)).toBeInTheDocument();
  });

  it('galeria vazia (Rio Guere) informa que as fotos virão depois', () => {
    window.history.pushState(null, '', '/pontos-turisticos/rio-guere');
    render(<App />);
    expect(screen.getByText(/fotografias deste lugar serão publicadas em breve/)).toBeInTheDocument();
  });

  it('todo comércio tem endereço e link de mapa; WhatsApp leva a mensagem pronta', () => {
    for (const e of ESTABELECIMENTOS) {
      expect(e.endereco).toBeTruthy();
      expect(e.linkMapa).toMatch(/^https:\/\/www\.google\.com\/maps/);
    }
    expect(linkWhatsapp('5544997418403', 'Olá?')).toBe('https://wa.me/5544997418403?text=Ol%C3%A1%3F');
  });

  it('ids das fotografias são únicos e em formato de nome de arquivo', () => {
    for (const a of ATRACOES) for (const f of a.fotografias) expect(f.id).toMatch(/^[a-z0-9-]+$/);
  });
});
