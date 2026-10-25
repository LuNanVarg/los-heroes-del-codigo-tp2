import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import FranjaEdicion from '../components/FranjaEdicion.jsx';
import IconoHamburguesa from '../components/IconoHamburguesa.jsx';

export default function Layout() {
  const [abierta, setAbierta] = useState(false);
  const { pathname } = useLocation();
  const principal = useRef(null);
  const primera = useRef(true);

  useEffect(() => {
    setAbierta(false);
    window.scrollTo(0, 0);
    if (primera.current) { primera.current = false; return; }
    principal.current?.focus({ preventScroll: true });
  }, [pathname]);

  useEffect(() => {
    const alTeclear = (e) => e.key === 'Escape' && setAbierta(false);
    document.addEventListener('keydown', alTeclear);
    return () => document.removeEventListener('keydown', alTeclear);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('sin-scroll', abierta);
    return () => document.body.classList.remove('sin-scroll');
  }, [abierta]);

  return (
    <div className="app">
      <a className="saltar" href="#contenido">Saltar al contenido</a>

      <header className="topbar">
        <Link to="/" className="tb-marca">NEWS: Héroes del código</Link>
        <button type="button" className="btn tb-menu" aria-expanded={abierta} aria-controls="barra-lateral"
        aria-label={abierta ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setAbierta((a) => !a)}>
          <IconoHamburguesa abierta={abierta} />
        </button>
      </header>

      <Sidebar abierta={abierta} onCerrar={() => setAbierta(false)} />

      <main id="contenido" className="contenido" tabIndex={-1} ref={principal}>
        <FranjaEdicion />
        <Outlet />
      </main>
    </div>
  );
}
