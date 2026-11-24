import { Route, Router, Switch } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import { comTransicao, useLocalizacaoComTransicao } from './lib/transicao';
import { Layout } from './components/Layout';
import { AtracaoPagina } from './pages/AtracaoPagina';
import { Atracoes, CategoriaPagina } from './pages/Atracoes';
import { Inicio } from './pages/Inicio';
import { Acessibilidade, Comercio, Contato, Sobre } from './pages/Institucionais';
import { NaoEncontrada } from './pages/NaoEncontrada';

/** Modo prévia (arquivo único): navegação em memória, sem depender do endereço da página. */
const PREVIA = import.meta.env.VITE_PREVIA === '1';
const memoria = PREVIA ? memoryLocation({ path: '/' }) : undefined;
const hookMemoria = memoria
  ? (): ReturnType<typeof memoria.hook> => {
      const [l, n] = memoria.hook();
      return [l, comTransicao(n)];
    }
  : undefined;

export function App({ caminho }: { caminho?: string }) {
  return (
    <Router ssrPath={caminho} hook={caminho === undefined ? hookMemoria ?? useLocalizacaoComTransicao : undefined}>
      <Layout>
        <Switch>
          <Route path="/"><Inicio /></Route>
          <Route path="/pontos-turisticos"><Atracoes /></Route>
          <Route path="/pontos-turisticos/:slug">{(p) => <AtracaoPagina slug={p.slug} />}</Route>
          <Route path="/turismo-religioso"><CategoriaPagina id="religioso" /></Route>
          <Route path="/turismo-de-aventura"><CategoriaPagina id="aventura" /></Route>
          <Route path="/turismo-de-natureza"><CategoriaPagina id="natureza" /></Route>
          <Route path="/comercio-local"><Comercio /></Route>
          <Route path="/sobre"><Sobre /></Route>
          <Route path="/contato"><Contato /></Route>
          <Route path="/acessibilidade"><Acessibilidade /></Route>
          <Route><NaoEncontrada /></Route>
        </Switch>
      </Layout>
    </Router>
  );
}
