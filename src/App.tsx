import { Route, Router, Switch } from 'wouter';
import { Layout } from './components/Layout';
import { AtracaoPagina } from './pages/AtracaoPagina';
import { Atracoes, CategoriaPagina } from './pages/Atracoes';
import { Inicio } from './pages/Inicio';
import { Acessibilidade, Comercio, Contato, Sobre } from './pages/Institucionais';
import { NaoEncontrada } from './pages/NaoEncontrada';

export function App({ caminho }: { caminho?: string }) {
  return (
    <Router ssrPath={caminho}>
      <Layout>
        <Switch>
          <Route path="/"><Inicio /></Route>
          <Route path="/atracoes"><Atracoes /></Route>
          <Route path="/atracoes/:slug">{(p) => <AtracaoPagina slug={p.slug} />}</Route>
          <Route path="/categoria/:id">{(p) => <CategoriaPagina id={p.id} />}</Route>
          <Route path="/comercio"><Comercio /></Route>
          <Route path="/sobre"><Sobre /></Route>
          <Route path="/contato"><Contato /></Route>
          <Route path="/acessibilidade"><Acessibilidade /></Route>
          <Route><NaoEncontrada /></Route>
        </Switch>
      </Layout>
    </Router>
  );
}
