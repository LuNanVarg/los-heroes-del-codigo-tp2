// Registros del proceso de trabajo. Los de TP1 vienen de la bitácora original.
export const bitacora = [
  { id: 'tp1-1', fecha: '2026-09-01', etapa: 'TP1', titulo: 'Acuerdos iniciales y definición estética',
    texto: 'El código ha comenzado a articularse. Frente al colapso de ideas dispersas, el equipo acordó una estética de periódico editorial clásico. Se definieron las fuentes Anton SC y Vollkorn en Figma y la paleta cromática con el modo diario impreso.' },
  { id: 'tp1-2', fecha: '2026-09-04', etapa: 'TP1', titulo: 'Maquetación semántica y breakpoints',
    texto: 'Estabilidad y estructura para nuestra web: se crearon las páginas individuales y la portada modular. Diseñamos la grilla adaptable para cumplir estrictamente los breakpoints de 400px, 900px y 1200px sin desbordes.' },
  { id: 'tp1-3', fecha: '2026-09-06', etapa: 'TP1', titulo: 'Ajuste de tipografía',
    texto: 'Al probar "Anton SC" ya maquetada en pantalla, la legibilidad no convencía — sobre todo en los tamaños chicos de las tarjetas y el cuerpo editorial. Decidimos reemplazarla por Bebas Neue para los titulares, manteniendo Vollkorn en el cuerpo de texto. Anton SC quedó como referencia en el diseño original de Figma, pero no llegó a la implementación final del sitio.' },
  { id: 'tp1-4', fecha: '2026-09-08', etapa: 'TP1', titulo: 'Interactividad JS y despliegue',
    texto: 'La salvación ha llegado con funciones dinámicas: carrusel para explorar a los héroes de la interfaz, alternador de edición papel con almacenamiento local y publicación continua en Vercel para la entrega oficial.' },
  { id: 'tp1-5', fecha: '2026-09-15', etapa: 'TP1', titulo: 'Interacciones individuales por perfil',
    texto: 'Además de la cita editorial compartida, cada integrante sumó una segunda función dinámica propia en su tarjeta para reforzar la identidad individual: Marisol con un cambio de filtro en su foto, Marcos con sinopsis desplegables en sus películas, Anahi con un dato al pasar el mouse por sus discos, Ezequiel con un contador de visualizaciones y Nancy con una descripción al hacer click en cada habilidad.' },
  // --- TP2 sumamos los registros de la las actualizaciones ---
  { id: 'tp2-1', fecha: '2026-10-09', etapa: 'TP2', titulo: 'Dos ediciones: Diario y Futurista',
    texto: 'Antes de pasar a React se rediseñó el estilo. El modo claro pasó a ser un diario viejo (papel envejecido, serifas, doble filete) y el modo oscuro una revista futurista inspirada en las interfaces de Ghost in the Shell. Se quitó la edición Vintage del TP1 porque se parecía demasiado al Diario. Además se bajó la saturación del cian: el color cansaba la vista, así que el negro y el blanco llevan el diseño y el color queda para detalles.' },
  { id: 'tp2-2', fecha: '2026-10-09', etapa: 'TP2', titulo: 'Íconos en SVG e imágenes livianas',
    texto: 'Los íconos y el favicon pasaron a SVG. Las fotos y los afiches de películas no se vectorizan (serían más pesados y se verían peor), así que pasaron a WebP: de unos 11 MB a 1,4 MB. Las dos ilustraciones, el panel holográfico y el sello de diario, se dibujaron en SVG.' },
  { id: 'tp2-3', fecha: '2026-10-09', etapa: 'TP2', titulo: 'Migración a React',
    texto: 'La aplicación se armó con Vite, React y React Router. Se definió una sidebar compartida como estructura de toda la experiencia y se portaron los cinco perfiles del TP1 como un solo componente que recibe sus datos por props. Se sumaron un catálogo de recursos con búsqueda y filtros, una consulta a una API pública con estados de carga y error, el árbol de componentes y esta bitácora.' },
  { id: 'tp2-4', fecha: '2026-10-22', etapa: 'TP2', titulo: 'Reparto de tareas del equipo',
  texto: 'Se distribuyeron las tareas por archivo para organizar el trabajo y evitar conflictos. Anahi trabaja en el ícono del menú; Marcos, en el catálogo de recursos; Marisol, en los títulos y descripciones; Ezequiel, en las pruebas de la API; y Nancy, en la documentación, la bitácora y la entrega. También se incorporó una prueba automática para validar el catálogo.'},
];
