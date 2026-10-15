import { Page } from '../components/layout/Page'
import { Button, EmptyState } from '../components/ui'
import { useApp } from '../context/useApp'

export function NotFound() {
  const { t } = useApp()
  return (
    <Page title="404">
      <EmptyState title={t('common.notFound')} action={<Button to="/inicio">{t('common.goHome')}</Button>} />
    </Page>
  )
}
