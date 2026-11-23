import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles/global.css';

const raiz = document.getElementById('raiz')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
// Hidrata só quando o HTML pré-renderizado é da mesma página; senão renderiza do zero.
const caminhoAtual = window.location.pathname.replace(/\/(index\.html)?$|\.html$/, '') || '/';
if (raiz.hasChildNodes() && raiz.dataset.caminho === caminhoAtual && import.meta.env.VITE_PREVIA !== '1') hydrateRoot(raiz, app);
else {
  raiz.textContent = '';
  createRoot(raiz).render(app);
}
