import type { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent'
}

export function Card({ variant = 'default', className = '', ...rest }: Props) {
  return <div className={`card${variant === 'accent' ? ' card--accent' : ''} ${className}`.trim()} {...rest} />
}
