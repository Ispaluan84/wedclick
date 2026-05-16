import SEO          from '../components/SEO'
import Navbar       from '../components/layout/Navbar'
import Footer       from '../components/layout/Footer'
import Hero         from '../components/sections/Hero'
import HowItWorks   from '../components/sections/HowItWorks'
import Features     from '../components/sections/Features'
import DemoPreview        from '../components/sections/DemoPreview'
import Testimonials from '../components/sections/Testimonials'
import Contact      from '../components/sections/Contact'
import Pricing      from '../components/sections/Pricing'
import FAQ          from '../components/sections/FAQ'
import CTAFinal     from '../components/sections/CTAFinal'
import WhatsAppButton from '../components/ui/WhatsAppButton'

function LandingPage() {
  return (
    <>
      <SEO
        titulo="WedClick · Invitaciones de boda digitales y personalizadas"
        descripcion="Invitaciones de boda digitales únicas y personalizadas. Sin plantillas, sin robots. Dos personas que cuidan cada detalle de vuestra invitación."
        url="https://wedclick.es/"
      />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <DemoPreview />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default LandingPage

