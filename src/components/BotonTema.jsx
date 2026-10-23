import { useTema, NOMBRES_TEMA } from '../context/TemaContext.jsx';
import { IconoDiario } from './Iconos.jsx';

export default function BotonTema() {
  const { tema, alternar } = useTema();
  const siguiente = tema === 'diario' ? 'futurista' : 'diario';
  return (
    <button type="button" className="btn btn-tema" onClick={alternar} aria-label={`Edición ${NOMBRES_TEMA[tema]}. Cambiar a la edición ${NOMBRES_TEMA[siguiente]}`}>
      <IconoDiario />
      <span>Edición: {NOMBRES_TEMA[tema]}</span>
    </button>
  );
}
