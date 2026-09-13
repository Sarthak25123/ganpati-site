import { NavLink, Outlet } from 'react-router-dom'
import { tx } from '../i18n/ui'
import { useGuide } from '../state/GuideContext'

export function Layout() {
  const { lang, setLang } = useGuide()

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        {tx(lang, 'skipToContent')}
      </a>
      <header className="topbar">
        <NavLink to="/" className="brand">
          <span className="brand__mark" aria-hidden="true">
            म
          </span>
          <span className="brand__text">
            <strong>{tx(lang, 'siteName')}</strong>
            <small>{tx(lang, 'siteTag')}</small>
          </span>
        </NavLink>
        <div className="lang" role="group" aria-label={tx(lang, 'langSwitch')}>
          <button
            type="button"
            className={lang === 'en' ? 'is-on' : ''}
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
          >
            {tx(lang, 'langEn')}
          </button>
          <button
            type="button"
            className={lang === 'mr' ? 'is-on' : ''}
            onClick={() => setLang('mr')}
            aria-pressed={lang === 'mr'}
          >
            {tx(lang, 'langMr')}
          </button>
        </div>
      </header>

      <main id="main" className="main">
        <Outlet />
      </main>

      <footer className="site-foot">
        <p>{tx(lang, 'ganpatiBappa')}</p>
        <p className="site-foot__note">{tx(lang, 'footerDisclaimer')}</p>
      </footer>

      <nav className="tabbar" aria-label="Primary">
        <NavLink to="/" end>
          {tx(lang, 'navHome')}
        </NavLink>
        <NavLink to="/guide">{tx(lang, 'navGuide')}</NavLink>
        <NavLink to="/map">{tx(lang, 'navMap')}</NavLink>
        <NavLink to="/learn">{tx(lang, 'navLearn')}</NavLink>
      </nav>
    </div>
  )
}
