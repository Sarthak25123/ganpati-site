import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GanpatiPhoto } from '../components/GanpatiPhoto'
import { ProgressTrail } from '../components/ProgressTrail'
import { RouteMap } from '../components/RouteMap'
import { GANPATIS } from '../data/ganpatis'
import {
  autoMinutes,
  formatDistance,
  ganpatiAtLocation,
  haversineMeters,
  isInPune,
  recommendMode,
  requestBrowserLocation,
  walkMinutes,
} from '../lib/geo'
import { appleDirUrl, googleDirUrl, googleMultiStopUrl } from '../lib/maps'
import { tx } from '../i18n/ui'
import { locText, useGuide } from '../state/GuideContext'
import type { Ganpati, LocationFix } from '../types'

export function Guide() {
  const {
    lang,
    location,
    setLocation,
    status,
    setStatus,
    mode,
    setMode,
    next,
    isComplete,
    resetProgress,
    remaining,
  } = useGuide()
  const [note, setNote] = useState<string | null>(null)

  const here = location ? ganpatiAtLocation(location) : undefined
  const meters = location && next ? haversineMeters(location, next) : null
  const travel = meters == null ? 'walk' : recommendMode(meters)
  const outside = location ? !isInPune(location.lat, location.lng) : false

  async function refresh(): Promise<LocationFix | null> {
    try {
      const loc = await requestBrowserLocation()
      loc.label = tx(lang, 'gpsLabel')
      setLocation(loc)
      if (loc.accuracy && loc.accuracy > 180) setNote(tx(lang, 'locationApprox'))
      return loc
    } catch {
      return location
    }
  }

  function completeCurrent() {
    if (!next) return
    const current = next
    setStatus(current.id, 'visited')
    const leftover = GANPATIS.filter(
      (g) => g.id !== current.id && status[g.id] === 'pending',
    )
    const loc = location
    const upcoming =
      leftover.length === 0
        ? undefined
        : mode === 'nearest' && loc
          ? [...leftover].sort((a, b) => haversineMeters(loc, a) - haversineMeters(loc, b))[0]
          : leftover[0]
    if (upcoming && loc) {
      window.open(
        googleDirUrl(loc, upcoming, recommendMode(haversineMeters(loc, upcoming))),
        '_blank',
        'noopener,noreferrer',
      )
    }
    void refresh()
  }

  function skipCurrent() {
    if (!next) return
    if (!window.confirm(tx(lang, 'skipConfirm'))) return
    setStatus(next.id, 'skipped')
  }

  if (!location) {
    return (
      <article className="page">
        <h1>{tx(lang, 'navGuide')}</h1>
        <p className="lead">{tx(lang, 'noLocationYet')}</p>
        <Link className="btn btn--primary" to="/start">
          {tx(lang, 'setLocation')}
        </Link>
      </article>
    )
  }

  if (isComplete) {
    return (
      <article className="page complete">
        <p className="kicker">{tx(lang, 'mangalMurti')}</p>
        <h1>{tx(lang, 'completeTitle')}</h1>
        <p className="lead">{tx(lang, 'completeBody')}</p>
        <ProgressTrail lang={lang} status={status} />
        <div className="hero__actions">
          <Link className="btn btn--primary" to="/others">
            {tx(lang, 'otherGanpatis')}
          </Link>
          <button type="button" className="btn btn--ghost" onClick={resetProgress}>
            {tx(lang, 'resetProgress')}
          </button>
        </div>
      </article>
    )
  }

  const dest = next as Ganpati
  const fullPts = [location, ...remaining]

  return (
    <article className="page guide">
      <header className="guide-head">
        <p className="kicker">
          {GANPATIS.filter((g) => status[g.id] !== 'pending').length + 1} {tx(lang, 'progressOf')}
        </p>
        <h1>{tx(lang, 'nextStop')}</h1>
        <ProgressTrail lang={lang} status={status} currentId={dest.id} />
      </header>

      {outside ? (
        <p className="banner" role="status">
          {tx(lang, 'outsidePune')}
        </p>
      ) : null}
      {note ? (
        <p className="banner banner--soft" role="status">
          {note}
        </p>
      ) : null}
      {here ? (
        <p className="banner banner--soft" role="status">
          {tx(lang, 'appearAt')} {lang === 'mr' ? here.nameMr : here.nameEn}
        </p>
      ) : null}

      <section className="next-card">
        <GanpatiPhoto ganpati={dest} lang={lang} variant="hero" />
        <p className="next-card__rank">{lang === 'mr' ? dest.rankMr : `Manacha ${dest.rankEn}`}</p>
        <h2>{lang === 'mr' ? dest.nameMr : dest.nameEn}</h2>
        <p className="muted">{lang === 'mr' ? dest.areaMr : dest.areaEn}</p>
        {meters != null ? (
          <dl className="stats">
            <div>
              <dt>{tx(lang, travel === 'walk' ? 'suggestWalk' : 'suggestAuto')}</dt>
              <dd>{formatDistance(meters, lang)}</dd>
            </div>
            <div>
              <dt>{tx(lang, 'walk')}</dt>
              <dd>
                {walkMinutes(meters)}
                {lang === 'mr' ? ' मि' : ' min'}
              </dd>
            </div>
            <div>
              <dt>{tx(lang, 'auto')}</dt>
              <dd>
                {autoMinutes(meters)}
                {lang === 'mr' ? ' मि' : ' min'}
              </dd>
            </div>
          </dl>
        ) : null}
        <p>{locText(dest.howToReach, lang)}</p>
        <div className="btn-row">
          <a className="btn btn--primary" href={googleDirUrl(location, dest, travel)} target="_blank" rel="noreferrer">
            {tx(lang, 'openGoogle')}
          </a>
          <a className="btn btn--ghost" href={appleDirUrl(location, dest, travel)} target="_blank" rel="noreferrer">
            {tx(lang, 'openApple')}
          </a>
        </div>
        <a className="text-link" href={googleMultiStopUrl(fullPts)} target="_blank" rel="noreferrer">
          {tx(lang, 'fullRoute')}
        </a>
        <Link className="text-link" to={`/mandal/${dest.slug}`}>
          {tx(lang, 'readMore')}
        </Link>
      </section>

      <RouteMap user={location} highlightId={dest.id} status={status} />

      <div className="guide-actions">
        <button type="button" className="btn btn--primary btn--block" onClick={completeCurrent}>
          {tx(lang, 'hadDarshan')}
        </button>
        <button type="button" className="btn btn--ghost btn--block" onClick={skipCurrent}>
          {tx(lang, 'skipStop')}
        </button>
      </div>

      <section className="mode-box">
        <div className="segment" role="group">
          <button
            type="button"
            className={mode === 'traditional' ? 'is-on' : ''}
            onClick={() => setMode('traditional')}
            aria-pressed={mode === 'traditional'}
          >
            {tx(lang, 'traditionalMode')}
          </button>
          <button
            type="button"
            className={mode === 'nearest' ? 'is-on' : ''}
            onClick={() => setMode('nearest')}
            aria-pressed={mode === 'nearest'}
          >
            {tx(lang, 'nearestMode')}
          </button>
        </div>
        <p className="muted">
          {mode === 'nearest' ? tx(lang, 'nearestWarning') : tx(lang, 'traditionalHelp')}
        </p>
      </section>

      <div className="btn-row">
        <button type="button" className="btn btn--ghost" onClick={() => void refresh()}>
          {tx(lang, 'refreshLocation')}
        </button>
        <Link className="btn btn--ghost" to="/start">
          {tx(lang, 'changeLocation')}
        </Link>
      </div>
      <p className="muted">
        {tx(lang, 'youAreHere')}: {location.label}
        {location.accuracy
          ? ` · ${tx(lang, 'accuracy')} ~${Math.round(location.accuracy)} m`
          : ''}
      </p>
    </article>
  )
}
