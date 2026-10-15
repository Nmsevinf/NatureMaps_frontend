import { Outlet } from 'react-router-dom'
import { TabBar } from './TabBar'

/** Pantallas principales: contenido + barra inferior. */
export function TabLayout() {
  return (
    <>
      <main className="app__main">
        <Outlet />
      </main>
      <TabBar />
    </>
  )
}

/** Pantallas secundarias (ajustes, detalle…): sin barra inferior. */
export function FullLayout() {
  return (
    <main className="app__main">
      <Outlet />
    </main>
  )
}
