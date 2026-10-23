import { Link } from 'react-router-dom';
import { miembros } from '../data/miembros.js';
import recursos from '../data/recursos.json';
import RevelaEdicion from '../components/RevelaEdicion.jsx';
import TarjetaIntegrante from '../components/TarjetaIntegrante.jsx';
import TarjetaEnlace from '../components/TarjetaEnlace.jsx';
import { useTitulo } from '../hooks/useTitulo.js';

export default function Portada() {
  useTitulo('');
  return (
    <>
      <section className="hero" aria-labelledby="titulo-portada">
        <div className="hero-texto">
          <p className="etiqueta">Grupo 17 · Desarrollo de Sistemas Web Front End</p>
          <h1 id="titulo-portada" data-text="¿Estamos a salvo?">¿Estamos a salvo?</h1>
          <p className="bajada">La pregunta que atormenta a la web.</p>
          <div className="hero-parrafos">
            <p>El código ha encontrado a sus verdaderos protectores. Frente al colapso de las interfaces lentas y los errores sin resolver, una nueva fuerza acaba de tomar el control para traernos estabilidad y magia a nuestra web.</p>
            <p>La salvación ha llegado: Revelaremos la identidad de cada uno de ellos y descubriremos de qué son capaces los auténticos héroes de la interfaz.</p>
          </div>
          <div className="hero-acciones">
            <a href="#equipo" className="btn btn-fuerte">Conocer al equipo</a>
            <Link to="/recursos" className="btn">Ver recursos</Link>
          </div>
        </div>
        <div className="hero-visual">
          <img className="ilus ilus-futuro" src="/img/hud-holograma.svg" alt="Panel holográfico con los cinco integrantes del Grupo 17 en línea" />
          <img className="ilus ilus-diario" src="/img/diario-sello.svg" alt="Página de diario con la redacción del Grupo 17 y un sello de edición especial" />
        </div>
      </section>

      <section className="bloque presentacion" aria-labelledby="quienes">
        <p className="etiqueta">Quiénes somos</p>
        <h2 id="quienes">Los Héroes del Código</h2>
        <p>
          Somos el Grupo 17 de la cursada de Desarrollo de Sistemas Web Front End (TSDS · IFTS N°29).
          Esta aplicación React continúa el proyecto del TP1: reúne a las cinco personas del equipo, un catálogo
          de recursos, una consulta a una API pública, el árbol de componentes y la bitácora de nuestro proceso.
        </p>
      </section>

      <section className="bloque" aria-labelledby="papel">
        <p className="etiqueta">Dos ediciones, un mismo equipo</p>
        <h2 id="papel">Del papel a la pantalla</h2>
        <p className="bajada">La misma foto en dos épocas: impresa en el diario y proyectada en el holograma. Es lo que hace el botón «Edición» del menú.</p>
        <RevelaEdicion items={miembros} />
      </section>

      <section id="equipo" className="bloque" aria-labelledby="equipo-titulo">
        <p className="etiqueta">Integrantes</p>
        <h2 id="equipo-titulo">Los héroes del código</h2>
        <div className="grilla grilla-5">
          {miembros.map((m) => <TarjetaIntegrante key={m.slug} miembro={m} />)}
        </div>
      </section>

      <section className="bloque" aria-labelledby="explorar">
        <p className="etiqueta">Más secciones</p>
        <h2 id="explorar">Explorá la aplicación</h2>
        <div className="grilla grilla-4">
          <TarjetaEnlace to="/recursos" etiqueta="JSON local" titulo="Recursos" texto={`${recursos.length} herramientas y referencias del proyecto, con búsqueda y filtros.`} />
          <TarjetaEnlace to="/api" etiqueta="API pública" titulo="Series en vivo" texto="Consulta a TVmaze con estados de carga, error y reintento." />
          <TarjetaEnlace to="/arbol" etiqueta="React" titulo="Árbol de render" texto="La jerarquía real de componentes, que se expande y se contrae." />
          <TarjetaEnlace to="/bitacora" etiqueta="Proceso" titulo="Bitácora" texto="Registros del trabajo del equipo, desplegables y filtrables." />
        </div>
      </section>
    </>
  );
}
