import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LANDMARKS } from '../data/landmarks'
import { RouteMap } from '../components/RouteMap'
import { isInPune, requestBrowserLocation } from '../lib/geo'
import { tx } from '../i18n/ui'
import { useGuide } from '../state/GuideContext'
import type { LocationFix } from '../types'

export function Start() {
  const { lang, setLocation } = useGuide()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [draft, setDraft] = useState<LocationFix | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return LANDMARKS
    return LANDMARKS.filter(
      (l) =>
        l.nameEn.toLowerCase().includes(q) ||
        l.nameMr.includes(query.trim()) ||
        l.areaEn.toLowerCase().includes(q),
    )
  }, [query])

  function commit(loc: LocationFix) {
    setLocation(loc)
    navigate('/guide')
  }

  async function shareGps() {
    setBusy(true)
    setNotice(null)
    try {
      const loc = await requestBrowserLocation()
      loc.label = tx(lang, 'gpsLabel')
      if (!isInPune(loc.lat, loc.lng)) setNotice(tx(lang, 'outsidePune'))
      else if (loc.accuracy && loc.accuracy > 180) setNotice(tx(lang, 'locationApprox'))
      setDraft(loc)
      commit(loc)
    } catch (err) {
      const code = err instanceof GeolocationPositionError ? err.code : 0
      setNotice(code === 2 || !('geolocation' in navigator) ? tx(lang, 'gpsUnavailable') : tx(lang, 'gpsDenied'))
    } finally {
      setBusy(false)
    }
  }

  function pickLandmark(id: string) {
    const l = LANDMARKS.find((x) => x.id === id)
    if (!l) return
    commit({
      lat: l.lat,
      lng: l.lng,
      label: lang === 'mr' ? l.nameMr : l.nameEn,
      source: 'landmark',
    })
  }

  return (
    <article className="page start">
      <header>
        <p className="kicker">{tx(lang, 'startDarshan')}</p>
        <h1>{tx(lang, 'shareTitle')}</h1>
        <p className="lead">{tx(lang, 'shareLead')}</p>
      </header>

      <button type="button" className="btn btn--primary btn--block" onClick={shareGps} disabled={busy}>
        {busy ? tx(lang, 'locating') : tx(lang, 'allowLocation')}
      </button>
      {notice ? (
        <p className="banner" role="status">
          {notice}
        </p>
      ) : null}

      <section>
        <h2>{tx(lang, 'orManual')}</h2>
        <label className="field">
          <span>{tx(lang, 'pickLandmark')}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tx(lang, 'searchLandmark')}
          />
        </label>
        <ul className="landmark-list">
          {filtered.map((l) => (
            <li key={l.id}>
              <button type="button" onClick={() => pickLandmark(l.id)}>
                <strong>{lang === 'mr' ? l.nameMr : l.nameEn}</strong>
                <span>{l.areaEn}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{tx(lang, 'dropPin')}</h2>
        <p className="muted">{tx(lang, 'dropPinHint')}</p>
        <RouteMap
          user={draft}
          pinMode
          onPin={(lat, lng) =>
            setDraft({
              lat,
              lng,
              label: tx(lang, 'pinLabel'),
              source: 'pin',
            })
          }
        />
        <button
          type="button"
          className="btn btn--primary btn--block"
          disabled={!draft}
          onClick={() => draft && commit(draft)}
        >
          {tx(lang, 'useThisLocation')}
        </button>
      </section>
    </article>
  )
}
