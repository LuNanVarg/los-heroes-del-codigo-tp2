import { Link } from 'react-router-dom';

export default function TarjetaIntegrante({ miembro }) {
  return (
    <Link to={`/integrantes/${miembro.slug}`} className="tarjeta tarjeta-integrante">
      <span className="tarjeta-tag">{miembro.figura}</span>
      <img src={miembro.foto} alt={`Foto de ${miembro.nombre}`} loading="lazy" width="320" height="320" />
      <h3>{miembro.corto}</h3>
      <p>{miembro.rol}</p>
      <span className="tarjeta-cta">Ver perfil →</span>
    </Link>
  );
}
