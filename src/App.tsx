import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Festival } from './pages/Festival'
import { Guide } from './pages/Guide'
import { Home } from './pages/Home'
import { Learn } from './pages/Learn'
import { Mandal } from './pages/Mandal'
import { NotFound } from './pages/NotFound'
import { Others } from './pages/Others'
import { Overview } from './pages/Overview'
import { Start } from './pages/Start'
import { GuideProvider } from './state/GuideContext'

export default function App() {
  return (
    <GuideProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<Start />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/mandal/:slug" element={<Mandal />} />
            <Route path="/map" element={<Overview />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/maan" element={<Navigate to="/learn" replace />} />
            <Route path="/festival" element={<Festival />} />
            <Route path="/others" element={<Others />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GuideProvider>
  )
}
