import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { TemaProvider } from './context/TemaContext.jsx';
import App from './App.jsx';
import './styles/index.css';
import './styles/perfil-sobremi.css';
import './styles/bitacora-relato.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TemaProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TemaProvider>
  </React.StrictMode>
);
