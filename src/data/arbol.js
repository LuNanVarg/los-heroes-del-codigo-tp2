export const arbol = {
  nombre: 'TemaProvider', archivo: 'context/TemaContext.jsx', nota: 'Punto de entrada (main.jsx). Provee la edición (Diario o Futurista) a toda la app y la guarda en localStorage.',
  hijos: [{
    nombre: 'BrowserRouter', archivo: 'react-router-dom', nota: 'Habilita las rutas con URLs reales (cada sección se puede abrir y recargar directo).',
    hijos: [{
      nombre: 'App', archivo: 'App.jsx', nota: 'Declara las rutas con <Routes> y <Route>.',
      hijos: [{
        nombre: 'Layout', archivo: 'layout/Layout.jsx', nota: 'Estructura compartida: barra superior en móvil, sidebar, franja de edición y el contenido de cada ruta.',
        hijos: [
          { nombre: 'IconoHamburguesa', archivo: 'components/IconoHamburguesa.jsx', nota: 'Ícono ☰ / ✕ del botón «Menú» en el celular (tarea de Anahi).' },
          { nombre: 'Sidebar', archivo: 'layout/Sidebar.jsx', nota: 'Menú lateral: identidad del equipo, enlaces con sección activa y panel móvil.',
            hijos: [{ nombre: 'BotonTema', archivo: 'components/BotonTema.jsx', nota: 'Alterna entre las ediciones Diario y Futurista.' }] },
          { nombre: 'FranjaEdicion', archivo: 'components/FranjaEdicion.jsx', nota: 'Fecha de diario o reloj de sistema, según la edición.' },
          { nombre: 'Outlet', archivo: 'react-router-dom', nota: 'Acá se dibuja la página de la ruta actual.',
            hijos: [
              { nombre: 'Portada', archivo: 'pages/Portada.jsx', nota: 'Ruta «/». Presentación del equipo.',
                hijos: [
                  { nombre: 'RevelaEdicion', archivo: 'components/RevelaEdicion.jsx', nota: 'Cortina interactiva: de diario impreso a holograma.' },
                  { nombre: 'TarjetaIntegrante', archivo: 'components/TarjetaIntegrante.jsx', nota: '×5. Una por integrante (props: miembro).' },
                  { nombre: 'TarjetaEnlace', archivo: 'components/TarjetaEnlace.jsx', nota: '×4. Accesos a Recursos, API, Árbol y Bitácora.' },
                ] },
              { nombre: 'Perfil', archivo: 'pages/Perfil.jsx', nota: 'Ruta «/integrantes/:slug». Un solo componente para los cinco perfiles.',
                hijos: [
                  { nombre: 'FotoPerfil', archivo: 'components/FotoPerfil.jsx', nota: 'Foto; en Marisol alterna color y blanco y negro.' },
                  { nombre: 'EtiquetaHabilidad', archivo: 'components/EtiquetaHabilidad.jsx', nota: '×4. En Nancy muestra la descripción al hacer click.' },
                  { nombre: 'TarjetaPelicula', archivo: 'components/TarjetaPelicula.jsx', nota: '×3. Sinopsis (Marcos) y contador de vistas (Ezequiel).' },
                  { nombre: 'ListaDiscos', archivo: 'components/ListaDiscos.jsx', nota: 'Discos; en Anahi cada uno despliega un dato.' },
                  { nombre: 'CitaEditorial', archivo: 'components/CitaEditorial.jsx', nota: 'Botón «Nueva frase» con citas al azar.' },
                  { nombre: 'NavegacionPerfil', archivo: 'components/NavegacionPerfil.jsx', nota: 'Anterior, volver a la portada y siguiente.' },
                ] },
              { nombre: 'Recursos', archivo: 'pages/Recursos.jsx', nota: 'Ruta «/recursos». Lee recursos.json, con búsqueda y filtros.',
                hijos: [
                  { nombre: 'EncabezadoPagina', archivo: 'components/EncabezadoPagina.jsx', nota: 'Título y bajada (lo usan 4 secciones).' },
                  { nombre: 'TarjetaRecurso', archivo: 'components/TarjetaRecurso.jsx', nota: '×N. Un registro del JSON, desplegable.' },
                ] },
              { nombre: 'ApiPublica', archivo: 'pages/ApiPublica.jsx', nota: 'Ruta «/api». Usa el hook useSeries (hooks/useSeries.js), que consulta con lib/tvmaze.js.',
                hijos: [
                  { nombre: 'EncabezadoPagina', archivo: 'components/EncabezadoPagina.jsx', nota: 'Título y bajada.' },
                  { nombre: 'EstadoCarga', archivo: 'components/EstadoCarga.jsx', nota: 'Mensaje mientras se consulta la API.' },
                  { nombre: 'EstadoError', archivo: 'components/EstadoError.jsx', nota: 'Mensaje de error con botón «Reintentar».' },
                  { nombre: 'TarjetaSerie', archivo: 'components/TarjetaSerie.jsx', nota: '×N. Un resultado de la API.' },
                ] },
              { nombre: 'Arbol', archivo: 'pages/Arbol.jsx', nota: 'Ruta «/arbol». Esta misma sección.',
                hijos: [
                  { nombre: 'EncabezadoPagina', archivo: 'components/EncabezadoPagina.jsx', nota: 'Título y bajada.' },
                  { nombre: 'NodoArbol', archivo: 'components/NodoArbol.jsx', nota: 'Recursivo: se renderiza a sí mismo para cada hijo.' },
                ] },
              { nombre: 'Bitacora', archivo: 'pages/Bitacora.jsx', nota: 'Ruta «/bitacora». Registros con filtro por etapa.',
                hijos: [
                  { nombre: 'EncabezadoPagina', archivo: 'components/EncabezadoPagina.jsx', nota: 'Título y bajada.' },
                  { nombre: 'EntradaBitacora', archivo: 'components/EntradaBitacora.jsx', nota: '×N. Un registro desplegable.' },
                ] },
              { nombre: 'NoEncontrada', archivo: 'pages/NoEncontrada.jsx', nota: 'Ruta «*». Aviso para URLs que no existen, con salida a la portada.' },
            ] },
        ],
      }],
    }],
  }],
};
