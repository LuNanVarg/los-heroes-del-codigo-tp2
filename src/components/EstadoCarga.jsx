export default function EstadoCarga({ mensaje = 'Cargando…' }) {
  return (
    <div className="estado estado-carga" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>{mensaje}</p>
    </div>
  );
}
