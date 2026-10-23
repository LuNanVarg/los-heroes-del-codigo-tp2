import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { miembros } from '../data/miembros.js';
import FotoPerfil from '../components/FotoPerfil.jsx';
import EtiquetaHabilidad from '../components/EtiquetaHabilidad.jsx';
import TarjetaPelicula from '../components/TarjetaPelicula.jsx';
import ListaDiscos from '../components/ListaDiscos.jsx';
import CitaEditorial from '../components/CitaEditorial.jsx';
import NavegacionPerfil from '../components/NavegacionPerfil.jsx';
import { IconoGitHub, IconoWeb } from '../components/Iconos.jsx';
import NoEncontrada from './NoEncontrada.jsx';
import { useTitulo } from '../hooks/useTitulo.js';

export default function Perfil() {
  const { slug } = useParams();
  const indice = miembros.findIndex((m) => m.slug === slug);
  const m = miembros[indice];
  const [habilidad, setHabilidad] = useState(null);

  useTitulo(m ? m.nombre : 'Perfil no encontrado');
  useEffect(() => setHabilidad(null), [slug]);

  if (!m) return <NoEncontrada />;

  const anterior = miembros[(indice - 1 + miembros.length) % miembros.length];
  const siguiente = miembros[(indice + 1) % miembros.length];
  const descripcion = m.habilidades.find((h) => h.nombre === habilidad)?.desc;

  return (
    <div className="perfil" key={m.slug}>
      <header className="perfil-enc">
        <p className="etiqueta">Integrante {m.figura} de 05</p>
        <h1 data-text={m.nombre}>{m.nombre}</h1>
        <p className="bajada">{m.rol}</p>
      </header>

      <div className="perfil-grilla">
        <div className="perfil-principal">
          <section className="bloque-chico ficha-datos" aria-label="Datos personales">
            <p><strong>Ciudad:</strong> {m.ciudad}</p>
            <p><strong>Edad:</strong> {m.edad} años</p>
            <div className="perfil-enlaces">
              <a className="btn" href={m.github} target="_blank" rel="noopener noreferrer"><IconoGitHub /><span>GitHub</span></a>
              <a className="btn" href={m.portfolio} target="_blank" rel="noopener noreferrer"><IconoWeb /><span>Portfolio</span></a>
            </div>
          </section>

          <section className="bloque-chico" aria-labelledby="hab">
            <h2 id="hab">Habilidades técnicas</h2>
            <div className="etiquetas">
              {m.habilidades.map((h) => (
                <EtiquetaHabilidad key={h.nombre} nombre={h.nombre} desc={h.desc} activa={habilidad === h.nombre}
                  onClick={() => setHabilidad(habilidad === h.nombre ? null : h.nombre)} />
              ))}
            </div>
            {m.habilidades.some((h) => h.desc) && (
              <p className="desc-habilidad" aria-live="polite">{descripcion || 'Hacé click en una habilidad para ver de qué se trata.'}</p>
            )}
          </section>

          <section className="bloque-chico" aria-labelledby="pelis">
            <h2 id="pelis">Películas favoritas</h2>
            <div className="grilla grilla-pelis">
              {m.peliculas.map((p) => <TarjetaPelicula key={p.titulo} peli={p} conContador={m.contador} />)}
            </div>
          </section>

          <section className="bloque-chico" aria-labelledby="discos">
            <h2 id="discos">Discos favoritos</h2>
            <ListaDiscos discos={m.discos} />
          </section>

          <section className="bloque-chico" aria-labelledby="lect">
            <h2 id="lect">Lecturas &amp; pasatiempos</h2>
            <ul className="lista-compacta">
              <li>
                <strong>Lecturas:</strong>{' '}
                {m.lecturas.map((l, i) => (
                  <span key={l.titulo}>
                    {i > 0 && (i === m.lecturas.length - 1 ? ' y ' : ', ')}
                    <em>{l.titulo}</em> ({l.autor})
                  </span>
                ))}.
              </li>
              <li><strong>Hobbies:</strong> {m.hobbies}</li>
            </ul>
          </section>

          <CitaEditorial citas={m.citas} />
          <NavegacionPerfil anterior={anterior} siguiente={siguiente} />
        </div>

        <aside className="perfil-lateral">
          <FotoPerfil src={m.foto} nombre={m.nombre} figura={m.figura} alternaColor={m.alternaColor} />
        </aside>
      </div>
    </div>
  );
}
