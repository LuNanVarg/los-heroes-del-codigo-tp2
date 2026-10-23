import { Link } from 'react-router-dom';
import { useTitulo } from '../hooks/useTitulo.js';

export default function NoEncontrada() {
  useTitulo('Página no encontrada');
  return (
    <section className="estado estado-404" role="alert">
      <p className="etiqueta">Error 404</p>
      <h1>Esta página no existe</h1>
      <p>El enlace puede estar mal escrito o la sección ya no está. Volvé a la portada o elegí una sección del menú.</p>
      <Link to="/" className="btn btn-fuerte">Volver a la portada</Link>
    </section>
  );
}
