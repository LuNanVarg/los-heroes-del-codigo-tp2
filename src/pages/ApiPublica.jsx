import { useState } from 'react';
import { useSeries } from '../hooks/useSeries.js';
import EncabezadoPagina from '../components/EncabezadoPagina.jsx';
import EstadoCarga from '../components/EstadoCarga.jsx';
import EstadoError from '../components/EstadoError.jsx';
import TarjetaSerie from '../components/TarjetaSerie.jsx';
import { useTitulo } from '../hooks/useTitulo.js';

const CONSULTA_INICIAL = 'ghost in the shell';

export default function ApiPublica() {
  useTitulo('API pública');
  const [texto, setTexto] = useState(CONSULTA_INICIAL);
  const [consulta, setConsulta] = useState(CONSULTA_INICIAL);
  const { estado, datos, error, reintentar } = useSeries(consulta);

  const buscar = (e) => { e.preventDefault(); setConsulta(texto); };

  return (
    <>
      <EncabezadoPagina etiqueta="API pública · TVmaze" titulo="Series en vivo">
        Consultamos la API pública y gratuita de TVmaze (sin claves). Por cada serie devuelve el nombre, el año de estreno,
        el idioma, el puntaje, los géneros, un resumen y una imagen. La usamos para explorar series relacionadas con nuestra
        referencia visual: <em>Ghost in the Shell</em>.
      </EncabezadoPagina>

      <form className="controles" onSubmit={buscar} role="search" aria-label="Buscar series">
        <label className="campo campo-grande">
          <span>Buscar una serie</span>
          <input type="search" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Ej.: ghost in the shell, matrix…" />
        </label>
        <button type="submit" className="btn btn-fuerte">Buscar</button>
        <button type="button" className="btn" onClick={reintentar} disabled={estado === 'cargando'}>Actualizar</button>
      </form>

      {estado === 'cargando' && <EstadoCarga mensaje="Consultando la API de TVmaze…" />}
      {estado === 'error' && <EstadoError mensaje={error} onReintentar={reintentar} />}
      {estado === 'vacio' && <div className="estado" role="status"><p>Escribí el nombre de una serie para buscarla.</p></div>}
      {estado === 'ok' && datos.length === 0 && (
        <div className="estado" role="status"><p><strong>La API no encontró series para «{consulta}».</strong></p><p>Probá con otro nombre.</p></div>
      )}
      {estado === 'ok' && datos.length > 0 && (
        <>
          <p className="resumen-lista" aria-live="polite">{datos.length} resultado{datos.length === 1 ? '' : 's'} para «{consulta}»</p>
          <div className="grilla grilla-2">
            {datos.map((s) => <TarjetaSerie key={s.id} serie={s} />)}
          </div>
        </>
      )}
    </>
  );
}
