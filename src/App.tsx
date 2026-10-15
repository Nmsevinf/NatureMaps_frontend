import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { TabBar } from './components/TabBar'
import { useApp } from './context/useApp'
import { Achievements } from './screens/Achievements'
import { Home } from './screens/Home'
import { Language } from './screens/Language'
import { Login } from './screens/Login'
import { MapScreen } from './screens/MapScreen'
import { ModeSelect } from './screens/ModeSelect'
import { MonumentDetail } from './screens/MonumentDetail'
import { Nearby } from './screens/Nearby'
import { NotFound } from './screens/NotFound'
import { Offline } from './screens/Offline'
import { PlantDetail } from './screens/PlantDetail'
import { RouteDetail } from './screens/RouteDetail'
import { RoutesList } from './screens/RoutesList'
import { Scan } from './screens/Scan'
import { Search } from './screens/Search'
import { Settings } from './screens/Settings'

/** Pantallas con barra inferior de navegación. */
function TabLayout() {
  return (
    <>
      <main className="app-main">
        <Outlet />
      </main>
      <TabBar />
    </>
  )
}

/** Pantallas a pantalla completa (fichas, cámara, ajustes…). */
function FullLayout() {
  return (
    <main className="app-main">
      <Outlet />
    </main>
  )
}

export default function App() {
  const { mode } = useApp()
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to={mode ? '/inicio' : '/modo'} replace />} />
        <Route element={<FullLayout />}>
          <Route path="/modo" element={<ModeSelect />} />
          <Route path="/escanear" element={<Scan />} />
          <Route path="/planta/:id" element={<PlantDetail />} />
          <Route path="/monumento/:id" element={<MonumentDetail />} />
          <Route path="/rutas/:id" element={<RouteDetail />} />
          <Route path="/cercanas" element={<Nearby />} />
          <Route path="/logros" element={<Achievements />} />
          <Route path="/ajustes" element={<Settings />} />
          <Route path="/ajustes/idioma" element={<Language />} />
          <Route path="/ajustes/offline" element={<Offline />} />
          <Route path="/acceso/:rol" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<TabLayout />}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/mapa" element={<MapScreen />} />
          <Route path="/rutas" element={<RoutesList />} />
          <Route path="/buscar" element={<Search />} />
        </Route>
      </Routes>
    </div>
  )
}
