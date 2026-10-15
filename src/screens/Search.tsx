import { useState } from 'react'
import { Page } from '../components/layout/Page'
import { EmptyState, Input } from '../components/ui'
import { useApp } from '../context/useApp'

/** Búsqueda. Cuando exista GET /plants en el backend, los resultados irán en lugar del EmptyState. */
export function Search() {
  const { t } = useApp()
  const [query, setQuery] = useState('')
  return (
    <Page title={t('search.title')}>
      <Input icon="search" type="search" value={query} placeholder={t('search.placeholder')} onChange={(e) => setQuery(e.target.value)} />
      <EmptyState icon="search" title={t('search.empty')} description={t('search.emptyDesc')} />
    </Page>
  )
}
