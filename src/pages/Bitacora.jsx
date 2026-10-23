import { useState } from 'react';
import { bitacora } from '../data/bitacora.js';
import EncabezadoPagina from '../components/EncabezadoPagina.jsx';
import EntradaBitacora from '../components/EntradaBitacora.jsx';
import { useTitulo } from '../hooks/useTitulo.js';

const filtros = ['Todas', 'TP1', 'TP2'];

export default function Bitacora() {
  useTitulo('Bitácora');
  const [etapa, setEtapa] = useState('Todas');
  const [orden, setOrden] = useState({ abierto: false, version: 0 });
  const visibles = bitacora.filter((e) => etapa === 'Todas' || e.etapa === etapa);

  return (
    <>
      <EncabezadoPagina etiqueta="Proceso del equipo" titulo="Bitácora">
        El detrás de escena: qué hicimos, qué decidimos y qué dificultades resolvimos. Continúa la bitácora del TP1.
      </EncabezadoPagina>

      <div className="controles controles-fila">
        <div className="revela-fichas" role="group" aria-label="Filtrar por etapa">
          {filtros.map((f) => (
            <button key={f} type="button" className="ficha" aria-pressed={etapa === f} onClick={() => setEtapa(f)}>{f}</button>
          ))}
        </div>
        <div className="acciones-mini">
          <button type="button" className="btn-texto" onClick={() => setOrden((o) => ({ abierto: true, version: o.version + 1 }))}>Expandir todo</button>
          <button type="button" className="btn-texto" onClick={() => setOrden((o) => ({ abierto: false, version: o.version + 1 }))}>Contraer todo</button>
        </div>
      </div>

      <div className="linea-tiempo">
        {visibles.map((e, i) => <EntradaBitacora key={`${e.id}-${orden.version}`} entrada={e} orden={orden} abiertaInicial={i === visibles.length - 1} />)}
      </div>
    </>
  );
}
