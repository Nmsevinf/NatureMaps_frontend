import { Link } from 'react-router-dom'
import { useApp } from '../context/useApp'

const LABELS = {
  aventura: '🎮 MODO AVENTURA',
  descubridor: '🍃 MODO DESCUBRIDOR',
  esencial: '🍃 SOLO LO ESENCIAL',
  educativo: '🎒 MODO EDUCATIVO',
} as const

export function ModeBadge() {
  const { mode, t } = useApp()
  if (!mode) return null
  return (
    <div className="mode-badge-row">
      <span className="badge-mode">{LABELS[mode]}</span>
      <Link to="/modo" className="link-muted">
        {t('mode.change')}
      </Link>
    </div>
  )
}
