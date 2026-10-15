import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { MapView } from '../components/MapView'
import { useApp } from '../context/useApp'
import { findPlant, monuments, plants } from '../data/mock'
import type { Monument, Plant } from '../types'

type Selected = { kind: 'planta'; item: Plant } | { kind: 'monumento'; item: Monument }

/** RF5 — Plantas en el mapa. Con ?planta=<id> muestra solo las ubicaciones de esa especie. */
export function MapScreen() {
  const { t } = useApp()
  const [params] = useSearchParams()
  const focus = params.get('planta')
  const focused = focus ? findPlant(focus) : undefined

  const [selected, setSelected] = useState<Selected | null>(focused ? { kind: 'planta', item: focused } : { kind: 'planta', item: plants[0] })

  const visiblePlants = focused ? [focused] : plants
  const center = focused?.locations[0]

  return (
    <div className="screen screen--map">
      <header className="screen-header screen-header--compact">
        <div className="screen-header__text">
          <h1>{focused ? focused.scientificName : t('map.title')}</h1>
        </div>
      </header>
      <div className="legend">
        <span>
          <i className="dot dot--plant" />
          {t('map.legendPlant')}
        </span>
        <span>
          <i className="dot dot--monument" />
          {t('map.legendMonument')}
        </span>
      </div>

      <div className="map-wrap">
        <MapView
          plants={visiblePlants}
          monuments={focused ? [] : monuments}
          center={center}
          zoom={focused ? 15 : 14}
          showLabels={false}
          selectedId={selected?.item.id}
          onSelectPlant={(p) => setSelected({ kind: 'planta', item: p })}
          onSelectMonument={(m) => setSelected({ kind: 'monumento', item: m })}
        />
        {selected && (
          <Link to={`/${selected.kind}/${selected.item.id}`} className="floating-card">
            <span className={`thumb${selected.kind === 'monumento' ? ' thumb--warm' : ''}`}>
              <Icon name={selected.kind === 'planta' ? 'leaf' : 'monument'} size={22} />
            </span>
            <span className="row-card__text">
              <span className="row-card__title">{selected.kind === 'planta' ? selected.item.scientificName : selected.item.name}</span>
              <span className="row-card__sub">
                {selected.kind === 'planta'
                  ? `${selected.item.distanceM ?? '—'} m · ${selected.item.zone}`
                  : selected.item.subtitle}
              </span>
            </span>
            <Icon name="chevron" size={14} strokeWidth={2.4} className="muted" />
          </Link>
        )}
      </div>
    </div>
  )
}
