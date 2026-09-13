import type { LocationFix } from '../types'

export function googleDirUrl(
  origin: LocationFix,
  dest: { lat: number; lng: number },
  mode: 'walk' | 'auto',
): string {
  const travelmode = mode === 'walk' ? 'walking' : 'driving'
  const params = new URLSearchParams({
    api: '1',
    origin: `${origin.lat},${origin.lng}`,
    destination: `${dest.lat},${dest.lng}`,
    travelmode,
  })
  return `https://www.google.com/maps/dir/?${params.toString()}`
}

export function appleDirUrl(
  origin: LocationFix,
  dest: { lat: number; lng: number },
  mode: 'walk' | 'auto',
): string {
  const dirflg = mode === 'walk' ? 'w' : 'd'
  const params = new URLSearchParams({
    saddr: `${origin.lat},${origin.lng}`,
    daddr: `${dest.lat},${dest.lng}`,
    dirflg,
  })
  return `https://maps.apple.com/?${params.toString()}`
}

export function googlePlaceUrl(dest: { lat: number; lng: number }): string {
  return `https://www.google.com/maps/search/?api=1&query=${dest.lat},${dest.lng}`
}

export function googleMultiStopUrl(points: { lat: number; lng: number }[]): string {
  const path = points.map((p) => `${p.lat},${p.lng}`).join('/')
  return `https://www.google.com/maps/dir/${path}`
}
