export type Mode = 'aventura' | 'descubridor' | 'esencial' | 'educativo'

export type Lang = 'es' | 'va' | 'en'

export interface LatLng {
  lat: number
  lng: number
}

export interface Plant {
  id: string
  scientificName: string
  commonName: string
  family: string
  description: string
  curiosity?: string
  bloom?: string
  zone: string
  distanceM?: number
  source: string
  rarity?: 'comun' | 'rara'
  locations: LatLng[]
}

export interface Monument {
  id: string
  name: string
  subtitle: string
  description: string
  source: string
  location: LatLng
}

export type StopKind = 'planta' | 'monumento'

export interface RouteStop {
  kind: StopKind
  refId: string
  label: string
  location: LatLng
}

export interface BotanicalRoute {
  id: string
  name: string
  distanceKm: number
  minutes: number
  tag: string
  color: string
  type: 'publica' | 'educativa'
  stops: RouteStop[]
}

export interface Achievement {
  id: string
  title: string
  reward: string
  unlocked: boolean
}

export interface OfflineZone {
  id: string
  name: string
  sizeMb: number
  downloaded: boolean
}
