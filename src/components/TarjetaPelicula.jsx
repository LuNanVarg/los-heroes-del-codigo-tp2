import { useState } from 'react';

export default function TarjetaPelicula({ peli, conContador = false }) {
  const [abierta, setAbierta] = useState(false);
  const [veces, setVeces] = useState(0);
  const idSinopsis = `sin-${peli.titulo.replace(/\W+/g, '-').toLowerCase()}`;

  return (
    <article className="tarjeta tarjeta-peli">
      <img src={peli.img} alt={`Afiche de ${peli.titulo}`} loading="lazy" decoding="async" />
      <h4>{peli.titulo}</h4>
      <p className="peli-dir">Dir. {peli.direccion}</p>

      {peli.sinopsis && (
        <>
          <button type="button" className="btn btn-chico" aria-expanded={abierta} aria-controls={idSinopsis} onClick={() => setAbierta((v) => !v)}>
            {abierta ? 'Ocultar sinopsis' : 'Ver sinopsis'}
          </button>
          <p id={idSinopsis} className="sinopsis" hidden={!abierta}>{peli.sinopsis}</p>
        </>
      )}

      {conContador && (
        <button type="button" className="btn btn-chico" onClick={() => setVeces((v) => v + 1)}>
          La vi {veces} {veces === 1 ? 'vez' : 'veces'}
        </button>
      )}

      <a href={peli.wiki} target="_blank" rel="noopener noreferrer" className="enlace-ext">Wikipedia ↗</a>
    </article>
  );
}
