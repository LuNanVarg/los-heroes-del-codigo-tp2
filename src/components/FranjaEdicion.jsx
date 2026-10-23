import { useEffect, useState } from 'react';
import { useTema } from '../context/TemaContext.jsx';

const fechaLarga = new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export default function FranjaEdicion() {
  const { tema } = useTema();
  const futurista = tema === 'futurista';
  const [ahora, setAhora] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setAhora(new Date()), futurista ? 1000 : 60000);
    return () => clearInterval(id);
  }, [futurista]);

  return (
    <div className="franja" aria-hidden="true">
      <span>{futurista ? 'SYS//GRUPO_17' : 'Año I · N.º 17'}</span>
      <span className="franja-centro">{futurista ? 'STATUS: ONLINE ●' : 'Precio: un commit'}</span>
      <span>{futurista ? `SYS_TIME ${ahora.toLocaleTimeString('es-AR', { hour12: false })} ART` : fechaLarga.format(ahora)}</span>
    </div>
  );
}
