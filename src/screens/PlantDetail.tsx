import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useApp } from '../context/useApp'
import { findPlant } from '../data/mock'
import { NotFound } from './NotFound'

/** RF3 — Ficha de planta (1.1.3 / 1.1.A). Con ?nuevo=1 muestra el aviso de logro. */
export function PlantDetail() {
  const { id = '' } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { t } = useApp()
  const plant = findPlant(id)
  const [banner, setBanner] = useState(params.get('nuevo') === '1')

  useEffect(() => {
    if (!banner) return
    const timer = setTimeout(() => setBanner(false), 3200)
    return () => clearTimeout(timer)
  }, [banner])

  if (!plant) return <NotFound />

  return (
    <div className="screen detail">
      {banner && <div className="achievement-banner">🏆 {t('plant.newAchievement')}</div>}
      <div className="detail__hero">
        <button className="icon-btn icon-btn--float" onClick={() => navigate(-1)} aria-label={t('common.back')}>
          <Icon name="back" size={16} strokeWidth={2.4} />
        </button>
        <Icon name="leaf" size={100} strokeWidth={1.2} className="detail__hero-icon" />
      </div>
      <div className="detail__body">
        <div>
          <h1 className="title-lg">{plant.scientificName}</h1>
          <p className="subtitle">
            {plant.commonName} · {plant.family}
          </p>
        </div>
        {plant.bloom && (
          <div className="chips">
            <span className="pill">
              {t('plant.bloom')}: {plant.bloom}
            </span>
          </div>
        )}
        <p className="body-text">{plant.description}</p>
        {plant.curiosity && (
          <div className="note">
            <strong>{t('plant.curiosity')}:</strong> {plant.curiosity}
          </div>
        )}
        <div className="source">
          <Icon name="school" size={18} />
          <div>
            <div className="source__label">{t('plant.source')}</div>
            <div className="source__value">{plant.source}</div>
          </div>
        </div>
        <div className="spacer" />
        <Link to={`/mapa?planta=${plant.id}`} className="btn btn--block">
          <Icon name="pin" size={18} /> {t('plant.seeOnMap')}
        </Link>
      </div>
    </div>
  )
}
