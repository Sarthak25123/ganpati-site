import { Link, Navigate, useParams } from 'react-router-dom'
import { RouteMap } from '../components/RouteMap'
import { GANPATIS, ganpatiBySlug } from '../data/ganpatis'
import {
  formatDistance,
  haversineMeters,
  recommendMode,
} from '../lib/geo'
import { appleDirUrl, googleDirUrl, googlePlaceUrl } from '../lib/maps'
import { tx } from '../i18n/ui'
import { locText, useGuide } from '../state/GuideContext'
import type { GanpatiId } from '../types'

export function Mandal() {
  const { slug } = useParams()
  const { lang, location, status, setStatus } = useGuide()
  const g = slug ? ganpatiBySlug(slug) : undefined
  if (!g) return <Navigate to="/" replace />

  const meters = location ? haversineMeters(location, g) : null
  const travel = meters == null ? 'walk' : recommendMode(meters)
  const prev = GANPATIS[g.id - 2]
  const nxt = GANPATIS[g.id]

  return (
    <article className="page mandal">
      <p className="kicker">{lang === 'mr' ? g.rankMr : `Manacha ${g.rankEn}`}</p>
      <h1>
        {lang === 'mr' ? g.nameMr : g.nameEn}
        <small>{lang === 'mr' ? g.nameEn : g.nameMr}</small>
      </h1>
      <p className="lead">{lang === 'mr' ? g.areaMr : g.areaEn}</p>

      <RouteMap user={location} highlightId={g.id} status={status} />

      <p className="addr">
        <strong>{tx(lang, 'address')}</strong> {g.address}
      </p>
      {meters != null && location ? (
        <p className="muted">
          {formatDistance(meters, lang)} · {tx(lang, travel === 'walk' ? 'suggestWalk' : 'suggestAuto')}
        </p>
      ) : null}

      <div className="btn-row">
        {location ? (
          <>
            <a className="btn btn--primary" href={googleDirUrl(location, g, travel)} target="_blank" rel="noreferrer">
              {tx(lang, 'openGoogle')}
            </a>
            <a className="btn btn--ghost" href={appleDirUrl(location, g, travel)} target="_blank" rel="noreferrer">
              {tx(lang, 'openApple')}
            </a>
          </>
        ) : (
          <a className="btn btn--primary" href={googlePlaceUrl(g)} target="_blank" rel="noreferrer">
            {tx(lang, 'openGoogle')}
          </a>
        )}
      </div>

      <div className="btn-row">
        {status[g.id] === 'pending' ? (
          <button type="button" className="btn btn--ghost" onClick={() => setStatus(g.id as GanpatiId, 'visited')}>
            {tx(lang, 'markVisited')}
          </button>
        ) : (
          <button type="button" className="btn btn--ghost" onClick={() => setStatus(g.id as GanpatiId, 'pending')}>
            {tx(lang, 'markPending')}
          </button>
        )}
        <Link className="btn btn--ghost" to="/guide">
          {tx(lang, 'backGuide')}
        </Link>
      </div>

      <section>
        <h2>{tx(lang, 'yearNote')}</h2>
        <p>{locText(g.yearNote, lang)}</p>
      </section>
      <section>
        <h2>{tx(lang, 'historyTitle')}</h2>
        <p>{locText(g.history, lang)}</p>
      </section>
      <section>
        <h2>{tx(lang, 'whyMaanTitle')}</h2>
        <p>{locText(g.whyMaan, lang)}</p>
      </section>
      <section>
        <h2>{tx(lang, 'timingsTitle')}</h2>
        <p>{locText(g.timings, lang)}</p>
      </section>
      <section>
        <h2>{tx(lang, 'expectTitle')}</h2>
        <p>{locText(g.expect, lang)}</p>
      </section>
      <section>
        <h2>
          {tx(lang, 'reachTitle')}
          {prev ? <small> · {tx(lang, 'fromPrevious')}</small> : null}
        </h2>
        <p>{locText(g.howToReach, lang)}</p>
      </section>
      <section>
        <h2>{tx(lang, 'nearbyTitle')}</h2>
        <p>{locText(g.nearby, lang)}</p>
      </section>
      <section>
        <h2>{tx(lang, 'tipsTitle')}</h2>
        <p>{locText(g.tips, lang)}</p>
      </section>
      <section className="practical">
        <h2>{tx(lang, 'practicalTitle')}</h2>
        <p>{tx(lang, 'practicalBody')}</p>
      </section>

      <nav className="pager">
        {prev ? (
          <Link to={`/mandal/${prev.slug}`}>
            ← {lang === 'mr' ? prev.nameMr : prev.nameEn}
          </Link>
        ) : (
          <span />
        )}
        {nxt ? (
          <Link to={`/mandal/${nxt.slug}`}>
            {lang === 'mr' ? nxt.nameMr : nxt.nameEn} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
