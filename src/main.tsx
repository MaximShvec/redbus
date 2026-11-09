import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/rubik/index.css';
import '@fontsource-variable/nunito-sans/index.css';
import 'lenis/dist/lenis.css';
import './styles/global.css';
import './styles/shell.css';
import './styles/sections.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
