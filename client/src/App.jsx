import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CookieProvider }  from './context/CookieContext'
import AdminConstructor    from './pages/admin/AdminConstructor'
import Analytics           from './components/analytics/Analytics'
import CookieBanner        from './components/ui/CookieBanner'
import ComingSoon          from './pages/ComingSoon'
import LandingPage         from './pages/LandingPage'
import Privacy             from './pages/Privacy'
import LegalNotice         from './pages/LegalNotice'
import Checkout            from './pages/Checkout'
import CheckoutSuccess     from './pages/CheckoutSuccess'
import CheckoutCancel      from './pages/CheckoutCancel'
import NotFound            from './pages/NotFound'
import Login               from './pages/panel/Login'
import Dashboard           from './pages/panel/Dashboard'
import DashboardHome       from './pages/panel/DashboardHome'
import Confirmaciones      from './pages/panel/Confirmaciones'
import Canciones           from './pages/panel/Canciones'
import Fotos               from './pages/panel/Fotos'
import AdminLogin          from './pages/admin/AdminLogin'
import AdminDashboard      from './pages/admin/AdminDashboard'
import AdminHome           from './pages/admin/AdminHome'
import AdminOrdenes        from './pages/admin/AdminOrdenes'
import AdminClientes       from './pages/admin/AdminCliente'
import AdminInvitados      from './pages/admin/AdminInvitados' 
import AdminEstadisticas   from './pages/admin/AdminEstadisticas'



function App() {
  return (
    <CookieProvider>
      <Analytics />
      <BrowserRouter>
        <Routes>

          {/* Públicas */}
          <Route path="/"             element={<LandingPage />} />
          <Route path="/privacidad"   element={<Privacy />} />
          <Route path="/aviso-legal"  element={<LegalNotice />} />

          {/* Checkout */}
          <Route path="/checkout/:plan"    element={<Checkout />} />
          <Route path="/checkout/success"  element={<CheckoutSuccess />} />
          <Route path="/checkout/cancel"   element={<CheckoutCancel />} />

          {/* Panel de novios */}
          <Route path="/panel" element={<Login />} />
          <Route path="/panel" element={<Dashboard />}>
            <Route path="dashboard"      element={<DashboardHome />} />
            <Route path="confirmaciones" element={<Confirmaciones />} />
            <Route path="canciones"      element={<Canciones />} />
            <Route path="fotos"          element={<Fotos />} />
          </Route>

          {/* Panel Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="dashboard"    element={<AdminHome />} />
            <Route path="ordenes"      element={<AdminOrdenes />} />
            <Route path="clientes"     element={<AdminClientes />} />
            <Route path="invitados"    element={<AdminInvitados />} />
            <Route path="estadisticas" element={<AdminEstadisticas />} />
            <Route path="constructor"  element={<AdminConstructor />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
      <CookieBanner />
    </CookieProvider>
  )
}

export default App