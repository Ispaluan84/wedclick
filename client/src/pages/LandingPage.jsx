import Navbar      from '../components/layout/Navbar'
import Footer      from '../components/layout/Footer'
import Hero        from '../components/sections/Hero'
import HowItWorks  from '../components/sections/HowItWorks'
import Features    from '../components/sections/Features'
import Demo        from '../components/sections/Demo'
import Contact from '../components/sections/Contact'
import Pricing from '../components/sections/Pricing'
import FAQ from '../components/sections/FAQ'
import WhatsAppButton from '../components/ui/WhatsAppButton'

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
        <Demo />
        <FAQ />
        <Contact />
        {/* Aquí irán el resto de secciones */}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default LandingPage

