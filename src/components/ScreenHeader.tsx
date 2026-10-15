import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/useApp'
import { Icon } from './Icon'

interface Props {
  title: string
  subtitle?: string
  back?: boolean
  right?: ReactNode
}

export function ScreenHeader({ title, subtitle, back, right }: Props) {
  const navigate = useNavigate()
  const { t } = useApp()
  return (
    <header className="screen-header">
      {back && (
        <button className="icon-btn" onClick={() => navigate(-1)} aria-label={t('common.back')}>
          <Icon name="back" size={16} strokeWidth={2.4} />
        </button>
      )}
      <div className="screen-header__text">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {right}
    </header>
  )
}

export function SettingsButton() {
  const navigate = useNavigate()
  const { t } = useApp()
  return (
    <button className="settings-btn" onClick={() => navigate('/ajustes')} aria-label={t('settings.title')}>
      <Icon name="settings" size={17} strokeWidth={2} />
    </button>
  )
}
