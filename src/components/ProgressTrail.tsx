import { Link } from 'react-router-dom'
import { GANPATIS } from '../data/ganpatis'
import { tx } from '../i18n/ui'
import type { GanpatiId, Lang, VisitStatus } from '../types'

type Props = {
  lang: Lang
  status: Record<GanpatiId, VisitStatus>
  currentId?: number
}

export function ProgressTrail({ lang, status, currentId }: Props) {
  return (
    <ol className="trail" aria-label={tx(lang, 'allFive')}>
      {GANPATIS.map((g, i) => {
        const st = status[g.id]
        const isNow = g.id === currentId
        const state = isNow ? 'now' : st
        return (
          <li key={g.id} className={`trail__item trail__item--${state}`}>
            {i > 0 ? <span className="trail__line" aria-hidden="true" /> : null}
            <Link to={`/mandal/${g.slug}`} className="trail__dot">
              <span className="trail__num">{g.id}</span>
              <span className="trail__name">{lang === 'mr' ? g.nameMr : g.nameEn}</span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
