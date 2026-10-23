export default function EncabezadoPagina({ etiqueta, titulo, children }) {
  return (
    <header className="pagina-enc">
      <p className="etiqueta">{etiqueta}</p>
      <h1 data-text={titulo}>{titulo}</h1>
      {children && <p className="bajada">{children}</p>}
    </header>
  );
}
