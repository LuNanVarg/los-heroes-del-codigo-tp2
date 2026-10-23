import { Link } from 'react-router-dom';

export default function TarjetaEnlace({ to, etiqueta, titulo, texto }) {
  return (
    <Link to={to} className="tarjeta tarjeta-enlace">
      <span className="etiqueta">{etiqueta}</span>
      <h3>{titulo}</h3>
      <p>{texto}</p>
      <span className="tarjeta-cta">Entrar →</span>
    </Link>
  );
}
