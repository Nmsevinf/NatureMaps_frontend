import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useApp } from '../context/useApp'
import { findMonument } from '../data/mock'
import { NotFound } from './NotFound'

/** RF10 — Ficha de monumento o calle (1.3.2 / 1.3.B.1). */
export function MonumentDetail() {
  const { id = '' } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { t } = useApp()
  const monument = findMonument(id)
  const [banner, setBanner] = useState(params.get('nuevo') === '1')

  useEffect(() => {
    if (!banner) return
    const timer = setTimeout(() => setBanner(false), 3200)
    return () => clearTimeout(timer)
  }, [banner])

  if (!monument) return <NotFound />

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${monument.location.lat},${monument.location.lng}`

  return (
    <div className="screen detail detail--warm">
      {banner && <div className="achievement-banner achievement-banner--warm">🏆 {t('monument.newAchievement')}</div>}
      <div className="detail__hero">
        <button className="icon-btn icon-btn--float" onClick={() => navigate(-1)} aria-label={t('common.back')}>
          <Icon name="back" size={16} strokeWidth={2.4} />
        </button>
        <Icon name="monument" size={100} strokeWidth={1.2} className="detail__hero-icon" />
      </div>
      <div className="detail__body">
        <div>
          <h1 className="title-lg">{monument.name}</h1>
          <p className="subtitle">{monument.subtitle}</p>
        </div>
        <div className="chips">
          <span className="pill pill--warm">Monumento histórico</span>
        </div>
        <p className="body-text">{monument.description}</p>
        <div className="source source--warm">
          <Icon name="school" size={18} />
          <div>
            <div className="source__label">{t('monument.culture')}</div>
            <div className="source__value">{monument.source}</div>
          </div>
        </div>
        <div className="spacer" />
        <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn btn--warm-dark btn--block">
          <Icon name="external" size={18} /> {t('routes.openMaps')}
        </a>
      </div>
    </div>
  )
}
