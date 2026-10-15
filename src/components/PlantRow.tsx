import { Link } from 'react-router-dom'
import type { Plant } from '../types'
import { Icon } from './Icon'

interface Props {
  plant: Plant
  detail?: string
  highlight?: string
}

function Highlighted({ text, query }: { text: string; query?: string }) {
  if (!query) return <>{text}</>
  const i = text.toLowerCase().indexOf(query.toLowerCase())
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <b>{text.slice(i, i + query.length)}</b>
      {text.slice(i + query.length)}
    </>
  )
}

export function PlantRow({ plant, detail, highlight }: Props) {
  return (
    <Link to={`/planta/${plant.id}`} className="row-card">
      <div className="thumb">
        <Icon name="leaf" />
      </div>
      <div className="row-card__text">
        <div className="row-card__title">
          <Highlighted text={plant.scientificName} query={highlight} />
        </div>
        <div className="row-card__sub">{detail ?? `${plant.commonName} · ${plant.zone}`}</div>
      </div>
      <Icon name="chevron" size={14} strokeWidth={2.4} className="muted" />
    </Link>
  )
}
