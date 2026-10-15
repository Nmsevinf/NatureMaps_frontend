import { Link } from 'react-router-dom'
import { ScreenHeader } from '../components/ScreenHeader'
import { useApp } from '../context/useApp'
import { routes } from '../data/mock'

/** RF6 / 1.1.4 — Lista de rutas botánicas. */
export function RoutesList() {
  const { t, mode } = useApp()
  // Las rutas educativas solo se muestran en el modo educativo.
  const visible = routes.filter((r) => r.type === 'publica' || mode === 'educativo')

  return (
    <div className="screen">
      <ScreenHeader title={t('routes.title')} subtitle={t('routes.subtitle')} />
      <div className="list list--roomy">
        {visible.map((r) => (
          <Link key={r.id} to={`/rutas/${r.id}`} className="route-card">
            <div className="route-card__img" style={{ background: r.color }} />
            <div className="route-card__body">
              <div className="row-card__title">{r.name}</div>
              <div className="row-card__sub">
                {r.distanceKm} km · {r.minutes} min · {t('routes.stops', { n: r.stops.length })}
              </div>
              <span className="pill">{r.tag}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
