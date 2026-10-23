import { useState } from 'react';

export default function TarjetaRecurso({ recurso, orden }) {
  const [abierta, setAbierta] = useState(orden.version > 0 && orden.abierto);
  const idPanel = `recurso-${recurso.id}`;

  return (
    <article className={`tarjeta tarjeta-recurso ${abierta ? 'abierta' : ''}`}>
      <div className="recurso-etiquetas">
        <span className="insignia">{recurso.categoria}</span>
        <span className="insignia suave">{recurso.etapa === 'Ambos' ? 'TP1 + TP2' : recurso.etapa}</span>
      </div>
      <h3>{recurso.nombre}</h3>
      <p>{recurso.descripcion}</p>
      <button type="button" className="btn btn-chico" aria-expanded={abierta} aria-controls={idPanel} onClick={() => setAbierta((v) => !v)}>
        {abierta ? 'Ver menos' : 'Ver más'}
      </button>
      <div id={idPanel} className="recurso-detalle" hidden={!abierta}>
        <h4>En nuestro proyecto</h4>
        <p>{recurso.aporte}</p>
        <a href={recurso.url} target="_blank" rel="noopener noreferrer" className="enlace-ext">Abrir sitio ↗</a>
      </div>
    </article>
  );
}
