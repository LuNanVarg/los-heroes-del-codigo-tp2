import { useEffect } from 'react';

// =====================================================================================
// TAREA DE MARISOL · títulos y descripciones de cada sección
// =====================================================================================

export function useTitulo(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · Los Héroes del Código` : 'Los Héroes del Código · Grupo 17';
  }, [titulo]);
}

