import { Navigate, Route, Routes } from 'react-router-dom'
import { FullLayout, TabLayout } from './components/layout/AppLayouts'
import { useApp } from './context/useApp'
import { Components } from './screens/Components'
import { Home } from './screens/Home'
import { Language } from './screens/Language'
import { MapScreen } from './screens/MapScreen'
import { ModeSelect } from './screens/ModeSelect'
import { NotFound } from './screens/NotFound'
import { PermisoCamara } from './screens/PermisoCamara'
import { RoutesList } from './screens/RoutesList'
import { Scan } from './screens/Scan'
import { Search } from './screens/Search'
import { Settings } from './screens/Settings'

// Mapa de rutas de la app. Para añadir una pantalla:
// 1) crea src/screens/MiPantalla.tsx usando <Page>  2) añade aquí su <Route>.
export default function App() {
  const { mode } = useApp()
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to={mode ? '/inicio' : '/modo'} replace />} />

        {/* Con barra inferior */}
        <Route element={<TabLayout />}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/mapa" element={<MapScreen />} />
          <Route path="/escanear" element={<Scan />} />
          <Route path="/rutas" element={<RoutesList />} />
          <Route path="/buscar" element={<Search />} />
        </Route>

        {/* Sin barra inferior */}
        <Route element={<FullLayout />}>
          <Route path="/modo" element={<ModeSelect />} />
          <Route path="/permiso-camara" element={<PermisoCamara />} />
          <Route path="/ajustes" element={<Settings />} />
          <Route path="/ajustes/idioma" element={<Language />} />
          <Route path="/componentes" element={<Components />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}
