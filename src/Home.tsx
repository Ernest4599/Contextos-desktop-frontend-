import Hero from './home/Hero'
import EveryAI from './home/EveryAI'
import Problem from './home/Problem'
import Solution from './home/Solution'

function Home() {
  return (
    <div className="bg-slate-900 text-white">
      <Hero />
      <EveryAI />
      <Problem />
      <Solution />
    </div>
  )
}

export default Home
