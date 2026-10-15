import type { ReactNode } from 'react'

export function StatusDot({ status, children }: { status: 'ok' | 'error' | 'idle'; children: ReactNode }) {
  return <span className={`status status--${status}`}>{children}</span>
}
