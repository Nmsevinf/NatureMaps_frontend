import type { ReactNode } from 'react'

export function Badge({ solid, children }: { solid?: boolean; children: ReactNode }) {
  return <span className={`badge${solid ? ' badge--solid' : ''}`}>{children}</span>
}
