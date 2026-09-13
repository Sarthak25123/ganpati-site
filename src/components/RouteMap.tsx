import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { GANPATIS } from '../data/ganpatis'
import type { GanpatiId, LocationFix, VisitStatus } from '../types'
import 'leaflet/dist/leaflet.css'

type Props = {
  user?: LocationFix | null
  highlightId?: number
  status?: Record<GanpatiId, VisitStatus>
  onPin?: (lat: number, lng: number) => void
  pinMode?: boolean
  className?: string
}

function pinHtml(id: number, kind: string): string {
  return `<div class="map-pin map-pin--${kind}"><span>${id}</span></div>`
}

export function RouteMap({
  user,
  highlightId,
  status,
  onPin,
  pinMode = false,
  className = '',
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const layerRef = useRef<L.LayerGroup | null>(null)
  const onPinRef = useRef(onPin)
  onPinRef.current = onPin

  useEffect(() => {
    const el = hostRef.current
    if (!el || mapRef.current) return

    const map = L.map(el, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
    }).addTo(map)
    map.setView([18.5158, 73.8542], 15)
    layerRef.current = L.layerGroup().addTo(map)
    mapRef.current = map

    map.on('click', (e: L.LeafletMouseEvent) => {
      onPinRef.current?.(e.latlng.lat, e.latlng.lng)
    })

    const onResize = () => map.invalidateSize()
    window.addEventListener('resize', onResize)
    const t = window.setTimeout(onResize, 200)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('resize', onResize)
      map.remove()
      mapRef.current = null
      layerRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const layer = layerRef.current
    if (!map || !layer) return
    layer.clearLayers()

    const bounds: L.LatLngExpression[] = []

    for (const g of GANPATIS) {
      const st = status?.[g.id] ?? 'pending'
      const kind =
        g.id === highlightId ? 'now' : st === 'visited' ? 'done' : st === 'skipped' ? 'skip' : 'soon'
      const icon = L.divIcon({
        className: 'map-pin-wrap',
        html: pinHtml(g.id, kind),
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })
      L.marker([g.lat, g.lng], { icon, keyboard: true, title: g.nameEn })
        .addTo(layer)
        .bindPopup(`<strong>${g.id}. ${g.nameEn}</strong><br/>${g.nameMr}`)
      bounds.push([g.lat, g.lng])
    }

    if (user) {
      const me = L.divIcon({
        className: 'map-pin-wrap',
        html: '<div class="map-me" aria-hidden="true"></div>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })
      L.marker([user.lat, user.lng], { icon: me, title: user.label }).addTo(layer)
      bounds.push([user.lat, user.lng])
    }

    const linePts: L.LatLngExpression[] = []
    if (user && highlightId) {
      const dest = GANPATIS.find((g) => g.id === highlightId)
      if (dest) {
        linePts.push([user.lat, user.lng], [dest.lat, dest.lng])
      }
    } else {
      for (const g of GANPATIS) {
        if (!status || status[g.id] !== 'skipped') linePts.push([g.lat, g.lng])
      }
    }
    if (linePts.length > 1) {
      L.polyline(linePts, {
        color: '#c45c26',
        weight: 3,
        opacity: 0.75,
        dashArray: '7 8',
      }).addTo(layer)
    }

    if (bounds.length > 0 && !pinMode) {
      map.fitBounds(L.latLngBounds(bounds).pad(0.18), { animate: false, maxZoom: 16 })
    }
    map.invalidateSize()
  }, [user, highlightId, status, pinMode])

  return (
    <div
      ref={hostRef}
      className={`route-map ${pinMode ? 'route-map--pin' : ''} ${className}`}
      role="application"
      aria-label="Map of Maanache Ganpati"
    />
  )
}
