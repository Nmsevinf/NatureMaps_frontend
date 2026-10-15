import { Page } from '../components/layout/Page'
import { EmptyState } from '../components/ui'
import { useApp } from '../context/useApp'

/** Rutas. Cuando exista GET /routes en el backend, la lista irá en lugar del EmptyState. */
export function RoutesList() {
  const { t } = useApp()
  return (
    <Page title={t('routes.title')}>
      <EmptyState icon="routes" title={t('routes.empty')} description={t('routes.emptyDesc')} />
    </Page>
  )
}
