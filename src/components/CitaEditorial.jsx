import { useState } from 'react';

export default function CitaEditorial({ citas }) {
  const [indice, setIndice] = useState(0);
  const nueva = () => {
    if (citas.length < 2) return;
    let n;
    do { n = Math.floor(Math.random() * citas.length); } while (n === indice);
    setIndice(n);
  };
  return (
    <section className="cita" aria-labelledby="cita-titulo">
      <h3 id="cita-titulo">Cita editorial</h3>
      <blockquote aria-live="polite">«{citas[indice]}»</blockquote>
      <button type="button" className="btn" onClick={nueva}>Nueva frase</button>
    </section>
  );
}
