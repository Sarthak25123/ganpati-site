import { GANPATIS } from '../data/ganpatis'
import type { Ganpati, LocationFix } from '../types'

const EARTH_M = 6371000
const PUNE_BOUNDS = { minLat: 18.4, maxLat: 18.72, minLng: 73.7, maxLng: 74.05 }
const WALK_THRESHOLD_M = 800
const WALK_M_PER_MIN = 75
const AUTO_M_PER_MIN = 250

export function haversineMeters(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_M * Math.asin(Math.min(1, Math.sqrt(h)))
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

export function walkMinutes(meters: number): number {
  return Math.max(1, Math.round(meters / WALK_M_PER_MIN))
}

export function autoMinutes(meters: number): number {
  return Math.max(1, Math.round(meters / AUTO_M_PER_MIN))
}

export function recommendMode(meters: number): 'walk' | 'auto' {
  return meters < WALK_THRESHOLD_M ? 'walk' : 'auto'
}

export function formatDistance(meters: number, lang: 'en' | 'mr'): string {
  if (meters < 1000) {
    const rounded = Math.round(meters / 10) * 10
    return lang === 'mr' ? `${rounded} मी` : `${rounded} m`
  }
  const km = (meters / 1000).toFixed(meters < 10000 ? 1 : 0)
  return lang === 'mr' ? `${km} किमी` : `${km} km`
}

export function isInPune(lat: number, lng: number): boolean {
  return (
    lat >= PUNE_BOUNDS.minLat &&
    lat <= PUNE_BOUNDS.maxLat &&
    lng >= PUNE_BOUNDS.minLng &&
    lng <= PUNE_BOUNDS.maxLng
  )
}

export function ganpatiAtLocation(
  loc: LocationFix,
  radiusM = 90,
): Ganpati | undefined {
  return GANPATIS.find((g) => haversineMeters(loc, g) <= radiusM)
}

export function requestBrowserLocation(): Promise<LocationFix> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('unsupported'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: 'GPS',
          source: 'gps',
          accuracy: pos.coords.accuracy,
        })
      },
      (err) => {
        reject(err)
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 15000 },
    )
  })
}
