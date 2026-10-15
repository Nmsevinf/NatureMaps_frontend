import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { ModeBadge } from '../../components/ModeBadge'
import { SettingsButton } from '../../components/ScreenHeader'
import { useApp } from '../../context/useApp'
import { plants } from '../../data/mock'

const CAPTURED = new Set(['jacaranda', 'washingtonia', 'hibisco'])
const TOTAL = 40

/** 1.1 — Inicio Aventura: colección, nivel y planta cercana para "cazar". */
export function HomeAventura() {
  const { t } = useApp()
  const navigate = useNavigate()
  const nearby = plants.find((p) => p.id === 'ficus')!
  const slots = plants.slice(0, 6)
  const progress = Math.round((CAPTURED.size / TOTAL) * 100)

  return (
    <div className="screen">
      <div className="topbar">
        <ModeBadge />
        <SettingsButton />
      </div>

      <section className="hero-card">
        <div className="level">Nv.6</div>
        <div className="hero-card__body">
          <div className="hero-card__title">{t('home.collection')}</div>
          <div className="hero-card__sub">{t('home.captured', { n: CAPTURED.size, total: TOTAL })}</div>
          <div className="bar bar--light">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>
        <Link to="/logros" className="hero-card__link" aria-label={t('home.achievements')}>
          <Icon name="trophy" size={22} />
        </Link>
      </section>

      <h2 className="section-title section-title--row">
        <span>🗺️ {t('home.nearYou')}</span>
        <Link to="/cercanas" className="link-muted">
          {t('nearby.title')} →
        </Link>
      </h2>
      <div className="hint-card">
        <Icon name="pin" size={18} />
        <div>
          <div className="hint-card__title">📍 {t('home.nearbyHint', { name: nearby.scientificName })}</div>
          <div className="hint-card__text">{nearby.curiosity}</div>
          <button className="btn btn--small" onClick={() => navigate('/escanear')}>
            📷 {t('home.photoToDiscover')}
          </button>
        </div>
      </div>

      <div className="collection-grid">
        {slots.map((p) =>
          CAPTURED.has(p.id) ? (
            <Link key={p.id} to={`/planta/${p.id}`} className={`collect-card${p.rarity === 'rara' ? ' collect-card--rare' : ''}`}>
              {p.rarity === 'rara' && <span className="collect-card__tag">✨ RARA</span>}
              <span className="collect-card__img">
                <Icon name="leaf" size={24} />
              </span>
              <span className="collect-card__name">{p.commonName}</span>
            </Link>
          ) : (
            <div key={p.id} className="collect-card collect-card--locked">
              <span className="collect-card__img">
                <Icon name="lock" size={18} />
              </span>
              <span className="collect-card__name">???</span>
            </div>
          ),
        )}
      </div>
    </div>
  )
}
