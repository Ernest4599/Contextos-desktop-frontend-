import Hero from './home/Hero'
import PhoneMockup from './home/PhoneMockup'
import AiosShowcase from './home/AiosShowcase'
import EveryAI from './home/EveryAI'
import Problem from './home/Problem'
import Solution from './home/Solution'
import HowItWorks from './home/HowItWorks'
import TermsConsentBanner from './TermsConsentBanner'
import FloatingAios from './home/FloatingAios'

function Home() {
  return (
    <div className="bg-cream text-slate-900 dark:bg-slate-900 dark:text-white">
      <Hero />
      <PhoneMockup />
      <AiosShowcase />
      <EveryAI />
      <Problem />
      <Solution />
      <HowItWorks />
      <TermsConsentBanner />
      <FloatingAios />
    </div>
  )
}

export default Home
