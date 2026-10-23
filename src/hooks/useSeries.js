import { useCallback, useEffect, useState } from 'react';
import { buscarSeries } from '../lib/tvmaze.js';

export function useSeries(consulta) {
  const [resultado, setResultado] = useState({ estado: 'cargando', datos: [], error: '' });
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    if (!consulta.trim()) {
      setResultado({ estado: 'vacio', datos: [], error: '' });
      return undefined;
    }
    const control = new AbortController();
    setResultado((r) => ({ ...r, estado: 'cargando', error: '' }));

    buscarSeries(consulta, { signal: control.signal })
      .then((datos) => setResultado({ estado: 'ok', datos, error: '' }))
      .catch((err) => {
        if (err.name === 'AbortError') return; // se canceló al cambiar de pantalla o de búsqueda
        setResultado({ estado: 'error', datos: [], error: err.message });
      });

    return () => control.abort();
  }, [consulta, intento]);

  const reintentar = useCallback(() => setIntento((n) => n + 1), []);
  return { ...resultado, reintentar };
}
