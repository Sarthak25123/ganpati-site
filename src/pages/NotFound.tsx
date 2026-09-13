import { Link } from 'react-router-dom'
import { tx } from '../i18n/ui'
import { useGuide } from '../state/GuideContext'

export function NotFound() {
  const { lang } = useGuide()
  return (
    <article className="page">
      <h1>{tx(lang, 'notFound')}</h1>
      <Link className="btn btn--primary" to="/">
        {tx(lang, 'goHome')}
      </Link>
    </article>
  )
}
