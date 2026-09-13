import { Link } from 'react-router-dom'
import { GanpatiPhoto } from '../components/GanpatiPhoto'
import { Motif } from '../components/Motif'
import { GANPATIS } from '../data/ganpatis'
import { tx } from '../i18n/ui'
import { useGuide } from '../state/GuideContext'

export function Home() {
  const { lang, location, next, doneCount } = useGuide()
  const canResume = Boolean(location) || doneCount > 0

  return (
    <article className="page home">
      <header className="hero">
        <p className="kicker">{tx(lang, 'homeKicker')}</p>
        <h1>
          <span className="hero__bless">{tx(lang, 'ganpatiBappa')}</span>
          {tx(lang, 'homeTitle')}
        </h1>
        <Motif />
        <p className="lead">{tx(lang, 'homeLead')}</p>
        <div className="hero__actions">
          <Link className="btn btn--primary" to={canResume ? '/guide' : '/start'}>
            {canResume ? tx(lang, 'resumeDarshan') : tx(lang, 'startDarshan')}
          </Link>
          <Link className="btn btn--ghost" to="/learn">
            {tx(lang, 'howMaanWorks')}
          </Link>
        </div>
        {next && doneCount > 0 && doneCount < 5 ? (
          <p className="resume-note">
            {tx(lang, 'lastLeftOff')}{' '}
            <strong>{lang === 'mr' ? next.nameMr : next.nameEn}</strong>
          </p>
        ) : null}
      </header>

      <ol className="five-list">
        {GANPATIS.map((g) => (
          <li key={g.id}>
            <Link to={`/mandal/${g.slug}`} className="five-card">
              <GanpatiPhoto ganpati={g} lang={lang} variant="card" />
              <span className="five-card__body">
                <span className="five-card__rank">
                  <em>{g.id}</em>
                  {lang === 'mr' ? g.rankMr : `Manacha ${g.rankEn}`}
                </span>
                <strong>{lang === 'mr' ? g.nameMr : g.nameEn}</strong>
                <span>{lang === 'mr' ? g.areaMr : g.areaEn}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <nav className="home-links" aria-label={tx(lang, 'learnMore')}>
        <Link to="/map">{tx(lang, 'overviewMap')}</Link>
        <Link to="/festival">{tx(lang, 'festivalNote')}</Link>
        <Link to="/others">{tx(lang, 'otherGanpatis')}</Link>
      </nav>
      <p className="muted photo-note">{tx(lang, 'photoNote')}</p>
    </article>
  )
}
