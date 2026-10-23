export default function EtiquetaHabilidad({ nombre, desc, activa, onClick }) {
  if (!desc) return <span className="etiqueta-hab">{nombre}</span>;
  return (
    <button type="button" className="etiqueta-hab interactiva" aria-pressed={activa} onClick={onClick}>{nombre}</button>
  );
}
