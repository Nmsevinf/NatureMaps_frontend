import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useApp } from '../context/useApp'

export function NotFound() {
  const { t } = useApp()
  return (
    <div className="screen screen--padded empty-state">
      <Icon name="leaf" size={48} className="muted" />
      <h1 className="title-lg">{t('common.notFound')}</h1>
      <Link to="/inicio" className="btn">
        {t('nav.home')}
      </Link>
    </div>
  )
}
