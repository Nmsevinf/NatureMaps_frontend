import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { VALENCIA_CENTER } from '../data/mock'
import type { LatLng, Monument, Plant, RouteStop } from '../types'

const PLANT_COLOR = '#2B6942'
const MONUMENT_COLOR = '#B8863B'

function pinIcon(color: string, inner: string, active = false) {
  const size = active ? 40 : 32
  return L.divIcon({
    className: 'map-pin',
    iconSize: [size, size * 1.27],
    iconAnchor: [size / 2, size * 1.27],
    html: `<svg width="${size}" height="${size * 1.27}" viewBox="0 0 30 38"><path d="M15 0C6.7 0 0 6.7 0 15c0 9.5 15 23 15 23s15-13.5 15-23C30 6.7 23.3 0 15 0Z" fill="${color}"/><circle cx="15" cy="14" r="9.5" fill="#fff"/>${inner}</svg>`,
  })
}

const leafInner = `<path d="M15 21v-8M15 13c0-3 2.4-5.2 5.2-5.2 0 3-2.2 5.2-5.2 5.2Zm0 0c0-3-2.4-5.2-5.2-5.2 0 3 2.2 5.2 5.2 5.2Z" stroke="${PLANT_COLOR}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`
const monumentInner = `<path d="M10 19h10M11.5 19v-6M15 19v-6M18.5 19v-6M10.5 13l4.5-4 4.5 4" stroke="${MONUMENT_COLOR}" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
const numberInner = (n: number, color: string) =>
  `<text x="15" y="18" font-size="10" font-weight="700" fill="${color}" text-anchor="middle" font-family="Inter, sans-serif">${n}</text>`

function FitToStops({ stops }: { stops: RouteStop[] }) {
  const map = useMap()
  useEffect(() => {
    if (stops.length > 1) map.fitBounds(stops.map((s) => [s.location.lat, s.location.lng]), { padding: [40, 40] })
  }, [map, stops])
  return null
}

interface Props {
  plants?: Plant[]
  monuments?: Monument[]
  stops?: RouteStop[]
  center?: LatLng
  zoom?: number
  selectedId?: string
  showLabels?: boolean
  onSelectPlant?: (plant: Plant) => void
  onSelectMonument?: (monument: Monument) => void
}

export function MapView({
  plants = [],
  monuments = [],
  stops,
  center = VALENCIA_CENTER,
  zoom = 14,
  selectedId,
  showLabels = true,
  onSelectPlant,
  onSelectMonument,
}: Props) {
  return (
    <MapContainer center={[center.lat, center.lng]} zoom={zoom} className="map" zoomControl={false} attributionControl>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {plants.flatMap((p) =>
        p.locations.map((loc, i) => (
          <Marker
            key={`${p.id}-${i}`}
            position={[loc.lat, loc.lng]}
            icon={pinIcon(PLANT_COLOR, leafInner, p.id === selectedId)}
            eventHandlers={{ click: () => onSelectPlant?.(p) }}
          />
        )),
      )}

      {monuments.map((m) => (
        <Marker
          key={m.id}
          position={[m.location.lat, m.location.lng]}
          icon={pinIcon(MONUMENT_COLOR, monumentInner, m.id === selectedId)}
          eventHandlers={{ click: () => onSelectMonument?.(m) }}
        >
          {showLabels && (
            <Tooltip direction="bottom" offset={[0, 4]} permanent className="map-label">
              {m.name}
            </Tooltip>
          )}
        </Marker>
      ))}

      {stops && (
        <>
          <FitToStops stops={stops} />
          <Polyline
            positions={stops.map((s) => [s.location.lat, s.location.lng])}
            pathOptions={{ color: PLANT_COLOR, weight: 3, dashArray: '6 8', opacity: 0.8 }}
          />
          {stops.map((s, i) => {
            const color = s.kind === 'planta' ? PLANT_COLOR : MONUMENT_COLOR
            return (
              <Marker key={`${s.refId}-${i}`} position={[s.location.lat, s.location.lng]} icon={pinIcon(color, numberInner(i + 1, color))}>
                <Tooltip direction="bottom" offset={[0, 4]} className="map-label">
                  {s.label}
                </Tooltip>
              </Marker>
            )
          })}
        </>
      )}
    </MapContainer>
  )
}
