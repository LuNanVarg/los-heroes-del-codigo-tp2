import { Link, NavLink } from 'react-router-dom';
import { miembros } from '../data/miembros.js';
import BotonTema from '../components/BotonTema.jsx';

const secciones = [
  { to: '/recursos', texto: 'Recursos' },
  { to: '/api', texto: 'API pública' },
  { to: '/arbol', texto: 'Árbol de render' },
  { to: '/bitacora', texto: 'Bitácora' },
];

export default function Sidebar({ abierta, onCerrar }) {
  return (
    <>
      <div className={`sb-fondo ${abierta ? 'visible' : ''}`} onClick={onCerrar} aria-hidden="true" />
      <aside id="barra-lateral" className={`sidebar ${abierta ? 'abierta' : ''}`} aria-label="Menú principal">
        <button type="button" className="sb-cerrar" onClick={onCerrar} aria-label="Cerrar menú">✕</button>

        <Link to="/" className="sb-marca">
          <img src="/favicon.svg" alt="" width="44" height="44" />
          <span>
            <strong>NEWS: Héroes del código</strong>
            <small>Grupo 17 · TSDS · IFTS N°29</small>
          </span>
        </Link>

        <nav aria-label="Secciones">
          <ul className="sb-lista">
            <li><NavLink to="/" end>Portada</NavLink></li>
            <li>
              <span className="sb-titulo">Integrantes</span>
              <ul className="sb-sublista">
                {miembros.map((m) => (
                  <li key={m.slug}><NavLink to={`/integrantes/${m.slug}`}>{m.corto}</NavLink></li>
                ))}
              </ul>
            </li>
            {secciones.map((s) => (
              <li key={s.to}><NavLink to={s.to}>{s.texto}</NavLink></li>
            ))}
          </ul>
        </nav>

        <div className="sb-pie"><BotonTema /></div>
      </aside>
    </>
  );
}
