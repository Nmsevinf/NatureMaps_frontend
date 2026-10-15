import { Navigate, useNavigate } from 'react-router-dom'
import { Page } from '../components/layout/Page'
import { Badge, Card, IconButton, ListItem } from '../components/ui'
import { useApp } from '../context/useApp'

/** Inicio. Cada modo podrá tener su propio contenido debajo de los accesos. */
export function Home() {
  const { mode, t } = useApp()
  const navigate = useNavigate()
  if (!mode) return <Navigate to="/modo" replace />

  const modeName = t(`mode.${mode}`)

  return (
    <Page
      title={t('home.title')}
      subtitle={t('home.subtitle')}
      actions={<IconButton icon="settings" label={t('settings.title')} variant="accent" onClick={() => navigate('/ajustes')} />}
    >
      <Badge solid>{modeName.toUpperCase()}</Badge>

      <Card variant="accent">
        <p style={{ fontWeight: 700, fontSize: 'var(--text-lg)' }}>Nature MAPS</p>
        <p style={{ fontSize: 'var(--text-sm)', opacity: 0.85, marginTop: 4 }}>{t(`mode.${mode}.desc`)}</p>
      </Card>

      <div className="list">
        <ListItem icon="scan" title={t('home.scan')} to="/escanear" />
        <ListItem icon="leaf" title={t('home.map')} to="/mapa" />
        <ListItem icon="routes" title={t('home.routes')} to="/rutas" />
      </div>
    </Page>
  )
}
