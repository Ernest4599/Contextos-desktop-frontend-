import Hero from './home/Hero'
import PhoneMockup from './home/PhoneMockup'
import EveryAI from './home/EveryAI'
import Problem from './home/Problem'
import Solution from './home/Solution'
import HowItWorks from './home/HowItWorks'

function Home() {
  return (
    <div className="bg-cream text-slate-900 dark:bg-slate-900 dark:text-white">
      <Hero />
      <PhoneMockup />
      <EveryAI />
      <Problem />
      <Solution />
      <HowItWorks />
    </div>
  )
}

export default Home
