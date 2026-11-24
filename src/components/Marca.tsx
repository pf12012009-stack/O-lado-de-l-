/** Marca do projeto: o brasão redondo original e o nome. Usada sobre a faixa verde-mata. */
export function Marca({ tamanho = 'normal' }: { tamanho?: 'normal' | 'grande' }) {
  const img = tamanho === 'grande' ? 'h-20 w-20' : 'h-11 w-11 sm:h-12 sm:w-12';
  return (
    <span className="flex items-center gap-3">
      <img
        src="/img/brasao-160.webp"
        alt=""
        width={160}
        height={160}
        className={`${img} shrink-0 rounded-full ring-2 ring-[#f4b43a]/70 transition-transform duration-500 hover:rotate-[-6deg]`}
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-wide sm:text-2xl">O Lado de Lá</span>
        <span className="ouro mt-1 text-sm tracking-[0.2em]">Turismo</span>
      </span>
    </span>
  );
}
