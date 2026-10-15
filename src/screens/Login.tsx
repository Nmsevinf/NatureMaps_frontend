import { useState, type FormEvent } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { ScreenHeader } from '../components/ScreenHeader'
import { useApp } from '../context/useApp'

/** 1.6.D / 1.6.E — Login profesor y administrador. Pendiente de endpoint de autenticación en el backend. */
export function Login() {
  const { rol } = useParams()
  const { t } = useApp()
  const [submitted, setSubmitted] = useState(false)

  if (rol !== 'profesor' && rol !== 'admin') return <Navigate to="/ajustes" replace />
  const isAdmin = rol === 'admin'

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="screen">
      <ScreenHeader back title={isAdmin ? t('login.admin') : t('login.teacher')} />
      <form className="form" onSubmit={onSubmit}>
        <div className="login-icon">
          <Icon name={isAdmin ? 'settings' : 'school'} size={30} />
        </div>
        <label>
          {t('login.email')}
          <input type="email" required autoComplete="username" placeholder={isAdmin ? 'admin@naturemaps.es' : 'nombre@centro.edu.gva.es'} />
        </label>
        <label>
          {t('login.password')}
          <input type="password" required autoComplete="current-password" />
        </label>
        {isAdmin && <p className="note note--warn">{t('login.adminNotice')}</p>}
        <button className="btn btn--block" type="submit">
          {t('login.submit')}
        </button>
        {submitted && <p className="note">{t('login.notReady')}</p>}
      </form>
    </div>
  )
}
