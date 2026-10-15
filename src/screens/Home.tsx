import { Navigate } from 'react-router-dom'
import { useApp } from '../context/useApp'
import { HomeAventura } from './home/HomeAventura'
import { HomeDescubridor } from './home/HomeDescubridor'
import { HomeEducativo } from './home/HomeEducativo'

/** Inicio: cada modo tiene su propia pantalla principal (1.1 / 1.2 / 1.3). */
export function Home() {
  const { mode } = useApp()
  switch (mode) {
    case 'aventura':
      return <HomeAventura />
    case 'descubridor':
      return <HomeDescubridor initialHistory />
    case 'esencial':
      return <HomeDescubridor initialHistory={false} />
    case 'educativo':
      return <HomeEducativo />
    default:
      return <Navigate to="/modo" replace />
  }
}
