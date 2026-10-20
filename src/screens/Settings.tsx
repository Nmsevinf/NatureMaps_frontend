import { useEffect, useState } from 'react'
import { checkHealth } from '../api/client'
import { Page } from '../components/layout/Page'
import { ListItem, StatusDot } from '../components/ui'
import { useApp } from '../context/useApp'

export function Settings() {
  const { t, mode } = useApp()
  const [server, setServer] = useState<'checking' | 'ok' | 'error'>('checking')

  // Comprueba de verdad el backend (GET /health)
  useEffect(() => {
    const ctrl = new AbortController()
    checkHealth(ctrl.signal).then((ok) => !ctrl.signal.aborted && setServer(ok ? 'ok' : 'error'))
    return () => ctrl.abort()
  }, [])

  return (
    <Page title={t('settings.title')} back>
      <div className="list">
        <ListItem icon="refresh" title={t('settings.changeMode')} subtitle={mode ? t(`mode.${mode}`) : undefined} to="/modo" />
        <ListItem icon="image" title={t('settings.components')} to="/componentes" />
      </div>
      <p className="section-label">{t('settings.server')}</p>
      <StatusDot status={server === 'checking' ? 'idle' : server}>
        {server === 'checking' ? t('settings.checking') : server === 'ok' ? t('settings.online') : t('settings.offline')}
      </StatusDot>
    </Page>
  )
}
