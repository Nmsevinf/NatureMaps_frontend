import { Page } from '../components/layout/Page'
import { ListItem, Radio } from '../components/ui'
import { useApp } from '../context/useApp'
import { LANG_LABELS } from '../i18n/strings'
import type { Lang } from '../types'

export function Language() {
  const { t, lang, setLang } = useApp()
  return (
    <Page title={t('settings.language')} back>
      <div className="list" role="radiogroup">
        {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
          <ListItem key={l} title={LANG_LABELS[l]} selected={lang === l} trailing={<Radio checked={lang === l} />} onClick={() => setLang(l)} />
        ))}
      </div>
    </Page>
  )
}
