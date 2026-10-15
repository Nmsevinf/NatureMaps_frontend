import { useNavigate } from 'react-router-dom'
import { Icon, type IconName } from '../components/Icon'
import { useApp } from '../context/useApp'
import type { StringKey } from '../i18n/strings'
import type { Mode } from '../types'

const options: { mode: Mode; icon: IconName; title: StringKey; desc: StringKey }[] = [
  { mode: 'aventura', icon: 'game', title: 'mode.aventura', desc: 'mode.aventura.desc' },
  { mode: 'descubridor', icon: 'leaf', title: 'mode.descubridor', desc: 'mode.descubridor.desc' },
  { mode: 'esencial', icon: 'heart', title: 'mode.esencial', desc: 'mode.esencial.desc' },
  { mode: 'educativo', icon: 'school', title: 'mode.educativo', desc: 'mode.educativo.desc' },
]

/** 1.0 — Selección de modo / perfil */
export function ModeSelect() {
  const { mode, setMode, t } = useApp()
  const navigate = useNavigate()

  const choose = (m: Mode) => {
    setMode(m)
    setTimeout(() => navigate('/inicio', { replace: true }), 220)
  }

  return (
    <div className="screen screen--padded mode-select">
      <div className="brand">
        <span className="brand__logo">
          <Icon name="leaf" size={18} strokeWidth={2} />
        </span>
        Nature MAPS
      </div>
      <h1 className="title-xl">{t('mode.title')}</h1>
      <p className="subtitle">{t('mode.subtitle')}</p>

      <div className="stack">
        {options.map((o) => {
          const selected = mode === o.mode
          return (
            <button key={o.mode} className={`option${selected ? ' option--selected' : ''}`} onClick={() => choose(o.mode)} data-mode-option={o.mode}>
              <span className="option__icon">
                <Icon name={o.icon} size={24} />
              </span>
              <span className="option__text">
                <span className="option__title">{t(o.title)}</span>
                <span className="option__desc">{t(o.desc)}</span>
              </span>
              {selected && (
                <span className="option__check">
                  <Icon name="check" size={14} strokeWidth={3} />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
