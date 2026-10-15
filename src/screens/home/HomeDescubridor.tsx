import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { MapView } from '../../components/MapView'
import { ModeBadge } from '../../components/ModeBadge'
import { SettingsButton } from '../../components/ScreenHeader'
import { useApp } from '../../context/useApp'
import { monuments, plants, routes } from '../../data/mock'

/** 1.2 Paseo tranquilo con historia / 1.2.1 Paseo esencial (sin capa histórica). */
export function HomeDescubridor({ initialHistory }: { initialHistory: boolean }) {
  const { t } = useApp()
  const navigate = useNavigate()
  const [withHistory, setWithHistory] = useState(initialHistory)
  const featured = routes[0]

  return (
    <div className="screen screen--map">
      <div className="topbar">
        <ModeBadge />
        <SettingsButton />
      </div>
      <div className="explore-head">
        <div>
          <h1 className="title-lg">{t('home.explore')}</h1>
          <p className="subtitle">{t('home.exploreSub')}</p>
        </div>
        <div className="segmented" role="tablist">
          <button role="tab" aria-selected={withHistory} className={withHistory ? 'on' : ''} onClick={() => setWithHistory(true)}>
            {t('home.withHistory')}
          </button>
          <button role="tab" aria-selected={!withHistory} className={!withHistory ? 'on' : ''} onClick={() => setWithHistory(false)}>
            {t('home.essential')}
          </button>
        </div>
      </div>

      <div className="map-wrap">
        <MapView
          plants={plants}
          monuments={withHistory ? monuments : []}
          onSelectPlant={(p) => navigate(`/planta/${p.id}`)}
          onSelectMonument={(m) => navigate(`/monumento/${m.id}`)}
        />
        <Link to={`/rutas/${featured.id}`} className="floating-card">
          <span className="thumb">
            <Icon name="routes" size={22} />
          </span>
          <span className="row-card__text">
            <span className="row-card__title">{featured.name}</span>
            <span className="row-card__sub">
              {featured.distanceKm} km · {featured.minutes} min{withHistory ? ` · ${featured.tag}` : ''}
            </span>
          </span>
          <Icon name="chevron" size={14} strokeWidth={2.4} className="muted" />
        </Link>
      </div>
    </div>
  )
}
