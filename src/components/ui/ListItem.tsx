import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from '../Icon'

interface Props {
  title: string
  subtitle?: string
  icon?: IconName
  /** Navega a esta ruta al pulsar. */
  to?: string
  onClick?: () => void
  /** Contenido a la derecha (switch, badge…). Si no hay y es pulsable, muestra una flecha. */
  trailing?: ReactNode
  selected?: boolean
}

export function ListItem({ title, subtitle, icon, to, onClick, trailing, selected }: Props) {
  const cls = `list-item${selected ? ' list-item--selected' : ''}`
  const clickable = Boolean(to || onClick)
  const inner = (
    <>
      {icon && (
        <span className="list-item__icon">
          <Icon name={icon} />
        </span>
      )}
      <span className="list-item__text">
        <span className="list-item__title">{title}</span>
        {subtitle && <span className="list-item__subtitle">{subtitle}</span>}
      </span>
      <span className="list-item__trailing">{trailing ?? (clickable && <Icon name="chevron" size={14} strokeWidth={2.4} />)}</span>
    </>
  )
  if (to)
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    )
  if (onClick)
    return (
      <button type="button" className={cls} onClick={onClick}>
        {inner}
      </button>
    )
  return <div className={cls}>{inner}</div>
}
