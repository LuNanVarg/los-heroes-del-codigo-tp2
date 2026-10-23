import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout.jsx';
import Portada from './pages/Portada.jsx';
import Perfil from './pages/Perfil.jsx';
import Recursos from './pages/Recursos.jsx';
import ApiPublica from './pages/ApiPublica.jsx';
import Arbol from './pages/Arbol.jsx';
import Bitacora from './pages/Bitacora.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Portada />} />
        <Route path="integrantes/:slug" element={<Perfil />} />
        <Route path="recursos" element={<Recursos />} />
        <Route path="api" element={<ApiPublica />} />
        <Route path="arbol" element={<Arbol />} />
        <Route path="bitacora" element={<Bitacora />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}
