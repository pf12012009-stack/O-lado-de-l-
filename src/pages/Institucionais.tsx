import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { CardEstabelecimento } from '../components/Cards';
import { ListaDeContatos, ListaDeFatos } from '../components/Fontes';
import { IconeMapa } from '../components/Icones';
import { Pagina } from '../components/Layout';
import { BUSCAS_NO_MAPA, CATEGORIAS_COMERCIO, ESTABELECIMENTOS, linkBuscaMapa } from '../data/comercio';
import { CANAIS, CIDADE, SITE } from '../data/site';

function Topo({ titulo, children }: { titulo: string; children?: ReactNode }) {
  return (
    <div className="faixa-marca pb-12 pt-12">
      <div className="conteudo">
        <h1 className="text-4xl font-semibold sm:text-6xl">{titulo}</h1>
        {children && <div className="mt-4 max-w-3xl space-y-3 text-lg opacity-95">{children}</div>}
      </div>
    </div>
  );
}

export function Comercio() {
  const grupos = CATEGORIAS_COMERCIO.map((c) => ({ ...c, itens: ESTABELECIMENTOS.filter((e) => e.categoria === c.id) })).filter((c) => c.itens.length);
  return (
    <Pagina titulo="Comércio local" descricao="Comércios parceiros e busca de serviços em Alto Piquiri (PR), com endereço, mapa e WhatsApp.">
      <Topo titulo="Comércio local">
        <p>Conheça os comércios parceiros do projeto e encontre serviços em Alto Piquiri. Esta área é separada dos pontos turísticos.</p>
      </Topo>
      <div className="conteudo">
        <section aria-labelledby="titulo-parceiros" className="mt-12">
          <h2 id="titulo-parceiros" className="border-b-2 border-sol pb-3 text-3xl font-semibold">Comércios parceiros</h2>
          <nav aria-label="Categorias dos parceiros" className="mt-5">
            <ul className="flex flex-wrap gap-2">
              {grupos.map((g) => <li key={g.id}><a className="botao botao-contorno text-sm" href={`#${g.id}`}>{g.nome}</a></li>)}
            </ul>
          </nav>
          {grupos.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`t-${g.id}`} className="mt-10 scroll-mt-6">
              <h3 id={`t-${g.id}`} className="text-2xl font-semibold">{g.nome}</h3>
              <ul className="mt-4 grid gap-4 md:grid-cols-2">
                {g.itens.map((e) => <li key={e.slug}><CardEstabelecimento item={e} /></li>)}
              </ul>
            </section>
          ))}
          <p className="mt-8 rounded-xl border-2 border-dashed border-linha bg-superficie p-5">
            Tem um negócio em Alto Piquiri e quer aparecer aqui? O canal para novos parceiros será publicado nesta página.
          </p>
        </section>

        <section aria-labelledby="titulo-mapa" className="mt-16">
          <h2 id="titulo-mapa" className="border-b-2 border-sol pb-3 text-3xl font-semibold">Procurar no mapa</h2>
          <p className="mt-4 texto-corrido text-tinta-suave">
            Cada botão abre uma busca ao vivo no Google Maps. Os resultados não são recomendações do projeto: confirme endereço e funcionamento com cada estabelecimento.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BUSCAS_NO_MAPA.map((b) => (
              <li key={b.rotulo}>
                <a
                  href={linkBuscaMapa(b.termo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full items-start gap-3 rounded-xl border-2 border-linha bg-superficie p-4 text-tinta no-underline hover:border-sol"
                >
                  <IconeMapa className="mt-1 shrink-0 text-terra" />
                  <span>
                    <span className="block font-display text-xl font-semibold text-rio">{b.rotulo}</span>
                    <span className="block text-sm text-tinta-suave">{b.descricao}</span>
                  </span>
                  <span className="sr-only"> (abre o Google Maps em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Pagina>
  );
}

export function Sobre() {
  return (
    <Pagina titulo="Sobre o projeto" descricao="O Lado de Lá Turismo é uma plataforma de turismo virtual, conhecimento, inclusão e acessibilidade de Alto Piquiri (PR).">
      <Topo titulo="Sobre o O Lado de Lá">
        <p>{SITE.lema}</p>
      </Topo>
      <div className="conteudo mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="texto-corrido space-y-5 text-lg">
          <p>
            O Lado de Lá Turismo é uma plataforma de turismo virtual, conhecimento, inclusão e acessibilidade. Aqui você conhece os pontos turísticos e os lugares interessantes de Alto Piquiri, no Paraná, pela internet.
          </p>
          <p>
            Muita gente não consegue viajar: por falta de dinheiro, por limitações físicas, por usar cadeira de rodas, pela distância ou pela dificuldade de deslocamento. Outras pessoas só têm curiosidade de conhecer um lugar novo. O projeto existe para aproximar essas pessoas dos lugares que elas gostariam de ver.
          </p>
          <p>
            Cada lugar tem sua própria página, com galeria de fotografias. Para cada foto há uma descrição textual, para ler, e uma audiodescrição narrada, para ouvir. Também estamos preparando conteúdo em Libras feito por intérprete.
          </p>
          <h2 className="pt-4 text-2xl font-semibold">O que o projeto não é</h2>
          <p>Não somos uma agência de viagens. Não vendemos passagens, pacotes nem passeios.</p>
          <h2 className="pt-4 text-2xl font-semibold">Créditos</h2>
          <p>{SITE.credito}</p>
          <p>Fotografias e textos dos pontos turísticos: Guia Virtual de Turismo e Patrimônio Cultural de Alto Piquiri, Projeto EPT, Colégio Estadual Alto Piquiri, 2026.</p>
          <p>Apoio institucional: Prefeitura Municipal de Alto Piquiri.</p>
        </div>
        <aside aria-labelledby="titulo-cidade" className="h-fit rounded-2xl bg-superficie p-6 shadow-[var(--sombra)]">
          <h2 id="titulo-cidade" className="text-2xl font-semibold">{CIDADE.nome}</h2>
          <div className="mt-4"><ListaDeFatos fatos={CIDADE.fatos} /></div>
        </aside>
      </div>
    </Pagina>
  );
}

export function Contato() {
  return (
    <Pagina titulo="Contato e canais oficiais" descricao="Canais oficiais da Prefeitura de Alto Piquiri, do Santuário São José e do Pedala Paraná.">
      <Topo titulo="Contato e canais oficiais">
        <p>Cada contato leva à própria instituição. Dúvidas sobre eventos, peregrinações e condições da rota devem ser tratadas diretamente com o Santuário e com os órgãos do Estado.</p>
      </Topo>
      <div className="conteudo mt-12 grid gap-6 lg:grid-cols-3">
        {CANAIS.map((c) => (
          <section key={c.instituicao} aria-labelledby={`c-${c.instituicao}`} className="rounded-2xl bg-superficie p-6 shadow-[var(--sombra)]">
            <h2 id={`c-${c.instituicao}`} className="text-2xl font-semibold">{c.instituicao}</h2>
            {c.descricao && <p className="mt-1 text-tinta-suave">{c.descricao}</p>}
            <div className="mt-4"><ListaDeContatos contatos={c.contatos} /></div>
          </section>
        ))}
      </div>
    </Pagina>
  );
}

export function Acessibilidade() {
  return (
    <Pagina titulo="Acessibilidade" descricao="Recursos de acessibilidade do O Lado de Lá Turismo e como usá-los.">
      <Topo titulo="Acessibilidade no site">
        <p>A acessibilidade é parte da identidade deste projeto. O site segue as diretrizes WCAG 2.2, nível AA.</p>
      </Topo>
      <div className="conteudo mt-12 texto-corrido space-y-10 text-lg">
        <section>
          <h2 className="text-2xl font-semibold">Descrição textual e audiodescrição</h2>
          <p className="mt-2">Cada fotografia tem duas opções independentes: ler a descrição textual ou ouvir a audiodescrição narrada. O player tem botões para ouvir, pausar, voltar e avançar 10 segundos, além da escolha de velocidade. Nenhuma narração é feita por voz sintetizada.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Libras</h2>
          <p className="mt-2">Cada ponto turístico tem um espaço para vídeo em Libras feito por intérprete. Enquanto o vídeo não fica pronto, a página informa isso, sem avatar ou tradução automática.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Navegação por teclado</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Tab e Shift+Tab percorrem links e botões. O foco fica sempre visível.</li>
            <li>O primeiro item da página é o link "Pular para o conteúdo".</li>
            <li>Na galeria, as setas esquerda e direita trocam a fotografia. Home e End vão para a primeira e a última.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Preferências de leitura</h2>
          <p className="mt-2">No botão "Acessibilidade" do topo (ou no menu, no celular) você aumenta o tamanho do texto e ativa o alto contraste. A escolha fica guardada neste aparelho.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Leitores de tela</h2>
          <p className="mt-2">As páginas usam títulos em ordem, regiões identificadas e textos alternativos nas imagens. Ao trocar de fotografia, o leitor de tela anuncia qual foto está sendo exibida. Ao mudar de página, o foco vai para o título principal.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Encontrou uma barreira?</h2>
          <p className="mt-2">O canal do projeto para relatar barreiras de acessibilidade será publicado aqui. Enquanto isso, os <Link href="/contato">canais oficiais</Link> do município estão na página de contato.</p>
        </section>
      </div>
    </Pagina>
  );
}
