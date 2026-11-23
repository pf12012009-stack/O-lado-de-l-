import { Link } from 'wouter';
import { Pagina } from '../components/Layout';

export function NaoEncontrada() {
  return (
    <Pagina titulo="Página não encontrada" descricao="Esta página não existe no O Lado de Lá Turismo.">
      <div className="conteudo pt-16">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Esta página não existe</h1>
        <p className="mt-4 text-lg text-tinta-suave">O endereço pode ter mudado ou ter sido digitado com erro.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="botao botao-primario">Ir para o início</Link>
          <Link href="/atracoes" className="botao botao-contorno">Ver os pontos turísticos</Link>
        </div>
      </div>
    </Pagina>
  );
}
