import { useState } from 'react'
import { Page } from '../components/layout/Page'
import { Badge, Button, Card, Chip, EmptyState, IconButton, Input, ListItem, Radio, StatusDot, Switch } from '../components/ui'

/**
 * Catálogo del sistema de diseño (/componentes).
 * Sirve para que todo el equipo vea qué piezas existen antes de crear una pantalla.
 * Cambia el modo en Ajustes y verás que todos los componentes cambian de color.
 */
export function Components() {
  const [on, setOn] = useState(true)
  const [chip, setChip] = useState(0)

  return (
    <Page title="Componentes" subtitle="Sistema de diseño de Nature MAPS" back>
      <p className="section-label">Colores (tokens)</p>
      <div className="swatches">
        {['--color-accent', '--color-accent-2', '--color-accent-soft', '--color-bg', '--color-green', '--color-warm', '--color-text', '--color-muted'].map((v) => (
          <div key={v} className="swatch" style={{ background: `var(${v})` }} title={v} />
        ))}
      </div>

      <p className="section-label">Button</p>
      <Button block>Primario</Button>
      <div className="row">
        <Button variant="secondary" icon="pin">
          Secundario
        </Button>
        <Button variant="ghost">Ghost</Button>
        <Button size="sm">Pequeño</Button>
      </div>

      <p className="section-label">IconButton · Badge · StatusDot</p>
      <div className="row">
        <IconButton icon="back" label="Volver" />
        <IconButton icon="settings" label="Ajustes" variant="accent" />
        <Badge>Etiqueta</Badge>
        <Badge solid>Sólida</Badge>
        <StatusDot status="ok">OK</StatusDot>
        <StatusDot status="error">Error</StatusDot>
      </div>

      <p className="section-label">Chip</p>
      <div className="chip-row">
        {['Todas', 'En floración', 'Árboles', 'Arbustos'].map((c, i) => (
          <Chip key={c} active={chip === i} onClick={() => setChip(i)}>
            {c}
          </Chip>
        ))}
      </div>

      <p className="section-label">Input</p>
      <Input icon="search" placeholder="Buscar…" />

      <p className="section-label">ListItem</p>
      <div className="list">
        <ListItem icon="leaf" title="Con icono y flecha" subtitle="Navega a otra pantalla" to="/componentes" />
        <ListItem icon="bell" title="Con interruptor" trailing={<Switch checked={on} onChange={setOn} label="Ejemplo" />} />
        <ListItem title="Seleccionado" selected trailing={<Radio checked />} />
      </div>

      <p className="section-label">Card</p>
      <Card>Tarjeta normal para agrupar contenido.</Card>
      <Card variant="accent">Tarjeta destacada con el color del modo.</Card>

      <p className="section-label">EmptyState</p>
      <Card>
        <EmptyState icon="routes" title="Sin datos todavía" description="Se muestra mientras una lista está vacía." />
      </Card>
    </Page>
  )
}
