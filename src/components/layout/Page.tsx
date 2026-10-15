import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/useApp'
import { IconButton } from '../ui'

interface Props {
  title: string
  subtitle?: string
  /** Muestra la flecha de volver. */
  back?: boolean
  /** Botones a la derecha de la cabecera. */
  actions?: ReactNode
  /** Contenido a ancho completo sin márgenes (p. ej. un mapa). */
  flush?: boolean
  children: ReactNode
}

/**
 * Plantilla común de TODAS las pantallas: cabecera + cuerpo.
 * Una pantalla nueva empieza siempre así:
 *
 *   <Page title="Mi pantalla" back>
 *     ...contenido...
 *   </Page>
 */
export function Page({ title, subtitle, back, actions, flush, children }: Props) {
  const navigate = useNavigate()
  const { t } = useApp()
  return (
    <div className={`page${flush ? ' page--fill' : ''}`}>
      <header className="page__header">
        {back && <IconButton icon="back" label={t('common.back')} onClick={() => navigate(-1)} />}
        <div className="page__titles">
          <h1 className="page__title">{title}</h1>
          {subtitle && <p className="page__subtitle">{subtitle}</p>}
        </div>
        {actions}
      </header>
      <div className={`page__body${flush ? ' page__body--flush' : ''}`}>{children}</div>
    </div>
  )
}
