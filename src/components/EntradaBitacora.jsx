import { useState } from 'react';
import { Link } from 'react-router-dom';

const formatear = (iso) => iso.split('-').reverse().join('-');

// Una entrada puede ser un texto corrido (TP1) o un relato en tres pasos (TP2).
const PASOS = [
  { clave: 'problema', titulo: 'El problema' },
  { clave: 'decision', titulo: 'La decisión' },
  { clave: 'resultado', titulo: 'El resultado' },
];

export default function EntradaBitacora({ entrada, numero, orden, abiertaInicial = false }) {
  const [abierta, setAbierta] = useState(orden.version > 0 ? orden.abierto : abiertaInicial);
  const idPanel = `bit-${entrada.id}`;
  const esRelato = PASOS.some((p) => entrada[p.clave]);

  return (
    <article className={`entrada ${abierta ? 'abierta' : ''}`}>
      <h3>
        <button type="button" className="entrada-btn" aria-expanded={abierta} aria-controls={idPanel} onClick={() => setAbierta((v) => !v)}>
          <span className="entrada-fecha">
            <span className="entrada-num">{String(numero).padStart(2, '0')}</span>
            {formatear(entrada.fecha)}
          </span>
          <span className="entrada-titulo">{entrada.titulo}</span>
          <span className="insignia">{entrada.etapa}</span>
          <span className="entrada-signo" aria-hidden="true">{abierta ? '−' : '+'}</span>
        </button>
      </h3>
      <div id={idPanel} className="entrada-texto" hidden={!abierta}>
        {esRelato ? (
          <div className="relato">
            {PASOS.filter((p) => entrada[p.clave]).map((p) => (
              <section key={p.clave} className={`relato-bloque relato-${p.clave}`}>
                <h4>{p.titulo}</h4>
                <p>{entrada[p.clave]}</p>
              </section>
            ))}
            {entrada.enlace && <Link className="relato-enlace" to={entrada.enlace.a}>{entrada.enlace.texto}</Link>}
          </div>
        ) : (
          <p>{entrada.texto}</p>
        )}
      </div>
    </article>
  );
}
