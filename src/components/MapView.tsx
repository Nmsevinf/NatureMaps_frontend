import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useState, type ReactNode } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { useApp } from '../context/useApp'
import { Card, IconButton } from './ui'

// Centro de Valencia (Plaza del Ayuntamiento)
const VALENCIA_CENTER: [number, number] = [39.4699, -0.3763]

const meIcon = L.divIcon({ className: '', html: '<div class="map-view__me"></div>', iconSize: [16, 16], iconAnchor: [8, 8] })

function LocateButton({ onPosition, onError }: { onPosition: (p: [number, number]) => void; onError: () => void }) {
  const map = useMap()
  const { t } = useApp()
  const locate = () => {
    if (!navigator.geolocation) return onError()
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const p: [number, number] = [pos.coords.latitude, pos.coords.longitude]
        onPosition(p)
        map.flyTo(p, 16)
      },
      onError,
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }
  return <IconButton icon="pin" label={t('map.locate')} variant="accent" className="map-view__locate" onClick={locate} />
}

interface Props {
  /** Marcadores u otras capas de react-leaflet. */
  children?: ReactNode
  zoom?: number
}

/** Mapa base de OpenStreetMap centrado en Valencia, con botón de "mi ubicación". */
export function MapView({ children, zoom = 14 }: Props) {
  const { t } = useApp()
  const [me, setMe] = useState<[number, number] | null>(null)
  const [error, setError] = useState(false)

  return (
    <div className="map-view">
      <MapContainer center={VALENCIA_CENTER} zoom={zoom} zoomControl={false} className="map-view__map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {me && <Marker position={me} icon={meIcon} />}
        {children}
        <LocateButton
          onPosition={(p) => {
            setMe(p)
            setError(false)
          }}
          onError={() => setError(true)}
        />
      </MapContainer>
      {error && <Card className="map-view__error">{t('map.locationDenied')}</Card>}
    </div>
  )
}
