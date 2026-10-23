import { useState } from 'react';

export default function ListaDiscos({ discos }) {
  const [abierto, setAbierto] = useState(null);
  return (
    <ul className="lista-compacta">
      {discos.map((d, i) => (
        <li key={d.titulo}>
          <strong>{d.titulo}</strong> — {d.artista}
          {d.dato && (
            <>
              {' '}
              <button type="button" className="btn-dato" aria-expanded={abierto === i} onClick={() => setAbierto(abierto === i ? null : i)}>
                {abierto === i ? 'ocultar dato' : 'ver dato'}
              </button>
              {abierto === i && <span className="dato" role="note">{d.dato}</span>}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
