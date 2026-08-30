import { useNavigate } from 'react-router-dom'
import { ArrowRight, Play, Shield, WifiOff, Link2, Gem, GitBranch } from 'lucide-react'
import homeHeroImage from './assets/home-hero.jpg'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="border-b border-slate-800/60">
        <div className="mx-auto grid max-w-[1440px] grid-cols-[38%_62%] items-start gap-[clamp(16px,3vw,48px)] px-[clamp(16px,4vw,96px)] pt-[clamp(28px,4.5vw,64px)] pb-[clamp(20px,3vw,56px)]">
          {/* LEFT COPY */}
          <div className="relative z-10 min-w-0 after:pointer-events-none after:absolute after:right-[-30px] after:top-0 after:h-full after:w-[90px] after:bg-gradient-to-r after:from-slate-950/0 after:via-slate-900/60 after:to-transparent">
            <p className="mb-[clamp(6px,0.6vw,12px)] text-[clamp(9px,0.85vw,14px)] font-bold tracking-[0.2em] text-blue-400">
              CONTEXTOS
            </p>

            <h1 className="mb-[clamp(8px,1.2vw,16px)] text-[clamp(24px,4.8vw,64px)] font-bold leading-[1.02] tracking-tight text-white">
              Continue.
              <br />
              <span className="text-blue-500">Don't</span> restart.
            </h1>

            <p className="mb-[clamp(10px,1.6vw,24px)] text-[clamp(12px,1.3vw,20px)] leading-[1.5] text-slate-400">
              The AIOS for your context.
              <br />
              Your work, preserved. Anywhere you go.
            </p>

            <div className="mb-[clamp(10px,2vw,32px)] flex flex-wrap items-center gap-[clamp(4px,0.8vw,12px)]">
              <button
                type="button"
                onClick={() => navigate('/import')}
                className="flex items-center gap-[clamp(3px,0.5vw,8px)] whitespace-nowrap rounded-xl bg-blue-600 px-[clamp(8px,1.6vw,24px)] py-[clamp(5px,0.9vw,14px)] text-[clamp(10px,1.05vw,16px)] font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Get Started
                <ArrowRight className="h-[clamp(9px,1vw,17px)] w-[clamp(9px,1vw,17px)]" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/aios')}
                className="flex items-center gap-[clamp(3px,0.5vw,8px)] whitespace-nowrap rounded-xl border border-slate-700 bg-transparent px-[clamp(12px,2vw,32px)] py-[clamp(5px,0.9vw,14px)] text-[clamp(8px,0.95vw,14px)] font-semibold text-white transition-colors hover:border-slate-600 hover:bg-slate-900"
              >
                Try AIOS
                <Play className="h-[clamp(8px,0.9vw,15px)] w-[clamp(8px,0.9vw,15px)]" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-[clamp(6px,1.2vw,24px)] gap-y-1 text-[clamp(7px,0.7vw,12px)] text-slate-500">
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Shield className="h-[clamp(7px,0.8vw,13px)] w-[clamp(9px,0.8vw,14px)]" />
                Private by design
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <WifiOff className="h-[clamp(7px,0.8vw,13px)] w-[clamp(7px,0.8vw,13px)]" />
                Offline first
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Link2 className="h-[clamp(7px,0.8vw,13px)] w-[clamp(7px,0.8vw,13px)]" />
                You own your context
              </span>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative h-[clamp(100px,30vw,400px)] min-w-0">
            <div className="absolute left-[-60px] top-[calc(clamp(28px,4.5vw,64px)*-1)] z-0 aspect-video w-[110%] overflow-hidden rounded-[clamp(6px,1.2vw,20px)] bg-slate-900 shadow-2xl shadow-black/50">
              <img
                src={homeHeroImage}
                alt="Person working with ContextOS across multiple screens"
                className="h-full w-full object-cover"
              />
            </div>

            {/* AIOS FLOATING CARD */}
            <div className="absolute right-[40px] top-[clamp(2px,0.5vw,10px)] w-[26%] min-w-[90px] rounded-2xl border border-slate-800 bg-slate-950/95 p-[clamp(5px,1.1vw,20px)] shadow-2xl shadow-black/60 backdrop-blur-xl">
              <p className="text-[clamp(9px,1.4vw,20px)] font-bold text-white">AIOS</p>
              <p className="mt-[clamp(1px,0.3vw,4px)] text-[clamp(6px,0.65vw,12px)] leading-[1.4] text-slate-400">
                Operating System
                <br />
                for AI Context
              </p>

              {/* 3D layered diamond graphic */}
              <svg
                viewBox="0 0 240 190"
                className="mx-auto my-[clamp(4px,0.9vw,16px)] h-[clamp(28px,6vw,112px)] w-[clamp(40px,8.5vw,160px)]"
              >
                <defs>
                  <linearGradient id="aiosTop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#1e3a8a" />
                  </linearGradient>
                </defs>
                <polygon
                  points="120,110 220,140 120,170 20,140"
                  fill="#1e2a6b"
                  stroke="#3b5bdb"
                  strokeWidth="1"
                />
                <polygon
                  points="120,80 220,110 120,140 20,110"
                  fill="#2440a8"
                  stroke="#5470e0"
                  strokeWidth="1"
                />
                <polygon
                  points="120,30 220,70 120,110 20,70"
                  fill="url(#aiosTop)"
                  stroke="#93c5fd"
                  strokeWidth="1.5"
                />
                <polygon points="120,55 133,63 120,71 107,63" fill="#bfdbfe" opacity="0.9" />
              </svg>

              <div className="border-t border-slate-800 pt-[clamp(3px,0.7vw,12px)]">
                <div className="space-y-[clamp(2px,0.5vw,10px)]">
                  <div className="flex items-center gap-[clamp(2px,0.4vw,8px)] text-[clamp(6px,0.55vw,11px)] text-blue-400">
                    <Gem className="h-[clamp(6px,0.65vw,13px)] w-[clamp(6px,0.65vw,13px)] shrink-0" />
                    <span className="truncate">ContextOS</span>
                  </div>
                  <div className="flex items-center gap-[clamp(2px,0.4vw,8px)] text-[clamp(6px,0.55vw,11px)] text-slate-500">
                    <Link2 className="h-[clamp(6px,0.65vw,13px)] w-[clamp(6px,0.65vw,13px)] shrink-0" />
                    <span className="truncate">Projects</span>
                  </div>
                  <div className="flex items-center gap-[clamp(2px,0.4vw,8px)] text-[clamp(6px,0.55vw,11px)] text-slate-500">
                    <Gem className="h-[clamp(6px,0.65vw,13px)] w-[clamp(6px,0.65vw,13px)] shrink-0" />
                    <span className="truncate">Memory</span>
                  </div>
                  <div className="flex items-center gap-[clamp(2px,0.4vw,8px)] text-[clamp(6px,0.55vw,11px)] text-slate-500">
                    <GitBranch className="h-[clamp(6px,0.65vw,13px)] w-[clamp(6px,0.65vw,13px)] shrink-0" />
                    <span className="truncate">Workflows</span>
                  </div>
                  <div className="flex items-center gap-[clamp(2px,0.4vw,8px)] text-[clamp(6px,0.55vw,11px)] text-slate-500">
                    <Gem className="h-[clamp(6px,0.65vw,13px)] w-[clamp(6px,0.65vw,13px)] shrink-0" />
                    <span className="truncate">AI Connections</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
