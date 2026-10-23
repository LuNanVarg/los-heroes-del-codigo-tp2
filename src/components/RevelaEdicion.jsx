import { useEffect, useRef, useState } from 'react';

export default function RevelaEdicion({ items }) {
  const [indice, setIndice] = useState(0);
  const [pos, setPos] = useState(100);
  const interactuo = useRef(false);
  const m = items[indice];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPos(50); return undefined; }
    let raf; const inicio = performance.now();
    const paso = (t) => {
      if (interactuo.current) return;
      const k = Math.min((t - inicio - 500) / 1600, 1);
      if (k >= 0) setPos(100 - 50 * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, []);

  const mover = (e) => { interactuo.current = true; setPos(Number(e.target.value)); };

  return (
    <figure className="revela">
      <div className="revela-escena" style={{ '--pos': `${pos}%` }}>
        <div className="revela-capa revela-futuro">
          <img src={m.foto} alt="" />
          <span className="revela-tag">ID_{m.figura} // {m.corto.toUpperCase()}</span>
        </div>
        <div className="revela-capa revela-diario">
          <img src={m.foto} alt={`Retrato de ${m.nombre}`} />
          <span className="revela-tag">Fig. {m.figura} — {m.corto}</span>
        </div>
        <span className="revela-linea" aria-hidden="true"><i /></span>
        <input
          className="revela-input" type="range" min="0" max="100" step="1" value={pos} onChange={mover}
          aria-label="Cortina entre el diario impreso y el holograma"
          aria-valuetext={`${Math.round(pos)}% diario impreso, ${100 - Math.round(pos)}% holograma`}
        />
        <span className="revela-rotulo izq" aria-hidden="true">Diario</span>
        <span className="revela-rotulo der" aria-hidden="true">Holograma</span>
      </div>
      <figcaption>
        <span className="etiqueta">Elegí un héroe y arrastrá la cortina</span>
        <div className="revela-fichas" role="group" aria-label="Elegir integrante">
          {items.map((it, i) => (
            <button key={it.slug} type="button" className="ficha" aria-pressed={i === indice} onClick={() => setIndice(i)}>{it.corto}</button>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
