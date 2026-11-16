import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { isEmbedded } from './host';
import { initializeTheme } from './theme';
import './styles.css';

initializeTheme();
if (isEmbedded) document.documentElement.classList.add('embedded');

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
