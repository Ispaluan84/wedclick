import { lazy, Suspense }  from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CookieProvider }  from './context/CookieContext'
import Analytics           from './components/analytics/Analytics'
import CookieBanner        from './components/ui/CookieBanner'

// Públicas — críticas, se cargan rápido
import LandingPage         from './pages/LandingPage'

// El resto en lazy
const Privacy              = lazy(() => import('./pages/Privacy'))
const LegalNotice          = lazy(() => import('./pages/LegalNotice'))
const NotFound             = lazy(() => import('./pages/NotFound'))

// Checkout
const Checkout             = lazy(() => import('./pages/Checkout'))
const CheckoutSuccess      = lazy(() => import('./pages/CheckoutSuccess'))
const CheckoutCancel       = lazy(() => import('./pages/CheckoutCancel'))

// Panel novios
const Login                = lazy(() => import('./pages/panel/Login'))
const Dashboard            = lazy(() => import('./pages/panel/Dashboard'))
const DashboardHome        = lazy(() => import('./pages/panel/DashboardHome'))
const Confirmaciones       = lazy(() => import('./pages/panel/Confirmaciones'))
const Canciones            = lazy(() => import('./pages/panel/Canciones'))
const Fotos                = lazy(() => import('./pages/panel/Fotos'))

// Panel admin
const AdminLogin           = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard       = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminHome            = lazy(() => import('./pages/admin/AdminHome'))
const AdminOrdenes         = lazy(() => import('./pages/admin/AdminOrdenes'))
const AdminClientes        = lazy(() => import('./pages/admin/AdminCliente'))
const AdminInvitados       = lazy(() => import('./pages/admin/AdminInvitados'))
const AdminEstadisticas    = lazy(() => import('./pages/admin/AdminEstadisticas'))
const AdminConstructor     = lazy(() => import('./pages/admin/AdminConstructor'))

function App() {
  return (
    <CookieProvider>
      <Analytics />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>

            {/* Públicas */}
            <Route path="/"            element={<LandingPage />} />
            <Route path="/privacidad"  element={<Privacy />} />
            <Route path="/aviso-legal" element={<LegalNotice />} />

            {/* Checkout */}
            <Route path="/checkout/:plan"   element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/cancel"  element={<CheckoutCancel />} />

            {/* Panel de novios */}
            <Route path="/panel"   element={<Login />} />
            <Route path="/panel/*" element={<Dashboard />}>
              <Route path="dashboard"      element={<DashboardHome />} />
              <Route path="confirmaciones" element={<Confirmaciones />} />
              <Route path="canciones"      element={<Canciones />} />
              <Route path="fotos"          element={<Fotos />} />
            </Route>

            {/* Panel Admin */}
            <Route path="/admin"   element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminDashboard />}>
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
        </Suspense>
      </BrowserRouter>
      <CookieBanner />
    </CookieProvider>
  )
}

export default App