import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/unbounded';
import '@fontsource/unbounded/800.css'; // static cut: clean contours for the outlined hero headline
import '@fontsource-variable/manrope';
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
