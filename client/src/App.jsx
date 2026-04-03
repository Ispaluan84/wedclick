import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CookieProvider } from './context/CookieContext'
import Analytics from './components/analytics/Analytics'
import CookieBanner from './components/ui/CookieBanner'
import LandingPage from './pages/LandingPage'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import LegalNotice from './pages/LegalNotice'
import Login from './pages/panel/Login'
import Dashboard from './pages/panel/Dashboard'
import Confirmaciones from './pages/panel/Confirmaciones'
import Canciones from './pages/panel/Canciones'
import ComingSoon from './pages/ComingSoon'

function App() {
  return (
    <CookieProvider>
      <Analytics />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ComingSoon />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/aviso-legal" element={<LegalNotice />} />
          <Route path="/panel" element={<Login />} />
          <Route path="/panel/dashboard" element={<Dashboard />} />
          <Route path="/panel/confirmaciones" element={<Confirmaciones />} />
          <Route path="/panel/canciones" element={<Canciones />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <CookieBanner />
    </CookieProvider>
  )
}

export default App