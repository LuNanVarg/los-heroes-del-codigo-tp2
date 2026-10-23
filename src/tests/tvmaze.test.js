// =====================================================================================
// TAREA DE EZEQUIEL · pruebas automáticas de la consulta a la API
// =====================================================================================
import test from 'node:test';
import assert from 'node:assert/strict';
import { buscarSeries, limpiarHtml, mensajeParaEstado, normalizarSerie, ErrorApi, URL_BUSQUEDA } from '../lib/tvmaze.js';

// Helpers: respuestas falsas de fetch (no se hace ninguna llamada real a internet)
const respuesta = (cuerpo, status = 200) => ({ ok: status >= 200 && status < 300, status, json: async () => cuerpo });
const fetchQue = (resp) => async () => resp;
// fetch que nunca responde, pero respeta la cancelación como el fetch real
const fetchColgado = (_url, { signal }) => new Promise((_, rechazar) => {
  signal.addEventListener('abort', () => { const e = new Error('abortado'); e.name = 'AbortError'; rechazar(e); });
});

const SERIE = { id: 7, name: 'Ghost in the Shell: SAC', premiered: '2002-10-01', language: 'Japanese', genres: ['Anime'],
  rating: { average: 8.4 }, summary: '<p><b>Hola</b> &amp; chau</p>', image: { medium: 'http://static.tvmaze.com/a.jpg' }, url: 'https://www.tvmaze.com/shows/7' };

test('limpiarHtml quita etiquetas y entidades', () => {
  assert.equal(limpiarHtml('<p><b>Hola</b> &amp; chau</p>'), 'Hola & chau');
  assert.equal(limpiarHtml(), '');
});

test('normalizarSerie ordena los datos y fuerza https en la imagen', () => {
  const s = normalizarSerie(SERIE);
  assert.deepEqual(s, { id: 7, nombre: 'Ghost in the Shell: SAC', anio: '2002', puntaje: 8.4, generos: ['Anime'], resumen: 'Hola & chau',
    imagen: 'https://static.tvmaze.com/a.jpg', url: 'https://www.tvmaze.com/shows/7', idioma: 'Japanese' });
});

test('normalizarSerie tolera datos faltantes', () => {
  const s = normalizarSerie({ id: 1, name: 'X', url: 'u' });
  assert.equal(s.anio, 's/d'); assert.equal(s.puntaje, null); assert.deepEqual(s.generos, []);
  assert.equal(s.resumen, ''); assert.equal(s.imagen, null); assert.equal(s.idioma, 's/d');
});

test('buscarSeries devuelve los resultados y codifica la consulta en la URL', async () => {
  let urlPedida = '';
  const fetchFn = async (url) => { urlPedida = url; return respuesta([{ score: 1, show: SERIE }]); };
  const datos = await buscarSeries('ghost in the shell & más', { fetchFn });
  assert.equal(datos.length, 1);
  assert.equal(datos[0].nombre, 'Ghost in the Shell: SAC');
  assert.equal(urlPedida, `${URL_BUSQUEDA}?q=${encodeURIComponent('ghost in the shell & más')}`);
});

test('buscarSeries devuelve un arreglo vacío si no hay resultados', async () => {
  assert.deepEqual(await buscarSeries('zzzz', { fetchFn: fetchQue(respuesta([])) }), []);
});

test('buscarSeries ignora elementos sin "show"', async () => {
  const datos = await buscarSeries('x', { fetchFn: fetchQue(respuesta([{ score: 1 }, null, { show: SERIE }])) });
  assert.equal(datos.length, 1);
});

test('error 404: mensaje específico', async () => {
  await assert.rejects(buscarSeries('x', { fetchFn: fetchQue(respuesta({}, 404)) }), (e) => e instanceof ErrorApi && /404/.test(e.message));
});

test('error 429: pide esperar y reintentar', async () => {
  await assert.rejects(buscarSeries('x', { fetchFn: fetchQue(respuesta({}, 429)) }), (e) => /demasiadas consultas/.test(e.message));
});

test('error 500: avisa que el servidor tiene problemas e incluye el código', async () => {
  await assert.rejects(buscarSeries('x', { fetchFn: fetchQue(respuesta({}, 500)) }), (e) => /servidor/.test(e.message) && /500/.test(e.message));
});

test('mensajeParaEstado cubre un código cualquiera', () => {
  assert.match(mensajeParaEstado(418), /418/);
});

test('formato inesperado: la API devuelve algo que no es un arreglo', async () => {
  await assert.rejects(buscarSeries('x', { fetchFn: fetchQue(respuesta({ hola: 1 })) }), (e) => /formato inesperado/.test(e.message));
});

test('formato inesperado: el cuerpo no es JSON válido', async () => {
  const resp = { ok: true, status: 200, json: async () => { throw new SyntaxError('Unexpected token <'); } };
  await assert.rejects(buscarSeries('x', { fetchFn: fetchQue(resp) }), (e) => /formato inesperado/.test(e.message));
});

test('sin conexión: se informa en vez de dejar el error crudo del navegador', async () => {
  const fetchFn = async () => { throw new TypeError('Failed to fetch'); };
  await assert.rejects(buscarSeries('x', { fetchFn }), (e) => e instanceof ErrorApi && /No se pudo conectar/.test(e.message));
});

test('TIMEOUT: si la API no responde a tiempo, falla con un mensaje en vez de quedar cargando', async () => {
  const inicio = Date.now();
  await assert.rejects(buscarSeries('x', { fetchFn: fetchColgado, timeoutMs: 60 }), (e) => e instanceof ErrorApi && /tardó más de/.test(e.message));
  assert.ok(Date.now() - inicio < 1000, 'tiene que cortar rápido, no esperar de más');
});

test('cancelar desde afuera lanza AbortError (el hook lo ignora, no es un error para mostrar)', async () => {
  const control = new AbortController();
  const promesa = buscarSeries('x', { fetchFn: fetchColgado, signal: control.signal, timeoutMs: 5000 });
  control.abort();
  await assert.rejects(promesa, (e) => e.name === 'AbortError');
});

test('si ya viene cancelada, no llega a consultar', async () => {
  const control = new AbortController(); control.abort();
  await assert.rejects(buscarSeries('x', { fetchFn: fetchColgado, signal: control.signal }), (e) => e.name === 'AbortError');
});
