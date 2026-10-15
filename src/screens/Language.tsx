import { useNavigate } from 'react-router-dom'
import { ScreenHeader } from '../components/ScreenHeader'
import { useApp } from '../context/useApp'
import { LANG_LABELS } from '../i18n/strings'
import type { Lang } from '../types'

/** 1.6.A — Selector de idioma (RF7/RF8). */
export function Language() {
  const { t, lang, setLang } = useApp()
  const navigate = useNavigate()
  return (
    <div className="screen">
      <ScreenHeader back title={t('settings.language')} />
      <div className="list" role="radiogroup">
        {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
          <button key={l} role="radio" aria-checked={lang === l} className={`row-card radio-row${lang === l ? ' radio-row--on' : ''}`} onClick={() => setLang(l)}>
            <span className={`radio${lang === l ? ' radio--on' : ''}`} />
            <span className="row-card__title">{LANG_LABELS[l]}</span>
          </button>
        ))}
      </div>
      <div className="bottom-actions">
        <button className="btn btn--block" onClick={() => navigate(-1)}>
          {t('common.save')}
        </button>
      </div>
    </div>
  )
}
