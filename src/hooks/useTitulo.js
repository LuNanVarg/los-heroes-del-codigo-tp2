import { useEffect } from 'react';

const DESCRIPCIONES = {
  '': 'Los Héroes del Código, Grupo 17: portada del equipo, perfiles de sus cinco integrantes y una aplicación React con dos ediciones, Diario y Futurista.',
  'Recursos': 'Catálogo de herramientas, lenguajes y referencias que usa el equipo, con búsqueda y filtros.',
  'API pública': 'Series de TV consultadas en vivo a la API pública de TVmaze, con mensajes de carga y de error.',
  'Árbol de render': 'Jerarquía real de componentes de la aplicación, que se expande y se contrae.',
  'Bitácora': 'Registros del proceso de trabajo del equipo en el TP1 y el TP2.',
  'Página no encontrada': 'La página que buscás no existe. Volvé a la portada de Los Héroes del Código.',
  'Perfil no encontrado': 'No hay ningún integrante con ese nombre. Volvé a la portada de Los Héroes del Código.',
};

const descripcionPara = (titulo) =>
  DESCRIPCIONES[titulo] ?? `Perfil de ${titulo}, integrante de Los Héroes del Código (Grupo 17).`;

export function useTitulo(titulo, descripcion) {
  useEffect(() => {
    const tituloAnterior = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const descripcionAnterior = meta ? meta.getAttribute('content') : null;

    document.title = titulo ? `${titulo} · Los Héroes del Código` : 'Los Héroes del Código · Grupo 17';
    if (meta) meta.setAttribute('content', descripcion || descripcionPara(titulo));

    return () => {
      document.title = tituloAnterior;
      if (meta && descripcionAnterior !== null) meta.setAttribute('content', descripcionAnterior);
    };
  }, [titulo, descripcion]);
}


