import { useNavigate } from 'react-router-dom'
import { Page } from '../components/layout/Page'
import type { IconName } from '../components/Icon'
import { ListItem } from '../components/ui'
import { useApp } from '../context/useApp'
import type { StringKey } from '../i18n/strings'
import type { Mode } from '../types'

const MODES: { mode: Mode; icon: IconName; title: StringKey; desc: StringKey }[] = [
  { mode: 'aventura', icon: 'game', title: 'mode.aventura', desc: 'mode.aventura.desc' },
  { mode: 'descubridor', icon: 'leaf', title: 'mode.descubridor', desc: 'mode.descubridor.desc' },
  { mode: 'esencial', icon: 'heart', title: 'mode.esencial', desc: 'mode.esencial.desc' },
  { mode: 'educativo', icon: 'school', title: 'mode.educativo', desc: 'mode.educativo.desc' },
]

/** Selección de modo. Al elegir uno, toda la app cambia su color de acento. */
export function ModeSelect() {
  const { mode, setMode, t } = useApp()
  const navigate = useNavigate()

  return (
    <Page title={t('mode.title')} subtitle={t('mode.subtitle')}>
      <div className="list">
        {MODES.map((m) => (
          <ListItem
            key={m.mode}
            icon={m.icon}
            title={t(m.title)}
            subtitle={t(m.desc)}
            selected={mode === m.mode}
            onClick={() => {
              setMode(m.mode)
              navigate('/inicio', { replace: true })
            }}
          />
        ))}
      </div>
    </Page>
  )
}
