import { Contact } from '@/components/landing/contact'
import { Faq } from '@/components/landing/faq'
import { Features } from '@/components/landing/features'
import { Footer } from '@/components/landing/footer'
import { GrainOverlay } from '@/components/landing/grain-overlay'
import { Hero } from '@/components/landing/hero'
import { HeroMarquee } from '@/components/landing/hero-marquee'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Industries } from '@/components/landing/industries'
import { LoadingScreen } from '@/components/landing/loading-screen'
import { Navbar } from '@/components/landing/navbar'
import { Pricing } from '@/components/landing/pricing'
import { ScrollProgress } from '@/components/landing/scroll-progress'
import { Stats } from '@/components/landing/stats'
import { Testimonials } from '@/components/landing/testimonials'

export default function Page() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <GrainOverlay />
      <Navbar />
      <main className="relative overflow-x-hidden">
        <Hero />
        <HeroMarquee />
        <Features />
        <HowItWorks />
        <Industries />
        <Stats />
        <Testimonials />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
