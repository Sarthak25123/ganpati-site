import { OTHER_MANDALS } from '../data/others'
import { tx } from '../i18n/ui'
import { locText, useGuide } from '../state/GuideContext'

export function Others() {
  const { lang } = useGuide()

  return (
    <article className="page">
      <p className="kicker">{tx(lang, 'pageOthers')}</p>
      <h1>{tx(lang, 'otherGanpatis')}</h1>
      <p className="lead">{tx(lang, 'othersLead')}</p>
      <ul className="other-list">
        {OTHER_MANDALS.map((m) => (
          <li key={m.id} className="other-card">
            <p className="badge">{tx(lang, 'notPartOfFive')}</p>
            <h2>{lang === 'mr' ? m.nameMr : m.nameEn}</h2>
            <p className="muted">{lang === 'mr' ? m.areaMr : m.areaEn}</p>
            <p>{locText(m.note, lang)}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}
