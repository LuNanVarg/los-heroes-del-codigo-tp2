import { useState } from 'react';
import { arbol } from '../data/arbol.js';
import EncabezadoPagina from '../components/EncabezadoPagina.jsx';
import NodoArbol from '../components/NodoArbol.jsx';
import { useTitulo } from '../hooks/useTitulo.js';

export default function Arbol() {
  useTitulo('Árbol de render');
  const [orden, setOrden] = useState({ abierto: true, version: 0 });

  return (
    <>
      <EncabezadoPagina etiqueta="React · jerarquía de componentes" titulo="Árbol de render">
        Así se anidan los componentes de esta aplicación, de <code>TemaProvider</code> hasta las tarjetas. Cada nodo se corresponde
        con un archivo del código; los que tienen hijos se expanden y se contraen.
      </EncabezadoPagina>

      <div className="acciones-mini arbol-acciones">
        <button type="button" className="btn" onClick={() => setOrden((o) => ({ abierto: true, version: o.version + 1 }))}>Expandir todo</button>
        <button type="button" className="btn" onClick={() => setOrden((o) => ({ abierto: false, version: o.version + 1 }))}>Contraer todo</button>
      </div>

      <ul className="arbol-lista arbol-raiz" aria-label="Árbol de componentes">
        <NodoArbol key={orden.version} nodo={arbol} orden={orden} />
      </ul>
    </>
  );
}
