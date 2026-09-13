import type { Lang, LocationFix, RouteMode, VisitStatus } from '../types'

export const STORAGE_KEY = 'maanache-ganpati-guide-v1'

export type PersistedState = {
  lang: Lang
  location: LocationFix | null
  status: Record<string, VisitStatus>
  mode: RouteMode
}

export function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PersistedState
    if (parsed.lang !== 'en' && parsed.lang !== 'mr') return null
    return parsed
  } catch {
    return null
  }
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Private mode or full storage — guide still works for this session.
  }
}
