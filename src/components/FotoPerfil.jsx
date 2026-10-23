import { useState } from 'react';

export default function FotoPerfil({ src, nombre, figura, alternaColor = false }) {
  const [bn, setBn] = useState(false);
  const imagen = <img src={src} alt={`Foto de ${nombre}`} className={bn ? 'foto-bn' : ''} width="640" height="640" />;
  return (
    <figure className="foto-marco">
      {alternaColor ? (
        <button type="button" className="foto-btn" onClick={() => setBn((v) => !v)} aria-pressed={bn} title="Click para alternar color / blanco y negro">
          {imagen}
        </button>
      ) : imagen}
      <figcaption>Fig. {figura} — {nombre}{alternaColor && <small> · click en la foto: color / B&amp;N</small>}</figcaption>
    </figure>
  );
}
