// Datos de ejemplo para las pantallas base.
// Se sustituirán por llamadas al backend (src/api) cuando existan los endpoints.
import type { Achievement, BotanicalRoute, Monument, OfflineZone, Plant } from '../types'

export const VALENCIA_CENTER = { lat: 39.4699, lng: -0.3763 }

const INVENTARIO = 'Inventario de Arbolado · Ajuntament de València'

export const plants: Plant[] = [
  {
    id: 'jacaranda',
    scientificName: 'Jacaranda mimosifolia',
    commonName: 'Jacaranda',
    family: 'Bignoniaceae',
    description:
      'Árbol ornamental de gran porte, muy presente en Valencia por su floración azul-violeta en primavera.',
    curiosity: 'Es originaria de Sudamérica y en Valencia tiñe de lila muchas avenidas cada mayo.',
    bloom: 'abr–jun',
    zone: 'Parc Central',
    distanceM: 80,
    source: INVENTARIO,
    rarity: 'rara',
    locations: [
      { lat: 39.4615, lng: -0.3792 },
      { lat: 39.4728, lng: -0.3701 },
    ],
  },
  {
    id: 'hibisco',
    scientificName: 'Hibiscus rosa-sinensis',
    commonName: 'Hibisco',
    family: 'Malvaceae',
    description: 'Arbusto de flores grandes y vistosas, habitual en jardines y parterres de la ciudad.',
    bloom: 'may–oct',
    zone: 'Jardín del Turia',
    distanceM: 140,
    source: INVENTARIO,
    locations: [{ lat: 39.4752, lng: -0.3738 }],
  },
  {
    id: 'washingtonia',
    scientificName: 'Washingtonia robusta',
    commonName: 'Palmera de abanico',
    family: 'Arecaceae',
    description: 'Palmera alta y esbelta de hojas en abanico, muy utilizada en paseos y avenidas.',
    zone: 'Paseo Marítimo',
    distanceM: 260,
    source: INVENTARIO,
    locations: [{ lat: 39.4695, lng: -0.3255 }],
  },
  {
    id: 'ficus',
    scientificName: 'Ficus microcarpa',
    commonName: 'Ficus',
    family: 'Moraceae',
    description: 'Árbol de copa densa y raíces aéreas que da sombra en muchas plazas del centro.',
    curiosity: 'Sus raíces aéreas pueden llegar al suelo y convertirse en nuevos troncos.',
    zone: 'Glorieta',
    distanceM: 320,
    source: INVENTARIO,
    rarity: 'rara',
    locations: [{ lat: 39.4733, lng: -0.3703 }],
  },
  {
    id: 'naranjo',
    scientificName: 'Citrus × aurantium',
    commonName: 'Naranjo amargo',
    family: 'Rutaceae',
    description: 'Árbol de calle por excelencia en Valencia; su flor, el azahar, perfuma la ciudad en primavera.',
    bloom: 'mar–abr',
    zone: 'Centro histórico',
    distanceM: 410,
    source: INVENTARIO,
    locations: [{ lat: 39.4741, lng: -0.3777 }],
  },
  {
    id: 'laurel',
    scientificName: 'Laurus nobilis',
    commonName: 'Laurel',
    family: 'Lauraceae',
    description: 'Arbusto aromático mediterráneo cuyas hojas se usan en la cocina tradicional.',
    zone: 'Jardín Botánico',
    distanceM: 650,
    source: 'Jardí Botànic · Universitat de València',
    locations: [{ lat: 39.4757, lng: -0.3866 }],
  },
]

export const monuments: Monument[] = [
  {
    id: 'serranos',
    name: 'Torres de Serranos',
    subtitle: 'Puerta gótica · siglo XIV',
    description:
      'Antigua puerta de la muralla medieval de Valencia, levantada a finales del siglo XIV. Hoy es uno de los símbolos más reconocibles del centro histórico.',
    source: 'Ajuntament de València · Patrimonio histórico',
    location: { lat: 39.4791, lng: -0.3759 },
  },
  {
    id: 'puente-flores',
    name: 'Puente de las Flores',
    subtitle: 'Puente sobre el antiguo cauce',
    description: 'Puente decorado con miles de flores que se renuevan según la temporada.',
    source: 'Ajuntament de València',
    location: { lat: 39.4699, lng: -0.3693 },
  },
  {
    id: 'estacion-nord',
    name: 'Estación del Norte',
    subtitle: 'Modernismo valenciano · 1917',
    description: 'Estación de tren modernista decorada con motivos de naranjas y azahar.',
    source: 'Ajuntament de València · Patrimonio histórico',
    location: { lat: 39.4666, lng: -0.3773 },
  },
]

export const routes: BotanicalRoute[] = [
  {
    id: 'turia',
    name: 'Jardín del Turia',
    distanceKm: 2.4,
    minutes: 40,
    tag: 'Contexto histórico · s. XIX',
    color: '#8FB672',
    type: 'publica',
    stops: [
      { kind: 'monumento', refId: 'serranos', label: 'Torres de Serranos', location: { lat: 39.4791, lng: -0.3759 } },
      { kind: 'planta', refId: 'naranjo', label: 'Naranjo amargo', location: { lat: 39.4741, lng: -0.3777 } },
      { kind: 'planta', refId: 'hibisco', label: 'Hibisco', location: { lat: 39.4752, lng: -0.3738 } },
      { kind: 'planta', refId: 'ficus', label: 'Ficus', location: { lat: 39.4733, lng: -0.3703 } },
      { kind: 'monumento', refId: 'puente-flores', label: 'Puente de las Flores', location: { lat: 39.4699, lng: -0.3693 } },
    ],
  },
  {
    id: 'central',
    name: 'Parc Central en flor',
    distanceKm: 1.1,
    minutes: 20,
    tag: 'Contexto cultural · fallas',
    color: '#D68A98',
    type: 'publica',
    stops: [
      { kind: 'planta', refId: 'jacaranda', label: 'Jacaranda', location: { lat: 39.4615, lng: -0.3792 } },
      { kind: 'monumento', refId: 'estacion-nord', label: 'Estación del Norte', location: { lat: 39.4666, lng: -0.3773 } },
    ],
  },
  {
    id: 'hesperides',
    name: 'Jardín de las Hespérides',
    distanceKm: 0.8,
    minutes: 25,
    tag: 'Ruta educativa · 6 paradas',
    color: '#7FB3E0',
    type: 'educativa',
    stops: [
      { kind: 'planta', refId: 'naranjo', label: 'Naranjo amargo', location: { lat: 39.477, lng: -0.3884 } },
      { kind: 'planta', refId: 'laurel', label: 'Laurel', location: { lat: 39.4757, lng: -0.3866 } },
    ],
  },
]

export const achievements: Achievement[] = [
  { id: 'a1', title: 'Ficha ampliada', reward: 'Historia completa de la Jacaranda', unlocked: true },
  { id: 'a2', title: 'Primer herbario', reward: 'Curiosidades de 5 especies', unlocked: true },
  { id: 'a3', title: 'Cazador de raras', reward: 'Audioguía del Jardín del Turia', unlocked: false },
  { id: 'a4', title: 'Nivel 10', reward: 'Ruta secreta por el centro histórico', unlocked: false },
]

export const offlineZones: OfflineZone[] = [
  { id: 'turia', name: 'Jardín del Turia', sizeMb: 128, downloaded: true },
  { id: 'central', name: 'Parc Central', sizeMb: 96, downloaded: false },
  { id: 'botanico', name: 'Jardín Botánico UV', sizeMb: 74, downloaded: false },
]

export const findPlant = (id: string) => plants.find((p) => p.id === id)
export const findMonument = (id: string) => monuments.find((m) => m.id === id)
export const findRoute = (id: string) => routes.find((r) => r.id === id)
