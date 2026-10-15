import type { ReactNode } from 'react'
import { Icon, type IconName } from '../Icon'

interface Props {
  icon?: IconName
  title: string
  description?: string
  /** Botón u otra acción opcional debajo del texto. */
  action?: ReactNode
}

/** Estado vacío: se usa mientras una lista no tiene datos reales. */
export function EmptyState({ icon = 'leaf', title, description, action }: Props) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">
        <Icon name={icon} size={30} />
      </span>
      <p className="empty-state__title">{title}</p>
      {description && <p className="empty-state__desc">{description}</p>}
      {action}
    </div>
  )
}
