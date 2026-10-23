import { useMemo, useState } from 'react';
import recursos from '../data/recursos.json';
import EncabezadoPagina from '../components/EncabezadoPagina.jsx';
import TarjetaRecurso from '../components/TarjetaRecurso.jsx';
import { useTitulo } from '../hooks/useTitulo.js';

const limpiar = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const categorias = ['Todas', ...new Set(recursos.map((r) => r.categoria))];
const etapas = ['Todas', 'TP1', 'TP2', 'Ambos'];

export default function Recursos() {
  useTitulo('Recursos');
  const [texto, setTexto] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [etapa, setEtapa] = useState('Todas');
  const [orden, setOrden] = useState({ abierto: false, version: 0 });

  const filtrados = useMemo(() => {
    const q = limpiar(texto.trim());
    return recursos.filter((r) =>
      (categoria === 'Todas' || r.categoria === categoria) &&
      (etapa === 'Todas' || r.etapa === etapa) &&
      (!q || limpiar(`${r.nombre} ${r.descripcion} ${r.aporte}`).includes(q)));
  }, [texto, categoria, etapa]);

  const hayFiltros = texto !== '' || categoria !== 'Todas' || etapa !== 'Todas';
  const restablecer = () => { setTexto(''); setCategoria('Todas'); setEtapa('Todas'); };

  return (
    <>
      <EncabezadoPagina etiqueta="Datos locales · JSON" titulo="Recursos del equipo">
        Herramientas, lenguajes y referencias que usamos en el proyecto. Los {recursos.length} registros salen de un archivo JSON local
        (<code>src/data/recursos.json</code>) y se muestran dinámicamente.
      </EncabezadoPagina>

      <div className="controles" role="search" aria-label="Buscar y filtrar recursos">
        <label className="campo campo-grande">
          <span>Buscar por texto</span>
          <input type="search" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Ej.: react, diseño, imágenes…" />
        </label>
        <label className="campo">
          <span>Categoría</span>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {categorias.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="campo">
          <span>Etapa</span>
          <select value={etapa} onChange={(e) => setEtapa(e.target.value)}>
            {etapas.map((c) => <option key={c} value={c}>{c === 'Ambos' ? 'TP1 + TP2' : c}</option>)}
          </select>
        </label>
        <button type="button" className="btn" onClick={restablecer} disabled={!hayFiltros}>Restablecer</button>
      </div>

      <div className="resumen-lista">
        <p aria-live="polite">Mostrando <strong>{filtrados.length}</strong> de {recursos.length} registros</p>
        {filtrados.length > 0 && (
          <div className="acciones-mini">
            <button type="button" className="btn-texto" onClick={() => setOrden((o) => ({ abierto: true, version: o.version + 1 }))}>Expandir todo</button>
            <button type="button" className="btn-texto" onClick={() => setOrden((o) => ({ abierto: false, version: o.version + 1 }))}>Contraer todo</button>
          </div>
        )}
      </div>

      {filtrados.length > 0 ? (
        <div className="grilla grilla-3">
          {filtrados.map((r) => <TarjetaRecurso key={`${r.id}-${orden.version}`} recurso={r} orden={orden} />)}
        </div>
      ) : (
        <div className="estado" role="status">
          <p><strong>No encontramos recursos con esa búsqueda.</strong></p>
          <p>Probá con otra palabra o quitá algún filtro.</p>
          <button type="button" className="btn" onClick={restablecer}>Mostrar la lista completa</button>
        </div>
      )}
    </>
  );
}
