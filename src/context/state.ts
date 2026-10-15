import { createContext } from 'react'
import type { StringKey } from '../i18n/strings'
import type { Lang, Mode } from '../types'

export interface AppState {
  mode: Mode | null
  lang: Lang
  passiveNotifications: boolean
  setMode: (mode: Mode | null) => void
  setLang: (lang: Lang) => void
  setPassiveNotifications: (on: boolean) => void
  t: (key: StringKey, vars?: Record<string, string | number>) => string
}

export const AppContext = createContext<AppState | null>(null)
