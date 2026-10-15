import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, type StringKey } from '../i18n/strings'
import type { Lang, Mode } from '../types'
import { AppContext, type AppState } from './state'

// Estado global: modo elegido e idioma. Se guarda en localStorage.
const STORAGE_KEY = 'naturemaps:prefs'

interface Prefs {
  mode: Mode | null
  lang: Lang
}

function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { mode: null, lang: 'es', ...JSON.parse(raw) }
  } catch {
    /* almacenamiento no disponible: usamos valores por defecto */
  }
  return { mode: null, lang: 'es' }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    } catch {
      /* ignorar */
    }
    document.documentElement.lang = prefs.lang === 'va' ? 'ca' : prefs.lang
    document.documentElement.dataset.mode = prefs.mode ?? 'none'
  }, [prefs])

  const t = useCallback(
    (key: StringKey, vars?: Record<string, string | number>) => {
      let text = dictionaries[prefs.lang][key] ?? dictionaries.es[key] ?? key
      if (vars) for (const [k, v] of Object.entries(vars)) text = text.replaceAll(`{${k}}`, String(v))
      return text
    },
    [prefs.lang],
  )

  const value = useMemo<AppState>(
    () => ({
      ...prefs,
      setMode: (mode) => setPrefs((p) => ({ ...p, mode })),
      setLang: (lang) => setPrefs((p) => ({ ...p, lang })),
      t,
    }),
    [prefs, t],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
