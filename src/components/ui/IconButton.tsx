import type { ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from '../Icon'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName
  /** Texto para lectores de pantalla (obligatorio: el botón no tiene texto visible). */
  label: string
  variant?: 'default' | 'accent'
}

export function IconButton({ icon, label, variant = 'default', className = '', ...rest }: Props) {
  return (
    <button className={`icon-btn${variant === 'accent' ? ' icon-btn--accent' : ''} ${className}`.trim()} aria-label={label} {...rest}>
      <Icon name={icon} size={17} strokeWidth={2.2} />
    </button>
  )
}
