import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { ModeBadge } from '../../components/ModeBadge'
import { SettingsButton } from '../../components/ScreenHeader'
import { useApp } from '../../context/useApp'
import { findPlant, plants, routes } from '../../data/mock'

const COLLECTED = ['jacaranda', 'hibisco', 'washingtonia', 'naranjo', 'laurel']

/** 1.3 — Home del alumno: ruta asignada, misión activa, fichas y test final. */
export function HomeEducativo() {
  const { t } = useApp()
  const navigate = useNavigate()
  const route = routes.find((r) => r.type === 'educativa')!
  const target = findPlant('ficus')!
  const total = 6

  return (
    <div className="screen">
      <div className="topbar">
        <ModeBadge />
        <SettingsButton />
      </div>
      <div className="padded">
        <p className="eyebrow">4ºB · CEIP Jardín del Turia</p>
        <h1 className="title-lg">🌳 Ruta: {route.name}</h1>
        <p className="subtitle">Configurada por la profesora Ana · {t('routes.stops', { n: total })}</p>
      </div>

      <section className="mission">
        <div className="mission__head">
          <span className="thumb thumb--lg">
            <Icon name="leaf" size={28} />
          </span>
          <div>
            <div className="eyebrow eyebrow--accent">{t('home.mission')}</div>
            <div className="mission__title">Encuentra el {target.scientificName}</div>
          </div>
        </div>
        <ol className="steps">
          <li>Sigue el camino marcado hasta la parada 5</li>
          <li>Busca la planta que se parece a la foto</li>
          <li>Haz una foto para validarla y añadirla a tu ficha</li>
        </ol>
        <button className="btn btn--warm btn--block" onClick={() => navigate('/escanear')}>
          📷 {t('home.photoToValidate')}
        </button>
        <Link to={`/rutas/${route.id}`} className="link-muted center">
          Ver mapa de la ruta
        </Link>
      </section>

      <h2 className="section-title">
        🃏 {t('home.cards')} · {COLLECTED.length}/{total}
      </h2>
      <div className="collection-grid">
        {COLLECTED.map((id) => {
          const p = plants.find((x) => x.id === id)!
          return (
            <Link key={id} to={`/planta/${id}`} className="collect-card">
              <span className="collect-card__img">
                <Icon name="leaf" size={20} />
              </span>
              <span className="collect-card__name">{p.commonName}</span>
            </Link>
          )
        })}
        <div className="collect-card collect-card--locked">
          <span className="collect-card__img">
            <Icon name="lock" size={17} />
          </span>
          <span className="collect-card__name">1 {t('home.pending')}</span>
        </div>
      </div>

      <section className="quiz-card">
        <div className="quiz-card__row">
          <span>📝 {t('home.finalTest')}</span>
          <span>9/10</span>
        </div>
        <div className="bar bar--light bar--thick">
          <div style={{ width: '90%' }} />
        </div>
        <div className="quiz-card__foot">🏆 320 puntos por biodiversidad encontrada</div>
      </section>
    </div>
  )
}
