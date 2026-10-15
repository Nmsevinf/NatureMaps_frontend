import { useMemo, useState } from 'react'
import { Icon } from '../components/Icon'
import { PlantRow } from '../components/PlantRow'
import { ScreenHeader } from '../components/ScreenHeader'
import { useApp } from '../context/useApp'
import { plants } from '../data/mock'

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

function bloomsNow(range?: string) {
  if (!range) return false
  const [from, to] = range.split('–').map((m) => MONTHS.indexOf(m))
  const now = new Date().getMonth()
  return from <= to ? now >= from && now <= to : now >= from || now <= to
}

/** RF4 — Buscar plantas por nombre y filtros. */
export function Search() {
  const { t } = useApp()
  const [query, setQuery] = useState('')
  const [onlyBloom, setOnlyBloom] = useState(false)
  const [onlyRare, setOnlyRare] = useState(false)
  const [family, setFamily] = useState<string | null>(null)

  const families = useMemo(() => [...new Set(plants.map((p) => p.family))].sort(), [])

  const results = plants.filter((p) => {
    const q = query.trim().toLowerCase()
    const matches = !q || [p.scientificName, p.commonName, p.family, p.zone].some((f) => f.toLowerCase().includes(q))
    return matches && (!onlyBloom || bloomsNow(p.bloom)) && (!onlyRare || p.rarity === 'rara') && (!family || p.family === family)
  })

  return (
    <div className="screen">
      <ScreenHeader title={t('nav.search')} />
      <label className="search-input">
        <Icon name="search" size={17} strokeWidth={2} />
        <input type="search" value={query} placeholder={t('search.placeholder')} onChange={(e) => setQuery(e.target.value)} autoFocus />
      </label>
      <div className="chips chips--scroll">
        <button className={`chip${onlyBloom ? ' chip--on' : ''}`} onClick={() => setOnlyBloom(!onlyBloom)}>
          🌸 {t('search.filterBloom')}
        </button>
        <button className={`chip${onlyRare ? ' chip--on' : ''}`} onClick={() => setOnlyRare(!onlyRare)}>
          ✨ {t('search.filterRare')}
        </button>
        {families.map((f) => (
          <button key={f} className={`chip${family === f ? ' chip--on' : ''}`} onClick={() => setFamily(family === f ? null : f)}>
            {f}
          </button>
        ))}
      </div>
      <div className="list">
        {results.map((p) => (
          <PlantRow key={p.id} plant={p} highlight={query.trim()} detail={p.bloom ? `${p.commonName} · ${t('plant.bloom')} ${p.bloom}` : undefined} />
        ))}
        {results.length === 0 && <p className="empty">{t('search.empty')}</p>}
      </div>
    </div>
  )
}
