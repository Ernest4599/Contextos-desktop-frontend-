import { useNavigate } from 'react-router-dom'
import { Lock, ArrowRight, Shield, EyeOff, Users } from 'lucide-react'
import Logo from './Logo'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <div className="absolute -left-40 top-1/3 w-96 h-96 rounded-full border border-blue-900/30" />
      <div className="absolute -right-40 top-1/3 w-96 h-96 rounded-full border border-blue-900/30" />

      <nav className="relative flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-10 md:py-6">
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span className="text-white font-semibold text-lg">ContextOS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-slate-300 text-sm font-medium">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-3 py-2 rounded-lg transition-colors sm:px-5 sm:py-2.5"
        >
          Get Started Free
          <ArrowRight size={16} />
        </button>
      </nav>

      <div className="relative flex flex-col items-center text-center px-6 pt-16 pb-24 max-w-3xl mx-auto">
        <span className="flex items-center gap-2 border border-blue-600/40 text-blue-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
          <Lock size={14} />
          100% Private. Nothing Stored.
        </span>

        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          Never restart
          <br />
          an AI project
          <br />
          <span className="text-blue-500">again.</span>
        </h1>

        <p className="text-slate-400 text-lg max-w-xl mb-10">
          ContextOS turns any AI conversation into a reusable Context Package so you can continue exactly where you left off — across any AI, anytime.
        </p>

        <button
          type="button"
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors mb-8"
        >
          Get Started Free
          <ArrowRight size={20} />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-slate-500 text-sm">
          <span className="flex items-center gap-2">
            <Shield size={16} />
            Private by design
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-2">
            <EyeOff size={16} />
            Nothing stored
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-2">
            <Users size={16} />
            You own your data
          </span>
        </div>
      </div>
    </div>
  )
}

export default Landing
