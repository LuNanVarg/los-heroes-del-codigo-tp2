import { useEffect } from 'react';

const TITULO_BASE = 'Los Héroes del Código';

const DESCRIPCIONES = {
  '': 'Los Héroes del Código, Grupo 17: portada del equipo, perfiles de sus cinco integrantes y una aplicación React con dos ediciones, Diario y Futurista.',
  'Recursos': 'Catálogo de herramientas, lenguajes y referencias que usa el equipo, con búsqueda y filtros.',
  'API pública': 'Series de TV consultadas en vivo a la API pública de TVmaze, con mensajes de carga y de error.',
  'Árbol de render': 'Jerarquía real de componentes de la aplicación, que se expande y se contrae.',
  'Bitácora': 'Registros del proceso de trabajo del equipo en el TP1 y el TP2.',
  'Página no encontrada': 'La página que buscás no existe. Volvé a la portada de Los Héroes del Código.',
  'Perfil no encontrado': 'No hay ningún integrante con ese nombre. Volvé a la portada de Los Héroes del Código.',
};

const descripcionPara = (titulo) => {
  if (!titulo) return DESCRIPCIONES[''];
  return Object.hasOwn(DESCRIPCIONES, titulo)
    ? DESCRIPCIONES[titulo]
    : `Perfil de ${titulo}, integrante de Los Héroes del Código (Grupo 17).`;
};

export function useTitulo(titulo, descripcion) {
  useEffect(() => {
    document.title = titulo
      ? `${titulo} · ${TITULO_BASE}`
      : `${TITULO_BASE} · Grupo 17`;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', descripcion || descripcionPara(titulo));
  }, [titulo, descripcion]);
}

