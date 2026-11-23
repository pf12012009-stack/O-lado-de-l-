import { useEffect, useState } from 'react';

type Texto = 'normal' | 'maior' | 'muito-maior';

function ler(chave: string): string | null {
  try {
    return localStorage.getItem(chave);
  } catch {
    return null;
  }
}
function gravar(chave: string, valor: string) {
  try {
    localStorage.setItem(chave, valor);
  } catch {
    /* armazenamento indisponível: a preferência vale só nesta visita */
  }
}

/** Preferências de leitura: tamanho do texto e alto contraste. */
export function Preferencias() {
  const [texto, setTexto] = useState<Texto>('normal');
  const [contraste, setContraste] = useState(false);

  useEffect(() => {
    setTexto((ler('pref-texto') as Texto) || 'normal');
    setContraste(ler('pref-contraste') === 'alto');
  }, []);

  useEffect(() => {
    const raiz = document.documentElement;
    if (texto === 'normal') delete raiz.dataset.texto;
    else raiz.dataset.texto = texto;
    gravar('pref-texto', texto);
  }, [texto]);

  useEffect(() => {
    const raiz = document.documentElement;
    if (contraste) raiz.dataset.contraste = 'alto';
    else delete raiz.dataset.contraste;
    gravar('pref-contraste', contraste ? 'alto' : 'normal');
  }, [contraste]);

  const opcoes: { v: Texto; rotulo: string; nome: string }[] = [
    { v: 'normal', rotulo: 'A', nome: 'Texto normal' },
    { v: 'maior', rotulo: 'A+', nome: 'Texto maior' },
    { v: 'muito-maior', rotulo: 'A++', nome: 'Texto muito maior' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Preferências de leitura">
      <span className="text-sm font-bold" aria-hidden="true">Texto</span>
      {opcoes.map((o) => (
        <button
          key={o.v}
          type="button"
          onClick={() => setTexto(o.v)}
          aria-pressed={texto === o.v}
          aria-label={o.nome}
          className={`min-h-11 min-w-11 rounded-lg border-2 px-2 font-bold ${
            texto === o.v ? 'border-rio bg-rio text-papel' : 'border-linha bg-superficie text-tinta'
          }`}
        >
          {o.rotulo}
        </button>
      ))}
      <button
        type="button"
        onClick={() => setContraste((c) => !c)}
        aria-pressed={contraste}
        className={`min-h-11 rounded-lg border-2 px-3 text-sm font-bold ${
          contraste ? 'border-rio bg-rio text-papel' : 'border-linha bg-superficie text-tinta'
        }`}
      >
        Alto contraste
      </button>
    </div>
  );
}
