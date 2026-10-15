import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from '../Icon'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'sm'
  block?: boolean
  icon?: IconName
  /** Si se pasa, el botón navega a esa ruta (se renderiza como enlace). */
  to?: string
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', block, icon, to, className = '', children, ...rest }: Props) {
  const cls = `btn btn--${variant}${size === 'sm' ? ' btn--sm' : ''}${block ? ' btn--block' : ''} ${className}`.trim()
  const content = (
    <>
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} />}
      {children}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls}>
        {content}
      </Link>
    )
  }
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  )
}
