import type { ReactNode } from 'react'

interface Props {
  active?: boolean
  onClick?: () => void
  children: ReactNode
}

export function Chip({ active, onClick, children }: Props) {
  return (
    <button type="button" className={`chip${active ? ' chip--active' : ''}`} aria-pressed={active} onClick={onClick}>
      {children}
    </button>
  )
}
