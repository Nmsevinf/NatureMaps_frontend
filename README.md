# Nature MAPS — Frontend

Base del frontend de Nature MAPS (proyecto de equipo, UPV).
Contiene el **sistema de diseño** y la **estructura común**: cada pantalla nueva hereda automáticamente el mismo estilo.

- Backend: [huugok/NatureMaps-Backend](https://github.com/huugok/NatureMaps-Backend)
- Stack: React 19 + TypeScript + Vite · React Router · Leaflet (OpenStreetMap)

## Arrancar

```bash
npm install
cp .env.example .env     # VITE_API_URL=http://localhost:3000
npm run dev              # http://localhost:5173
```

## Estructura

```
src/
  styles/
    tokens.css        ← colores, tipografía, espaciados, radios (ÚNICA fuente de estilo)
    base.css          ← estilos de layout y componentes
  components/
    layout/Page.tsx   ← plantilla de TODAS las pantallas (cabecera + cuerpo)
    layout/TabBar.tsx ← barra inferior
    ui/               ← Button, Card, ListItem, Chip, Input, Switch, Badge, EmptyState…
    MapView.tsx       ← mapa base de Valencia + "mi ubicación"
    Icon.tsx          ← iconos
  screens/            ← una pantalla por archivo
  context/            ← modo e idioma (useApp)
  i18n/strings.ts     ← textos en es / va / en
  api/client.ts       ← llamadas al backend
```

## Reglas del equipo

1. **Toda pantalla empieza con `<Page>`**:
   ```tsx
   import { Page } from '../components/layout/Page'
   import { Button, ListItem } from '../components/ui'

   export function MiPantalla() {
     return (
       <Page title="Mi pantalla" back>
         <ListItem icon="leaf" title="Algo" to="/otra" />
         <Button block>Acción</Button>
       </Page>
     )
   }
   ```
   y se registra en `src/App.tsx` con una `<Route>`.
2. **Nada de colores ni tamaños a mano**: usa `var(--color-accent)`, `var(--space-4)`… de `tokens.css`. Así el color cambia solo con el modo.
3. **Reutiliza `components/ui`** antes de crear algo nuevo. Si hace falta un componente nuevo, va en `components/ui/` y se añade a `index.ts` y al catálogo.
4. **Textos en `i18n/strings.ts`** y se usan con `t('clave')`.
5. **Nada de datos inventados**: si el backend aún no devuelve algo, muestra `<EmptyState>`.

## Catálogo de componentes

Abre **`/componentes`** (o Ajustes → Catálogo de componentes) para ver todas las piezas disponibles. Cambia de modo y verás cómo cambia el color de todo.

## Qué hay hecho

| Ruta | Pantalla | Estado |
|---|---|---|
| `/modo` | Selección de modo | Funcional |
| `/inicio` | Inicio con accesos rápidos | Funcional |
| `/mapa` | Mapa real de Valencia + mi ubicación | Funcional, sin marcadores |
| `/escanear` | Cámara real / galería | Hace la foto; falta enviarla al backend (Pl@ntNet) |
| `/rutas` | Rutas | Estado vacío hasta que exista `GET /routes` |
| `/buscar` | Búsqueda | Estado vacío hasta que exista `GET /plants` |
| `/ajustes` | Idioma, cambiar modo, estado del servidor (`GET /health` real) | Funcional |
| `/ajustes/idioma` | es / va / en | Funcional |
| `/componentes` | Catálogo del sistema de diseño | Funcional |

## Pantallas pendientes (para repartir)

Según el prototipo de Figma: ficha de planta, ficha de monumento, detalle de ruta, logros (Aventura), misión y test (Educativo), modo offline, notificaciones pasivas, login profesor/administrador y panel de administración.
