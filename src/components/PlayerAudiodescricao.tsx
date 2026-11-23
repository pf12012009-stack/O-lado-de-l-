import { useEffect, useId, useRef, useState } from 'react';
import type { Fotografia } from '../data/tipos';
import { IconeAvancar10, IconeFone, IconePausa, IconePlay, IconeVoltar10 } from './Icones';

const VELOCIDADES = [0.75, 1, 1.25, 1.5, 2];

export function formatarTempo(s: number): string {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const seg = Math.floor(s % 60);
  return `${m}:${String(seg).padStart(2, '0')}`;
}

function tempoFalado(s: number): string {
  const m = Math.floor(s / 60);
  const seg = Math.floor(s % 60);
  return m ? `${m} min ${seg} s` : `${seg} s`;
}

interface Props {
  foto: Fotografia;
  /** Rótulo da posição, ex.: "fotografia 2 de 8" */
  posicao: string;
}

/**
 * Player da audiodescrição gravada de uma fotografia.
 * Usa apenas o arquivo de áudio narrado. Nunca gera fala sintetizada a partir do texto.
 */
export function PlayerAudiodescricao({ foto, posicao }: Props) {
  const ad = foto.audiodescricao;
  const audio = useRef<HTMLAudioElement>(null);
  const [tocando, setTocando] = useState(false);
  const [atual, setAtual] = useState(0);
  const [duracao, setDuracao] = useState(ad?.duracaoSegundos ?? 0);
  const [velocidade, setVelocidade] = useState(1);
  const [erro, setErro] = useState(false);
  const idTitulo = useId();
  const idVelocidade = useId();

  useEffect(() => {
    if (audio.current) audio.current.playbackRate = velocidade;
  }, [velocidade]);

  // Pausa ao trocar de fotografia ou sair da página.
  useEffect(() => {
    const el = audio.current;
    return () => el?.pause();
  }, []);

  const alternar = async () => {
    const el = audio.current;
    if (!el) return;
    if (el.paused) {
      try {
        await el.play();
      } catch {
        setErro(true);
      }
    } else el.pause();
  };
  const pular = (delta: number) => {
    const el = audio.current;
    if (el) el.currentTime = Math.min(Math.max(0, el.currentTime + delta), duracao || el.duration || 0);
  };

  return (
    <section
      aria-labelledby={idTitulo}
      className="rounded-2xl border-2 border-terra/40 bg-terra-clara/60 p-5"
    >
      <h3 id={idTitulo} className="flex items-center gap-2 text-lg font-bold text-terra">
        <IconeFone /> Ouvir a audiodescrição
      </h3>

      {!ad ? (
        <p className="mt-2 text-tinta-suave">
          A audiodescrição narrada desta fotografia está em produção e será publicada aqui.
        </p>
      ) : (
        <div className="mt-3">
          <p className="text-sm text-tinta-suave">
            Narração da {posicao}: {foto.titulo}
            {ad.narracao ? `. Voz de ${ad.narracao}` : ''}.
          </p>
          <audio
            ref={audio}
            preload="metadata"
            onPlay={() => setTocando(true)}
            onPause={() => setTocando(false)}
            onEnded={() => setTocando(false)}
            onTimeUpdate={(e) => setAtual(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuracao(e.currentTarget.duration)}
            onError={() => setErro(true)}
          >
            <source src={ad.arquivo} />
            {ad.arquivoAlternativo && <source src={ad.arquivoAlternativo} />}
          </audio>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={alternar}
              className="botao botao-primario min-w-36"
              aria-label={`${tocando ? 'Pausar' : 'Ouvir'} audiodescrição da ${posicao}`}
            >
              {tocando ? <IconePausa /> : <IconePlay />}
              <span aria-hidden="true">{tocando ? 'Pausar' : 'Ouvir'}</span>
            </button>
            <button type="button" onClick={() => pular(-10)} className="botao botao-contorno px-3" aria-label="Voltar 10 segundos">
              <IconeVoltar10 />
            </button>
            <button type="button" onClick={() => pular(10)} className="botao botao-contorno px-3" aria-label="Avançar 10 segundos">
              <IconeAvancar10 />
            </button>
            <label htmlFor={idVelocidade} className="ml-auto flex items-center gap-2 text-sm font-bold">
              Velocidade
              <select
                id={idVelocidade}
                value={velocidade}
                onChange={(e) => setVelocidade(Number(e.target.value))}
                className="min-h-11 rounded-lg border-2 border-linha bg-superficie px-2 text-tinta"
              >
                {VELOCIDADES.map((v) => (
                  <option key={v} value={v}>{String(v).replace('.', ',')}x</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className="w-12 text-sm tabular-nums" aria-hidden="true">{formatarTempo(atual)}</span>
            <input
              type="range"
              min={0}
              max={duracao || 0}
              step={1}
              value={Math.min(atual, duracao || 0)}
              onChange={(e) => {
                if (audio.current) audio.current.currentTime = Number(e.target.value);
              }}
              aria-label="Posição da narração"
              aria-valuetext={`${tempoFalado(atual)} de ${tempoFalado(duracao)}`}
              className="h-11 flex-1 accent-[var(--terra)]"
            />
            <span className="w-12 text-right text-sm tabular-nums" aria-hidden="true">{formatarTempo(duracao)}</span>
          </div>

          {erro && (
            <p role="alert" className="mt-2 font-bold text-terra">
              Não foi possível reproduzir o áudio. Verifique a conexão e tente de novo.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
