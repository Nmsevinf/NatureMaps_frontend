import { useNavigate, useParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { MapView } from '../components/MapView'
import { ScreenHeader } from '../components/ScreenHeader'
import { useApp } from '../context/useApp'
import { findRoute } from '../data/mock'
import { NotFound } from './NotFound'

/** RF6 / RF12 / RF28 — Ruta en el mapa con paradas de flora y puntos histórico-culturales. */
export function RouteDetail() {
  const { id = '' } = useParams()
  const { t, mode } = useApp()
  const navigate = useNavigate()
  const route = findRoute(id)
  if (!route) return <NotFound />

  // RF28: seguir la ruta con Google Maps (a pie, con paradas intermedias).
  const pts = route.stops.map((s) => `${s.location.lat},${s.location.lng}`)
  const gmaps =
    `https://www.google.com/maps/dir/?api=1&travelmode=walking&destination=${pts[pts.length - 1]}` +
    (pts.length > 2 ? `&waypoints=${encodeURIComponent(pts.slice(0, -1).join('|'))}` : `&origin=${pts[0]}`)

  return (
    <div className="screen screen--map">
      <ScreenHeader back title={route.name} subtitle={`${route.distanceKm} km · ${route.minutes} min · ${t('routes.stops', { n: route.stops.length })}`} />
      <div className="legend">
        <span>
          <i className="dot dot--plant" />
          {t('routes.legendPlant')}
        </span>
        <span>
          <i className="dot dot--monument" />
          {t('routes.legendMonument')}
        </span>
      </div>
      <div className="map-wrap">
        <MapView stops={route.stops} />
      </div>
      <div className="bottom-actions">
        <button className="btn btn--block" onClick={() => navigate(mode === 'aventura' ? '/logros' : `/${route.stops[0].kind}/${route.stops[0].refId}`)}>
          {t('routes.start')}
        </button>
        <a className="btn btn--outline btn--block" href={gmaps} target="_blank" rel="noreferrer">
          <Icon name="external" size={16} /> {t('routes.openMaps')}
        </a>
      </div>
    </div>
  )
}
