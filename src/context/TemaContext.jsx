import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const TemaContext = createContext(null);

export const NOMBRES_TEMA = { diario: 'Diario', futurista: 'Futurista' };

function leerTemaInicial() {
  const t = document.documentElement.dataset.tema;
  return t === 'futurista' ? 'futurista' : 'diario';
}

export function TemaProvider({ children }) {
  const [tema, setTema] = useState(leerTemaInicial);

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    try { localStorage.setItem('tema', tema); } catch { /* modo privado: sigue funcionando sin guardar */ }
  }, [tema]);

  const alternar = useCallback(() => setTema((t) => (t === 'diario' ? 'futurista' : 'diario')), []);

  return <TemaContext.Provider value={{ tema, alternar }}>{children}</TemaContext.Provider>;
}

export const useTema = () => useContext(TemaContext);
