import { Icon } from '../components/Icon'
import { ScreenHeader } from '../components/ScreenHeader'
import { useApp } from '../context/useApp'
import { achievements, routes } from '../data/mock'

/** 1.1.6 — Logros con valor real (RF36). */
export function Achievements() {
  const { t } = useApp()
  const route = routes[0]
  const done = 3
  return (
    <div className="screen">
      <ScreenHeader back title={t('achievements.title')} subtitle={t('achievements.subtitle')} />
      <div className="progress-card">
        <div className="progress-card__row">
          <span>Ruta: {route.name}</span>
          <span className="accent">
            {done}/{route.stops.length}
          </span>
        </div>
        <div className="bar">
          <span style={{ width: `${(done / route.stops.length) * 100}%` }} />
        </div>
      </div>
      <div className="list">
        {achievements.map((a) => (
          <div key={a.id} className={`row-card${a.unlocked ? '' : ' row-card--locked'}`}>
            <span className="thumb">
              <Icon name={a.unlocked ? 'trophy' : 'lock'} size={20} />
            </span>
            <span className="row-card__text">
              <span className="row-card__title">{a.title}</span>
              <span className="row-card__sub">{a.reward}</span>
            </span>
            <span className={`status${a.unlocked ? ' status--on' : ''}`}>{a.unlocked ? t('achievements.unlocked') : t('achievements.locked')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
