import { useState } from 'react';

const formatear = (iso) => iso.split('-').reverse().join('-');

export default function EntradaBitacora({ entrada, orden, abiertaInicial = false }) {
  const [abierta, setAbierta] = useState(orden.version > 0 ? orden.abierto : abiertaInicial);
  const idPanel = `bit-${entrada.id}`;

  return (
    <article className={`entrada ${abierta ? 'abierta' : ''}`}>
      <h3>
        <button type="button" className="entrada-btn" aria-expanded={abierta} aria-controls={idPanel} onClick={() => setAbierta((v) => !v)}>
          <span className="entrada-fecha">{formatear(entrada.fecha)}</span>
          <span className="entrada-titulo">{entrada.titulo}</span>
          <span className="insignia">{entrada.etapa}</span>
          <span className="entrada-signo" aria-hidden="true">{abierta ? '−' : '+'}</span>
        </button>
      </h3>
      <div id={idPanel} className="entrada-texto" hidden={!abierta}><p>{entrada.texto}</p></div>
    </article>
  );
}
