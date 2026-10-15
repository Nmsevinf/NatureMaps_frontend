import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { checkHealth } from '../api/client'
import { Icon } from '../components/Icon'
import { ScreenHeader } from '../components/ScreenHeader'
import { useApp } from '../context/useApp'
import { LANG_LABELS } from '../i18n/strings'

/** 1.6 — Ajustes: idioma, offline, notificaciones pasivas, cambio de modo y accesos de rol. */
export function Settings() {
  const { t, lang, passiveNotifications, setPassiveNotifications } = useApp()
  const navigate = useNavigate()
  const [server, setServer] = useState<'checking' | 'ok' | 'down'>('checking')

  useEffect(() => {
    const ctrl = new AbortController()
    checkHealth(ctrl.signal).then((ok) => !ctrl.signal.aborted && setServer(ok ? 'ok' : 'down'))
    return () => ctrl.abort()
  }, [])

  const toggleNotifications = async () => {
    const next = !passiveNotifications
    if (next && 'Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission()
    }
    setPassiveNotifications(next)
  }

  return (
    <div className="screen">
      <ScreenHeader back title={t('settings.title')} />
      <div className="list">
        <Link to="/ajustes/idioma" className="row-card">
          <span className="thumb">
            <Icon name="globe" />
          </span>
          <span className="row-card__text">
            <span className="row-card__title">{t('settings.language')}</span>
            <span className="row-card__sub">{LANG_LABELS[lang]}</span>
          </span>
          <Icon name="chevron" size={14} strokeWidth={2.4} className="muted" />
        </Link>

        <Link to="/ajustes/offline" className="row-card">
          <span className="thumb">
            <Icon name="cloud" />
          </span>
          <span className="row-card__text">
            <span className="row-card__title">{t('settings.offline')}</span>
          </span>
          <Icon name="chevron" size={14} strokeWidth={2.4} className="muted" />
        </Link>

        <div className="row-card">
          <span className="thumb">
            <Icon name="bell" />
          </span>
          <span className="row-card__text">
            <span className="row-card__title">{t('settings.notifications')}</span>
            <span className="row-card__sub">{t('settings.notificationsDesc')}</span>
          </span>
          <button role="switch" aria-checked={passiveNotifications} className={`switch${passiveNotifications ? ' switch--on' : ''}`} onClick={toggleNotifications}>
            <span />
          </button>
        </div>

        <button className="row-card" onClick={() => navigate('/modo')}>
          <span className="thumb">
            <Icon name="refresh" />
          </span>
          <span className="row-card__text">
            <span className="row-card__title">{t('settings.changeMode')}</span>
          </span>
          <Icon name="chevron" size={14} strokeWidth={2.4} className="muted" />
        </button>

        <p className="section-label">Acceso</p>
        <Link to="/acceso/profesor" className="row-card">
          <span className="thumb">
            <Icon name="user" />
          </span>
          <span className="row-card__text">
            <span className="row-card__title">{t('settings.teacher')}</span>
          </span>
          <Icon name="chevron" size={14} strokeWidth={2.4} className="muted" />
        </Link>
        <Link to="/acceso/admin" className="row-card">
          <span className="thumb">
            <Icon name="shield" />
          </span>
          <span className="row-card__text">
            <span className="row-card__title">{t('settings.admin')}</span>
          </span>
          <Icon name="chevron" size={14} strokeWidth={2.4} className="muted" />
        </Link>

        <p className="server-status">
          <i className={`dot dot--${server}`} /> {t('settings.server')}:{' '}
          {server === 'checking' ? t('settings.checking') : server === 'ok' ? t('settings.online') : t('settings.offlineServer')}
        </p>
      </div>
    </div>
  )
}
