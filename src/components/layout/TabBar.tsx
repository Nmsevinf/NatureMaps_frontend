import { NavLink } from 'react-router-dom'
import { useApp } from '../../context/useApp'
import type { StringKey } from '../../i18n/strings'
import { Icon, type IconName } from '../Icon'

// Pestañas de la barra inferior. Para añadir una, añádela aquí y su ruta en App.tsx.
const tabs: { to: string; icon: IconName; label: StringKey }[] = [
  { to: '/inicio', icon: 'home', label: 'nav.home' },
  { to: '/mapa', icon: 'leaf', label: 'nav.map' },
  { to: '/escanear', icon: 'scan', label: 'nav.scan' },
  { to: '/rutas', icon: 'routes', label: 'nav.routes' },
  { to: '/buscar', icon: 'search', label: 'nav.search' },
]

export function TabBar() {
  const { t } = useApp()
  return (
    <nav className="tabbar" aria-label="Navegación principal">
      {tabs.map((tab) => (
        <NavLink key={tab.to} to={tab.to} className={({ isActive }) => `tabbar__item${isActive ? ' tabbar__item--active' : ''}`}>
          <Icon name={tab.icon} size={21} strokeWidth={2} />
          <span>{t(tab.label)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
