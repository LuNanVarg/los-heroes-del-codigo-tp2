export default function EstadoError({ mensaje, onReintentar }) {
  return (
    <div className="estado estado-error" role="alert">
      <p><strong>No pudimos obtener los datos.</strong></p>
      <p>{mensaje}</p>
      <button type="button" className="btn" onClick={onReintentar}>Reintentar</button>
    </div>
  );
}
