
export const URL_BUSQUEDA = 'https://api.tvmaze.com/search/shows';
export const TIEMPO_MAXIMO_MS = 8000; // si la API no responde en este tiempo, se muestra un error en vez de quedar cargando

export class ErrorApi extends Error {
  constructor(mensaje) { super(mensaje); this.name = 'ErrorApi'; }
}

export const limpiarHtml = (html = '') =>
  html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();

export function normalizarSerie(s) {
  return {
    id: s.id,
    nombre: s.name,
    anio: s.premiered ? s.premiered.slice(0, 4) : 's/d',
    puntaje: s.rating?.average ?? null,
    generos: s.genres ?? [],
    resumen: limpiarHtml(s.summary ?? ''),
    imagen: s.image?.medium ? s.image.medium.replace('http://', 'https://') : null,
    url: s.url,
    idioma: s.language ?? 's/d',
  };
}

export function mensajeParaEstado(status) {
  if (status === 404) return 'La API no encontró lo que se pidió (error 404).';
  if (status === 429) return 'Se hicieron demasiadas consultas seguidas (error 429). Esperá un momento y reintentá.';
  if (status >= 500) return `El servidor de TVmaze tiene problemas (código ${status}). Probá de nuevo en un rato.`;
  return `La API respondió con el código ${status}.`;
}

export async function buscarSeries(consulta, { signal, timeoutMs = TIEMPO_MAXIMO_MS, fetchFn = globalThis.fetch } = {}) {
  if (signal?.aborted) { const e = new Error('Consulta cancelada'); e.name = 'AbortError'; throw e; }

  const control = new AbortController();
  let vencio = false;
  const cancelarDesdeAfuera = () => control.abort();

  signal?.addEventListener('abort', cancelarDesdeAfuera, { once: true });
  const reloj = setTimeout(() => { vencio = true; control.abort(); }, timeoutMs);

  try {
    const resp = await fetchFn(`${URL_BUSQUEDA}?q=${encodeURIComponent(consulta)}`, { signal: control.signal });
    if (!resp.ok) throw new ErrorApi(mensajeParaEstado(resp.status));

    let json;
    try { json = await resp.json(); } catch (e) {
      if (control.signal.aborted) throw e;
      throw new ErrorApi('La API devolvió un formato inesperado.');
    }
    if (!Array.isArray(json)) throw new ErrorApi('La API devolvió un formato inesperado.');
    return json.filter((item) => item && item.show).map((item) => normalizarSerie(item.show));
  } catch (err) {
    if (vencio) throw new ErrorApi(`La API tardó más de ${Math.max(1, Math.round(timeoutMs / 1000))} segundos en responder. Probá de nuevo.`);
    if (err.name === 'AbortError') throw err;
    if (err instanceof ErrorApi) throw err;
    throw new ErrorApi('No se pudo conectar con la API. Revisá tu conexión a internet.');
  } finally {
    clearTimeout(reloj);
    signal?.removeEventListener('abort', cancelarDesdeAfuera);
  }
}
