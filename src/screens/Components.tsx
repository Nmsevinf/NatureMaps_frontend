import { useState } from 'react'
import { Page } from '../components/layout/Page'
import { Badge, Button, Card, Chip, EmptyState, IconButton, Input, ListItem, Radio, StatusDot, Switch } from '../components/ui'
import { useApp } from '../context/useApp'

/**
 * Catálogo del sistema de diseño (/componentes).
 * Sirve para que todo el equipo vea qué piezas existen antes de crear una pantalla.
 * Cambia el modo en Ajustes y verás que todos los componentes cambian de color.
 */
export function Components() {
  const { t } = useApp()
  const [on, setOn] = useState(true)
  const [chip, setChip] = useState(0)

  return (
    <Page title={t('catalog.title')} subtitle={t('catalog.subtitle')} back>
      <p className="section-label">{t('catalog.colors')}</p>
      <div className="swatches">
        {['--color-accent', '--color-accent-2', '--color-accent-soft', '--color-bg', '--color-green', '--color-warm', '--color-text', '--color-muted'].map((v) => (
          <div key={v} className="swatch" style={{ background: `var(${v})` }} title={v} />
        ))}
      </div>

      <p className="section-label">Button</p>
      <Button block>{t('catalog.primary')}</Button>
      <div className="row">
        <Button variant="secondary" icon="pin">
          {t('catalog.secondary')}
        </Button>
        <Button variant="ghost">Ghost</Button>
        <Button size="sm">{t('catalog.small')}</Button>
      </div>

      <p className="section-label">IconButton · Badge · StatusDot</p>
      <div className="row">
        <IconButton icon="back" label={t('common.back')} />
        <IconButton icon="settings" label={t('settings.title')} variant="accent" />
        <Badge>{t('catalog.label')}</Badge>
        <Badge solid>{t('catalog.solid')}</Badge>
        <StatusDot status="ok">{t('catalog.ok')}</StatusDot>
        <StatusDot status="error">{t('catalog.error')}</StatusDot>
      </div>

      <p className="section-label">Chip</p>
      <div className="chip-row">
        {(['catalog.filterAll', 'catalog.filterBloom', 'catalog.filterTrees', 'catalog.filterShrubs'] as const).map((key, i) => (
          <Chip key={key} active={chip === i} onClick={() => setChip(i)}>
            {t(key)}
          </Chip>
        ))}
      </div>

      <p className="section-label">Input</p>
      <Input icon="search" placeholder={t('catalog.search')} />

      <p className="section-label">ListItem</p>
      <div className="list">
        <ListItem icon="leaf" title={t('catalog.itemNav')} subtitle={t('catalog.itemNavDesc')} to="/componentes" />
        <ListItem icon="bell" title={t('catalog.itemSwitch')} trailing={<Switch checked={on} onChange={setOn} label={t('catalog.example')} />} />
        <ListItem title={t('catalog.selected')} selected trailing={<Radio checked />} />
      </div>

      <p className="section-label">Card</p>
      <Card>{t('catalog.card')}</Card>
      <Card variant="accent">{t('catalog.cardAccent')}</Card>

      <p className="section-label">EmptyState</p>
      <Card>
        <EmptyState icon="routes" title={t('catalog.emptyTitle')} description={t('catalog.emptyDesc')} />
      </Card>
    </Page>
  )
}
