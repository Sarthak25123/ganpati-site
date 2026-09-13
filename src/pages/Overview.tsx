import { Link } from 'react-router-dom'
import { ProgressTrail } from '../components/ProgressTrail'
import { RouteMap } from '../components/RouteMap'
import { GANPATIS } from '../data/ganpatis'
import { formatDistance, haversineMeters } from '../lib/geo'
import { googleMultiStopUrl } from '../lib/maps'
import { tx } from '../i18n/ui'
import { useGuide } from '../state/GuideContext'

export function Overview() {
  const { lang, location, status, remaining } = useGuide()
  const legs = GANPATIS.slice(1).map((g, i) => {
    const from = GANPATIS[i]
    return {
      from,
      to: g,
      meters: haversineMeters(from, g),
    }
  })
  const routePts = location ? [location, ...remaining] : GANPATIS

  return (
    <article className="page">
      <p className="kicker">{tx(lang, 'overviewMap')}</p>
      <h1>{tx(lang, 'pageMap')}</h1>
      <p className="lead">{tx(lang, 'allFive')}</p>
      <ProgressTrail lang={lang} status={status} />
      <RouteMap user={location} status={status} />
      <p>
        <a className="btn btn--primary" href={googleMultiStopUrl(routePts)} target="_blank" rel="noreferrer">
          {tx(lang, 'fullRoute')}
        </a>
      </p>
      <ol className="leg-list">
        {legs.map((leg) => (
          <li key={leg.to.id}>
            <span>
              {lang === 'mr' ? leg.from.nameMr : leg.from.nameEn} →{' '}
              {lang === 'mr' ? leg.to.nameMr : leg.to.nameEn}
            </span>
            <strong>{formatDistance(leg.meters, lang)}</strong>
          </li>
        ))}
      </ol>
      <ul className="plain-links">
        {GANPATIS.map((g) => (
          <li key={g.id}>
            <Link to={`/mandal/${g.slug}`}>
              {g.id}. {lang === 'mr' ? g.nameMr : g.nameEn}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
