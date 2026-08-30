import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Play,
  Shield,
  WifiOff,
  Link2,
  Gem,
  GitBranch,
  MessageCircle,
  Sparkles,
  Plus,
  Globe,
  Mic,
  Send,
} from 'lucide-react'
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

      {/* ============================================================
          ONE CONTEXT / EVERY AI
      ============================================================ */}
      <section className="border-b border-slate-800/60">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-[clamp(16px,3vw,48px)] px-[clamp(16px,4vw,96px)] py-[clamp(20px,3vw,48px)]">
          <div className="w-[clamp(160px,20vw,250px)] shrink-0">
            <p className="mb-[clamp(4px,0.5vw,8px)] text-[clamp(7px,0.65vw,10px)] font-bold tracking-[0.2em] text-blue-400">
              BUILT FOR REAL WORK
            </p>
            <h2 className="text-[clamp(15px,1.9vw,24px)] font-semibold leading-tight text-white">
              One context.
              <br />
              <span className="text-blue-400">Every AI.</span>
            </h2>
            <p className="mt-[clamp(4px,0.6vw,8px)] text-[clamp(8px,0.85vw,12px)] leading-5 text-slate-500">
              Move your context across AI platforms without losing what matters.
            </p>
          </div>

          <div className="flex flex-1 items-center justify-center gap-[clamp(4px,1vw,16px)]">
            <PlatformCard name="ChatGPT" />
            <Connector />
            <PlatformCard name="Claude" />
            <Connector />
            <PlatformCard name="ContextOS" highlighted />
            <Connector />
            <PlatformCard name="Gemini" />
            <Connector />
            <PlatformCard name="Perplexity" />
          </div>
        </div>
      </section>

      {/* ============================================================
          THE PROBLEM
      ============================================================ */}
      <section className="border-b border-slate-800/60">
        <div className="mx-auto max-w-[1440px] px-[clamp(16px,4vw,96px)] py-[clamp(24px,4vw,64px)]">
          <div className="mb-[clamp(16px,3vw,40px)] max-w-2xl">
            <p className="mb-[clamp(4px,0.6vw,10px)] text-[clamp(8px,0.75vw,12px)] font-bold tracking-[0.2em] text-blue-400">
              THE PROBLEM
            </p>
            <h2 className="text-[clamp(22px,3.2vw,42px)] font-semibold leading-[1.08] tracking-tight text-white">
              You've already done
              <br />
              the hard part.
            </h2>
            <p className="mt-[clamp(6px,0.9vw,16px)] text-[clamp(11px,1.05vw,16px)] leading-6 text-slate-400">
              Hours of research, decisions and iterations—gone the moment you start a new chat.
            </p>
            <a
              href="#"
              className="mt-[clamp(6px,0.9vw,16px)] inline-block text-[clamp(10px,1vw,15px)] font-medium text-blue-400 hover:text-blue-300"
            >
              Why explain everything again? →
            </a>
          </div>

          <div className="flex items-center justify-center gap-[clamp(8px,2vw,32px)]">
            <ConversationPanel />
            <div className="flex h-[clamp(24px,4vw,48px)] w-[clamp(24px,4vw,48px)] shrink-0 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-900/40">
              <ArrowRight className="h-[clamp(12px,2vw,20px)] w-[clamp(12px,2vw,20px)] text-white" />
            </div>
            <NewChatPanel />
          </div>
        </div>
      </section>
    </div>
  )
}

function PlatformCard({ name, highlighted = false }: { name: string; highlighted?: boolean }) {
  return (
    <div
      className={`flex h-[clamp(50px,8vw,125px)] w-[clamp(50px,8vw,125px)] shrink-0 flex-col items-center justify-center rounded-2xl border ${
        highlighted
          ? 'border-blue-500/60 bg-blue-500/[0.06] shadow-[0_0_30px_rgba(59,130,246,0.18)]'
          : 'border-slate-800 bg-slate-950/60'
      }`}
    >
      {highlighted ? (
        <svg width="34%" height="34%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M75 30 A38 38 0 1 0 75 70"
            stroke="#3b82f6"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
          <rect x="68" y="42" width="10" height="16" rx="5" fill="#60a5fa" />
        </svg>
      ) : null}
      <p className="mt-[clamp(4px,0.8vw,10px)] text-[clamp(7px,0.85vw,13px)] font-semibold text-white">
        {name}
      </p>
    </div>
  )
}

function Connector() {
  return (
    <div className="h-px w-[clamp(6px,1.5vw,32px)] shrink-0 bg-gradient-to-r from-blue-500/20 via-blue-500/60 to-blue-500/20" />
  )
}

function ConversationPanel() {
  const messages = [
    { author: 'You', text: "Let's rethink the positioning for our product..." },
    { author: 'AI', text: "Based on everything we've discussed, here's a new angle..." },
    { author: 'You', text: 'Actually, I think we should focus more on this problem...' },
    { author: 'AI', text: "Good call. Here's how that changes our approach..." },
  ]
  return (
    <div className="w-[clamp(140px,26vw,340px)] rounded-2xl border border-slate-800 bg-[#050b13] p-[clamp(8px,1.4vw,20px)] shadow-xl">
      <div className="mb-[clamp(6px,1vw,16px)] flex items-center justify-between">
        <span className="text-[clamp(9px,1vw,13px)] font-medium text-white">Old Conversation</span>
        <span className="rounded-md bg-slate-800 px-[clamp(4px,0.6vw,8px)] py-[clamp(2px,0.3vw,4px)] text-[clamp(6px,0.6vw,9px)] text-slate-400">
          847 messages
        </span>
      </div>
      <div className="space-y-[clamp(4px,0.8vw,12px)]">
        {messages.map((m, i) => (
          <div key={i} className="flex items-start gap-[clamp(3px,0.6vw,8px)]">
            <div
              className={`flex h-[clamp(12px,1.6vw,22px)] w-[clamp(12px,1.6vw,22px)] shrink-0 items-center justify-center rounded-full ${
                m.author === 'You' ? 'bg-emerald-600/30 text-emerald-400' : 'bg-blue-600/30 text-blue-400'
              }`}
            >
              {m.author === 'You' ? (
                <MessageCircle className="h-[clamp(6px,0.8vw,11px)] w-[clamp(6px,0.8vw,11px)]" />
              ) : (
                <Sparkles className="h-[clamp(6px,0.8vw,11px)] w-[clamp(6px,0.8vw,11px)]" />
              )}
            </div>
            <div className="flex-1 rounded-lg border border-slate-800 bg-slate-900/50 p-[clamp(5px,0.8vw,10px)]">
              <p className="mb-[clamp(1px,0.15vw,3px)] text-[clamp(6px,0.6vw,9px)] text-slate-500">{m.author}</p>
              <p className="text-[clamp(7px,0.75vw,11px)] leading-snug text-slate-300">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NewChatPanel() {
  return (
    <div className="relative w-[clamp(140px,26vw,340px)] rounded-2xl border border-slate-800 bg-[#050b13] p-[clamp(8px,1.4vw,20px)] shadow-xl">
      <div className="mb-[clamp(6px,1vw,16px)] flex items-center justify-between">
        <span className="text-[clamp(9px,1vw,13px)] font-medium text-white">New Chat</span>
        <span className="rounded-md bg-slate-800 px-[clamp(4px,0.6vw,8px)] py-[clamp(2px,0.3vw,4px)] text-[clamp(6px,0.6vw,9px)] text-slate-400">
          0 messages
        </span>
      </div>
      <div className="flex h-[clamp(70px,10vw,140px)] items-center justify-center text-center text-[clamp(8px,0.85vw,13px)] text-slate-600">
        How can I help you today?
      </div>
      <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-[clamp(6px,0.9vw,14px)] py-[clamp(5px,0.7vw,10px)] text-slate-600">
        <div className="flex items-center gap-[clamp(4px,0.8vw,12px)]">
          <Plus className="h-[clamp(9px,0.9vw,15px)] w-[clamp(9px,0.9vw,15px)]" />
          <Globe className="h-[clamp(9px,0.9vw,15px)] w-[clamp(9px,0.9vw,15px)]" />
        </div>
        <div className="flex items-center gap-[clamp(4px,0.8vw,12px)]">
          <Mic className="h-[clamp(9px,0.9vw,15px)] w-[clamp(9px,0.9vw,15px)]" />
          <Send className="h-[clamp(9px,0.9vw,15px)] w-[clamp(9px,0.9vw,15px)]" />
        </div>
      </div>
    </div>
  )
}

export default Home
