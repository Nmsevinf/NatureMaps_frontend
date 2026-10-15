# Nature MAPS — Frontend

App móvil (web/PWA) para identificar plantas con una foto y recorrer rutas botánicas y culturales por Valencia.
Proyecto de curso del Equipo NatureMaps (UPV).

- **Backend:** [huugok/NatureMaps-Backend](https://github.com/huugok/NatureMaps-Backend) (Express + Drizzle + Neon)
- **Diseño:** prototipo de Figma (MVP móvil) — numeración de pantallas 1.x en los comentarios del código

## Stack

| Pieza | Elección |
|---|---|
| Framework | React 19 + TypeScript + Vite |
| Navegación | React Router 7 |
| Mapa | Leaflet + react-leaflet con teselas de OpenStreetMap (gratis, sin API key) |
| Estado global | Context (`src/context`) — modo, idioma y ajustes guardados en `localStorage` |
| Idiomas | Diccionario propio en `src/i18n/strings.ts` (es, va, en) |
| Estilos | CSS plano con variables; cada modo cambia el color de acento (`html[data-mode]`) |

## Arrancar

```bash
npm install
cp .env.example .env      # VITE_API_URL=http://localhost:3000 (backend)
npm run dev               # http://localhost:5173
```

Otros scripts: `npm run build`, `npm run preview`, `npm run lint`.

> La cámara del escáner solo funciona en `localhost` o HTTPS (requisito del navegador). Si no hay cámara, se puede subir una foto desde la galería.

## Pantallas base

| Ruta | Pantalla | Figma / Requisito |
|---|---|---|
| `/modo` | Selección de modo (Aventura, Paseo tranquilo, Solo lo esencial, Grupo escolar) | Encuesta inicial · RF11 |
| `/inicio` | Inicio según el modo: Aventura · Descubridor (con historia / esencial) · Educativo | 1.1 · 1.2 / 1.2.1 · 1.3 |
| `/mapa` | Plantas y monumentos en el mapa (`?planta=<id>` filtra una especie) | RF5 · F03.1 |
| `/escanear` | Identificar planta o monumento con cámara + resultados con % de confianza | 1.3.A / 1.3.B · RF2, RF17, RF18 |
| `/planta/:id` | Ficha de planta con fuente verificada (`?nuevo=1` muestra el logro) | 1.1.A · RF3, RF13 |
| `/monumento/:id` | Ficha de monumento / calle | 1.3.2 · RF10 |
| `/buscar` | Búsqueda por nombre y filtros (en floración, raras, familia) | RF4 |
| `/cercanas` | Lista de plantas cercanas por distancia | RF1 |
| `/rutas` | Rutas botánicas | 1.1.4 · RF6 |
| `/rutas/:id` | Ruta en el mapa con paradas numeradas + abrir en Google Maps | RF12, RF28 |
| `/logros` | Logros con valor real | 1.1.6 · RF36 |
| `/ajustes` | Ajustes: idioma, offline, notificaciones pasivas, cambiar modo, accesos de rol, estado del servidor | 1.6 · RF16 |
| `/ajustes/idioma` | Selector de idioma | 1.6.A |
| `/ajustes/offline` | Zonas descargables | 1.6.C |
| `/acceso/profesor`, `/acceso/admin` | Login profesor / administrador (solo interfaz) | 1.6.D / 1.6.E |

## Estructura

```
src/
  api/client.ts        # fetch al backend (VITE_API_URL) + checkHealth()
  components/          # TabBar, MapView, Icon, ScreenHeader, PlantRow, ModeBadge
  context/             # AppProvider + useApp() (modo, idioma, t())
  data/mock.ts         # datos de ejemplo (plantas, monumentos, rutas, logros)
  i18n/strings.ts      # textos es / va / en
  screens/             # una pantalla por archivo; screens/home/ = inicio por modo
  styles/global.css    # tokens de color por modo y todos los estilos
  types/               # tipos compartidos (Plant, Monument, BotanicalRoute…)
```

## Qué está conectado y qué es de ejemplo

- **Conectado:** `GET /health` del backend (se ve en Ajustes → "Servidor: conectado / sin conexión").
- **De ejemplo (`src/data/mock.ts`):** plantas, monumentos, rutas, logros y zonas offline. Coordenadas reales de Valencia, textos provisionales.
- **Simulado:** el resultado del escáner (aquí irá la llamada backend → Pl@ntNet) y el login.

### Siguientes pasos sugeridos

1. Backend: endpoints `GET /plants`, `GET /plants/:id`, `GET /routes`, `GET /routes/:id`, `GET /monuments` con tablas en Drizzle.
2. Cargar el Inventario de Arbolado del Ajuntament de València (GeoJSON) en Neon.
3. `POST /identify` en el backend que reenvíe la foto a Pl@ntNet (la API key nunca en el frontend).
4. Sustituir los imports de `data/mock.ts` por llamadas con `apiGet()`.
5. PWA + service worker para el modo offline real.
