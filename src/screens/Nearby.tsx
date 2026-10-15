import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { PlantRow } from '../components/PlantRow'
import { ScreenHeader } from '../components/ScreenHeader'
import { useApp } from '../context/useApp'
import { plants } from '../data/mock'

/** RF1 — Plantas cercanas (lista ordenada por distancia). */
export function Nearby() {
  const { t } = useApp()
  const sorted = [...plants].filter((p) => (p.distanceM ?? Infinity) < 1000).sort((a, b) => (a.distanceM ?? 0) - (b.distanceM ?? 0))

  return (
    <div className="screen">
      <ScreenHeader back title={t('nearby.title')} subtitle={t('nearby.subtitle', { n: sorted.length })} />
      <Link to="/buscar" className="search-input search-input--fake">
        <Icon name="search" size={17} strokeWidth={2} />
        <span>{t('search.placeholder')}</span>
      </Link>
      <div className="list">
        {sorted.map((p) => (
          <PlantRow key={p.id} plant={p} detail={`${p.distanceM} m · ${p.zone}`} />
        ))}
      </div>
    </div>
  )
}
