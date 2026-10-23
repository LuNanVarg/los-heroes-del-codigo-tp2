
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const recursos = JSON.parse(readFileSync(new URL('../data/recursos.json', import.meta.url), 'utf8'));
const CLAVES = ['id', 'nombre', 'categoria', 'descripcion', 'aporte', 'url', 'etapa'];
const ETAPAS = ['TP1', 'TP2', 'Ambos'];

test('hay al menos 20 registros (lo pide la consigna del TP2)', () => {
  assert.ok(recursos.length >= 20, `hay ${recursos.length} registros`);
});

test('cada registro tiene todas las claves y ninguna vacía', () => {
  for (const r of recursos) {
    for (const clave of CLAVES) {
      const valor = r[clave];
      assert.ok(valor !== undefined && valor !== null && String(valor).trim() !== '', `al registro «${r.nombre ?? r.id}» le falta «${clave}»`);
    }
  }
});

test('los id son únicos', () => {
  const vistos = new Set();
  for (const r of recursos) {
    assert.ok(!vistos.has(r.id), `el id ${r.id} está repetido`);
    vistos.add(r.id);
  }
});

test('los nombres no se repiten', () => {
  const vistos = new Set();
  for (const r of recursos) {
    const n = r.nombre.trim().toLowerCase();
    assert.ok(!vistos.has(n), `«${r.nombre}» está repetido`);
    vistos.add(n);
  }
});

test('la etapa es TP1, TP2 o Ambos', () => {
  for (const r of recursos) assert.ok(ETAPAS.includes(r.etapa), `«${r.nombre}» tiene etapa «${r.etapa}»; tiene que ser ${ETAPAS.join(', ')}`);
});

test('las URL empiezan con https://', () => {
  for (const r of recursos) assert.ok(r.url.startsWith('https://'), `la URL de «${r.nombre}» no empieza con https://`);
});
