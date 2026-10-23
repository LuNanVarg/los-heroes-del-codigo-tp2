import { Link } from 'react-router-dom';

export default function NavegacionPerfil({ anterior, siguiente }) {
  return (
    <nav className="nav-perfil" aria-label="Navegación entre perfiles">
      <Link className="btn" to={`/integrantes/${anterior.slug}`}>← {anterior.corto}</Link>
      <Link className="btn" to="/">Volver a la portada</Link>
      <Link className="btn" to={`/integrantes/${siguiente.slug}`}>{siguiente.corto} →</Link>
    </nav>
  );
}
