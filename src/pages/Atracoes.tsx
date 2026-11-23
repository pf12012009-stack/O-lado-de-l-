import { Link } from 'wouter';
import { CardAtracao } from '../components/Cards';
import { Pagina } from '../components/Layout';
import { ATRACOES, CATEGORIAS, atracoesDaCategoria, categoriaPorId } from '../data/atracoes';
import type { CategoriaId } from '../data/tipos';
import { NaoEncontrada } from './NaoEncontrada';

function Filtros({ atual }: { atual?: CategoriaId }) {
  const itens = [{ href: '/atracoes', rotulo: 'Todos', ativo: !atual }, ...CATEGORIAS.map((c) => ({ href: `/categoria/${c.id}`, rotulo: c.nome, ativo: atual === c.id }))];
  return (
    <nav aria-label="Categorias" className="mt-6">
      <ul className="flex flex-wrap gap-2">
        {itens.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              aria-current={i.ativo ? 'page' : undefined}
              className={`botao text-sm ${i.ativo ? 'botao-primario' : 'botao-contorno'}`}
            >
              {i.rotulo}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Lista({ titulo, intro, atual, lista }: { titulo: string; intro: string; atual?: CategoriaId; lista: typeof ATRACOES }) {
  return (
    <div className="conteudo pt-12">
      <h1 className="text-4xl font-extrabold sm:text-5xl">{titulo}</h1>
      <p className="mt-3 texto-corrido text-lg text-tinta-suave">{intro}</p>
      <Filtros atual={atual} />
      {lista.length ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((a) => <li key={a.slug} className="flex"><CardAtracao atracao={a} nivelTitulo={2} /></li>)}
        </ul>
      ) : (
        <p className="mt-10 text-tinta-suave">Ainda não há lugares publicados nesta categoria.</p>
      )}
    </div>
  );
}

export function Atracoes() {
  return (
    <Pagina titulo="Pontos turísticos" descricao="Conheça os pontos turísticos de Alto Piquiri (PR) por fotografias, descrições textuais e audiodescrições.">
      <Lista titulo="Pontos turísticos" intro="Escolha um lugar para ver as fotografias, ler as descrições e ouvir as audiodescrições." lista={ATRACOES} />
    </Pagina>
  );
}

export function CategoriaPagina({ id }: { id: string }) {
  const cat = CATEGORIAS.find((c) => c.id === id);
  if (!cat) return <NaoEncontrada />;
  const c = categoriaPorId(cat.id);
  return (
    <Pagina titulo={c.nome} descricao={`${c.nome} em Alto Piquiri (PR): ${c.descricao}`}>
      <Lista titulo={c.nome} intro={c.descricao} atual={c.id} lista={atracoesDaCategoria(c.id)} />
    </Pagina>
  );
}
