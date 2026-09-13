import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { GANPATIS } from '../data/ganpatis'
import { haversineMeters } from '../lib/geo'
import { loadState, saveState } from '../lib/storage'
import type {
  Ganpati,
  GanpatiId,
  Lang,
  LocationFix,
  RouteMode,
  VisitStatus,
} from '../types'

const DEFAULT_STATUS: Record<GanpatiId, VisitStatus> = {
  1: 'pending',
  2: 'pending',
  3: 'pending',
  4: 'pending',
  5: 'pending',
}

type StatusMap = Record<GanpatiId, VisitStatus>

type GuideContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  location: LocationFix | null
  setLocation: (loc: LocationFix | null) => void
  status: StatusMap
  setStatus: (id: GanpatiId, value: VisitStatus) => void
  mode: RouteMode
  setMode: (mode: RouteMode) => void
  remaining: Ganpati[]
  next: Ganpati | undefined
  doneCount: number
  isComplete: boolean
  resetProgress: () => void
}

const GuideContext = createContext<GuideContextValue | null>(null)

function asStatus(raw: Record<string, VisitStatus> | undefined): StatusMap {
  const next = { ...DEFAULT_STATUS }
  if (!raw) return next
  for (const g of GANPATIS) {
    const v = raw[String(g.id)]
    if (v === 'visited' || v === 'skipped' || v === 'pending') next[g.id] = v
  }
  return next
}

export function GuideProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => loadState()?.lang ?? 'en')
  const [location, setLocationState] = useState<LocationFix | null>(
    () => loadState()?.location ?? null,
  )
  const [status, setStatusMap] = useState<StatusMap>(() => asStatus(loadState()?.status))
  const [mode, setModeState] = useState<RouteMode>(() => loadState()?.mode ?? 'traditional')

  useEffect(() => {
    saveState({
      lang,
      location,
      mode,
      status: {
        1: status[1],
        2: status[2],
        3: status[3],
        4: status[4],
        5: status[5],
      },
    })
    document.documentElement.lang = lang === 'mr' ? 'mr' : 'en'
  }, [lang, location, mode, status])

  const remaining = useMemo(
    () => GANPATIS.filter((g) => status[g.id] === 'pending'),
    [status],
  )

  const next = useMemo(() => {
    if (remaining.length === 0) return undefined
    if (mode === 'traditional' || !location) return remaining[0]
    return [...remaining].sort(
      (a, b) => haversineMeters(location, a) - haversineMeters(location, b),
    )[0]
  }, [remaining, mode, location])

  const doneCount = GANPATIS.filter((g) => status[g.id] !== 'pending').length

  const setLang = useCallback((value: Lang) => setLangState(value), [])
  const setLocation = useCallback((loc: LocationFix | null) => {
    setLocationState(loc)
  }, [])
  const setStatus = useCallback((id: GanpatiId, value: VisitStatus) => {
    setStatusMap((prev) => ({ ...prev, [id]: value }))
  }, [])
  const setMode = useCallback((value: RouteMode) => setModeState(value), [])
  const resetProgress = useCallback(() => {
    setStatusMap({ ...DEFAULT_STATUS })
  }, [])

  const value = useMemo<GuideContextValue>(
    () => ({
      lang,
      setLang,
      location,
      setLocation,
      status,
      setStatus,
      mode,
      setMode,
      remaining,
      next,
      doneCount,
      isComplete: remaining.length === 0,
      resetProgress,
    }),
    [
      lang,
      setLang,
      location,
      setLocation,
      status,
      setStatus,
      mode,
      setMode,
      remaining,
      next,
      doneCount,
      resetProgress,
    ],
  )

  return <GuideContext.Provider value={value}>{children}</GuideContext.Provider>
}

export function useGuide(): GuideContextValue {
  const ctx = useContext(GuideContext)
  if (!ctx) throw new Error('useGuide must be used within GuideProvider')
  return ctx
}

export function locText(block: { en: string; mr: string }, lang: Lang): string {
  return block[lang]
}
