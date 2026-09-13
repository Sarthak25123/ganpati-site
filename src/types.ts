export type Lang = 'en' | 'mr'

export type Localized = {
  en: string
  mr: string
}

export type LocationSource = 'gps' | 'landmark' | 'pin'

export type LocationFix = {
  lat: number
  lng: number
  label: string
  source: LocationSource
  accuracy?: number
}

export type VisitStatus = 'pending' | 'visited' | 'skipped'

export type RouteMode = 'traditional' | 'nearest'

export type GanpatiId = 1 | 2 | 3 | 4 | 5

export type Ganpati = {
  id: GanpatiId
  slug: string
  rankEn: string
  rankMr: string
  rankWordMr: string
  nameEn: string
  nameMr: string
  areaEn: string
  areaMr: string
  address: string
  lat: number
  lng: number
  yearNote: Localized
  history: Localized
  whyMaan: Localized
  timings: Localized
  expect: Localized
  howToReach: Localized
  nearby: Localized
  tips: Localized
}

export type Landmark = {
  id: string
  nameEn: string
  nameMr: string
  areaEn: string
  lat: number
  lng: number
}

export type OtherMandal = {
  id: string
  nameEn: string
  nameMr: string
  areaEn: string
  areaMr: string
  note: Localized
}
