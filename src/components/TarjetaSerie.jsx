export default function TarjetaSerie({ serie }) {
  const resumen = serie.resumen.length > 220 ? `${serie.resumen.slice(0, 220).trim()}…` : serie.resumen;
  return (
    <article className="tarjeta tarjeta-serie">
      {serie.imagen
        ? <img src={serie.imagen} alt={`Imagen de ${serie.nombre}`} loading="lazy" />
        : <div className="serie-sin-imagen" aria-hidden="true">Sin imagen</div>}
      <div className="serie-datos">
        <h3>{serie.nombre}</h3>
        <p className="serie-meta">
          {serie.anio} · {serie.idioma}{serie.puntaje ? ` · ★ ${serie.puntaje}` : ''}
        </p>
        {serie.generos.length > 0 && <p className="serie-generos">{serie.generos.join(' · ')}</p>}
        <p>{resumen || 'Sin resumen disponible.'}</p>
        <a href={serie.url} target="_blank" rel="noopener noreferrer" className="enlace-ext">Ver en TVmaze ↗</a>
      </div>
    </article>
  );
}
