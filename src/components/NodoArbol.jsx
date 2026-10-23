import { useState } from 'react';

export default function NodoArbol({ nodo, orden }) {
  const tieneHijos = Boolean(nodo.hijos?.length);
  const [abierto, setAbierto] = useState(orden.abierto);

  return (
    <li className="nodo">
      <div className="nodo-fila">
        {tieneHijos ? (
          <button type="button" className="nodo-btn" aria-expanded={abierto} aria-label={`${abierto ? 'Contraer' : 'Expandir'} ${nodo.nombre}`} onClick={() => setAbierto((v) => !v)}>
            {abierto ? '▾' : '▸'}
          </button>
        ) : <span className="nodo-hoja" aria-hidden="true">•</span>}
        <code className="nodo-nombre">&lt;{nodo.nombre} /&gt;</code>
        <span className="nodo-archivo">{nodo.archivo}</span>
      </div>
      <p className="nodo-nota">{nodo.nota}</p>
      {tieneHijos && abierto && (
        <ul className="arbol-lista">
          {nodo.hijos.map((h) => <NodoArbol key={h.nombre} nodo={h} orden={orden} />)}
        </ul>
      )}
    </li>
  );
}
