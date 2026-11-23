import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { CardEstabelecimento } from '../components/Cards';
import { ListaDeFatos } from '../components/Fontes';
import { Pagina } from '../components/Layout';
import { CATEGORIAS_COMERCIO, ESTABELECIMENTOS } from '../data/comercio';
import { CIDADE, CONTATO, SITE } from '../data/site';

function Cabeca({ titulo, children }: { titulo: string; children?: ReactNode }) {
  return (
    <header className="max-w-3xl">
      <h1 className="text-4xl font-extrabold sm:text-5xl">{titulo}</h1>
      {children && <div className="mt-4 space-y-3 text-lg text-tinta-suave">{children}</div>}
    </header>
  );
}

export function Comercio() {
  const categorias = CATEGORIAS_COMERCIO.map((c) => ({ ...c, itens: ESTABELECIMENTOS.filter((e) => e.categoria === c.id) })).filter((c) => c.itens.length);
  return (
    <Pagina titulo="Comércio local" descricao="Estabelecimentos e parceiros do comércio local de Alto Piquiri (PR), com endereço, mapa e contato.">
      <div className="conteudo pt-12">
        <Cabeca titulo="Comércio local">
          <p>Conheça os estabelecimentos de Alto Piquiri. Este espaço valoriza quem faz a cidade e é separado dos pontos turísticos.</p>
        </Cabeca>
        {categorias.length ? (
          <>
            <nav aria-label="Categorias do comércio" className="mt-6">
              <ul className="flex flex-wrap gap-2">
                {categorias.map((c) => <li key={c.id}><a className="botao botao-contorno text-sm" href={`#${c.id}`}>{c.nome}</a></li>)}
              </ul>
            </nav>
            {categorias.map((c) => (
              <section key={c.id} id={c.id} aria-labelledby={`t-${c.id}`} className="mt-12 scroll-mt-6">
                <h2 id={`t-${c.id}`} className="text-2xl font-bold sm:text-3xl">{c.nome}</h2>
                <ul className="mt-5 grid gap-4 md:grid-cols-2">
                  {c.itens.map((e) => <li key={e.slug}><CardEstabelecimento item={e} /></li>)}
                </ul>
              </section>
            ))}
          </>
        ) : (
          <div className="mt-10 max-w-2xl rounded-xl border-2 border-dashed border-terra/60 bg-superficie p-6">
            <h2 className="text-2xl font-bold">Os primeiros estabelecimentos chegam em breve</h2>
            <p className="mt-3">
              Estamos reunindo as informações dos comerciantes e parceiros locais. Cada estabelecimento terá nome, categoria, endereço, link para o mapa e contato pelo WhatsApp, quando informado.
            </p>
            <p className="mt-3">
              Tem um negócio em Alto Piquiri e quer aparecer aqui? <Link href="/contato">Veja como falar com o projeto</Link>.
            </p>
          </div>
        )}
      </div>
    </Pagina>
  );
}

export function Sobre() {
  return (
    <Pagina titulo="Sobre o projeto" descricao="O Lado de Lá Turismo é uma plataforma de turismo virtual, conhecimento, inclusão e acessibilidade de Alto Piquiri (PR).">
      <div className="conteudo pt-12">
        <Cabeca titulo="Sobre o O Lado de Lá" />
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="texto-corrido space-y-5 text-lg">
            <p className="font-display text-2xl font-bold text-rio">{SITE.lema}</p>
            <p>
              O Lado de Lá Turismo é uma plataforma de turismo virtual, conhecimento, inclusão e acessibilidade. Aqui você conhece os pontos turísticos e os lugares interessantes de Alto Piquiri, no Paraná, pela internet.
            </p>
            <p>
              Muita gente não consegue viajar: por falta de dinheiro, por limitações físicas, por usar cadeira de rodas, pela distância ou pela dificuldade de deslocamento. Outras pessoas só têm curiosidade de conhecer um lugar novo. O projeto existe para aproximar essas pessoas dos lugares que elas gostariam de ver.
            </p>
            <p>
              Cada lugar tem sua própria página, com galeria de fotografias. Para cada foto há uma descrição textual, para ler, e uma audiodescrição narrada, para ouvir.
            </p>
            <h2 className="pt-4 text-2xl font-bold">O que o projeto não é</h2>
            <p>Não somos uma agência de viagens. Não vendemos passagens, pacotes nem passeios.</p>
          </div>
          <aside aria-labelledby="titulo-cidade" className="h-fit rounded-3xl bg-superficie p-6 shadow-[var(--sombra)]">
            <h2 id="titulo-cidade" className="text-2xl font-bold">{CIDADE.nome}</h2>
            <div className="mt-4"><ListaDeFatos fatos={CIDADE.fatos} /></div>
          </aside>
        </div>
      </div>
    </Pagina>
  );
}

export function Contato() {
  const canais = [
    CONTATO.email && { rotulo: 'E-mail', valor: CONTATO.email, href: `mailto:${CONTATO.email}` },
    CONTATO.whatsapp && { rotulo: 'WhatsApp', valor: CONTATO.whatsapp, href: `https://wa.me/${CONTATO.whatsapp.replace(/\D/g, '')}` },
    CONTATO.instagram && { rotulo: 'Instagram', valor: CONTATO.instagram, href: CONTATO.instagram },
    CONTATO.facebook && { rotulo: 'Facebook', valor: CONTATO.facebook, href: CONTATO.facebook },
  ].filter(Boolean) as { rotulo: string; valor: string; href: string }[];
  return (
    <Pagina titulo="Contato" descricao="Fale com o O Lado de Lá Turismo.">
      <div className="conteudo pt-12">
        <Cabeca titulo="Contato">
          <p>Fale com o projeto para enviar sugestões, informar um erro de acessibilidade ou cadastrar um estabelecimento local.</p>
        </Cabeca>
        {canais.length ? (
          <ul className="mt-8 grid max-w-2xl gap-3">
            {canais.map((c) => (
              <li key={c.rotulo} className="rounded-xl bg-superficie p-5 shadow-[var(--sombra)]">
                <p className="text-sm font-bold text-tinta-suave">{c.rotulo}</p>
                <a href={c.href} className="text-lg font-bold" target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{c.valor}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 max-w-2xl rounded-xl border-2 border-dashed border-linha bg-superficie p-6">
            Os canais oficiais de contato serão publicados aqui em breve.
          </p>
        )}
      </div>
    </Pagina>
  );
}

export function Acessibilidade() {
  return (
    <Pagina titulo="Acessibilidade" descricao="Recursos de acessibilidade do O Lado de Lá Turismo e como usá-los.">
      <div className="conteudo pt-12">
        <Cabeca titulo="Acessibilidade no site">
          <p>A acessibilidade é parte da identidade deste projeto. O site segue as diretrizes WCAG 2.2, nível AA.</p>
        </Cabeca>
        <div className="mt-8 texto-corrido space-y-8 text-lg">
          <section>
            <h2 className="text-2xl font-bold">Descrição textual e audiodescrição</h2>
            <p className="mt-2">Cada fotografia tem duas opções independentes: ler a descrição textual ou ouvir a audiodescrição narrada. O player tem botões para ouvir, pausar, voltar e avançar 10 segundos, além da escolha de velocidade.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold">Navegação por teclado</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Tab e Shift+Tab percorrem links e botões. O foco fica sempre visível.</li>
              <li>O primeiro item da página é o link "Pular para o conteúdo".</li>
              <li>Na galeria, as setas esquerda e direita trocam a fotografia. Home e End vão para a primeira e a última.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold">Preferências de leitura</h2>
            <p className="mt-2">No botão "Acessibilidade" do topo (ou no menu, no celular) você aumenta o tamanho do texto e ativa o alto contraste. A escolha fica guardada neste aparelho.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold">Leitores de tela</h2>
            <p className="mt-2">As páginas usam títulos em ordem, regiões identificadas e textos alternativos nas imagens. Ao trocar de fotografia, o leitor de tela anuncia qual foto está sendo exibida.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold">Encontrou uma barreira?</h2>
            <p className="mt-2">Conte para o projeto pela página de <Link href="/contato">contato</Link>. Toda barreira relatada é tratada como prioridade.</p>
          </section>
        </div>
      </div>
    </Pagina>
  );
}
