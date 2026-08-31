import { useEffect, useState } from 'react'
import { Sparkles, Link2, Check, MousePointer2, ArrowUp } from 'lucide-react'

type Phase = 'idle' | 'tap' | 'copied'

function PhoneMockup() {
  const [phase, setPhase] = useState<Phase>('idle')

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    if (phase === 'idle') {
      timeoutId = setTimeout(() => setPhase('tap'), 2200)
    } else if (phase === 'tap') {
      timeoutId = setTimeout(() => setPhase('copied'), 450)
    } else if (phase === 'copied') {
      timeoutId = setTimeout(() => setPhase('idle'), 2000)
    }

    return () => clearTimeout(timeoutId)
  }, [phase])

  return (
    <section className="overflow-hidden border-b border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-950/30">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[clamp(20px,3vw,40px)] px-[clamp(16px,4vw,96px)] py-[clamp(32px,5vw,80px)] md:flex-row md:items-center">
        {/* LEFT COPY */}
        <div className="w-full md:w-[clamp(220px,30vw,420px)] md:shrink-0">
          <p className="mb-[clamp(4px,0.6vw,10px)] text-[clamp(8px,0.75vw,12px)] font-bold tracking-[0.2em] text-blue-400">
            SEE IT IN ACTION
          </p>
          <h2 className="text-[clamp(20px,3vw,38px)] font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
            One tap. Your context,
            <br />
            ready to go anywhere.
          </h2>
          <p className="mt-[clamp(6px,0.9vw,16px)] text-[clamp(10px,1vw,15px)] leading-6 text-slate-600 dark:text-slate-400">
            Grab a share link from any AI conversation. ContextOS turns it into a portable Context Package you can drop into your next chat.
          </p>
        </div>

        {/* RIGHT: 3D PHONE MOCKUP */}
        <div className="relative mx-auto w-full max-w-[280px] md:max-w-[300px]" style={{ perspective: '1200px' }}>
          <div
            className="relative rounded-[2.5rem] border-[6px] border-slate-900 dark:border-slate-700 bg-slate-900 dark:bg-slate-800 shadow-[0_35px_80px_-20px_rgba(30,58,138,0.45)] dark:shadow-[0_35px_80px_-20px_rgba(0,0,0,0.8)]"
            style={{
              transform: 'rotateY(-10deg) rotateX(4deg)',
              transformStyle: 'preserve-3d',
              animation: 'floatY 5s ease-in-out infinite',
            }}
          >
            {/* Notch */}
            <div className="absolute left-1/2 top-0 z-10 h-[18px] w-[90px] -translate-x-1/2 rounded-b-xl bg-slate-900 dark:bg-slate-800" />

            {/* Screen */}
            <div className="relative flex aspect-[9/19.5] w-full flex-col overflow-hidden rounded-[2rem] bg-white dark:bg-slate-950 px-3 pb-4 pt-7">
              {/* Chat header */}
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600/10 dark:bg-blue-600/20">
                  <Sparkles size={12} className="text-blue-500 dark:text-blue-400" />
                </div>
                <span className="text-[10px] font-semibold text-slate-900 dark:text-white">AI Conversation</span>
              </div>

              {/* Chat bubbles */}
              <div className="flex flex-1 flex-col gap-2">
                <div className="max-w-[80%] rounded-xl rounded-tl-sm bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 text-[9px] leading-snug text-slate-700 dark:text-slate-300">
                  Let's lock the API design before we move to the frontend.
                </div>
                <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-blue-600 px-2.5 py-1.5 text-[9px] leading-snug text-white">
                  Agreed — REST over GraphQL for v1, keep it simple.
                </div>
                <div className="max-w-[80%] rounded-xl rounded-tl-sm bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 text-[9px] leading-snug text-slate-700 dark:text-slate-300">
                  Noted. I'll draft the endpoint list next.
                </div>
              </div>

              {/* Chat input bar */}
              <div className="mt-3 flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 shadow-sm">
                <span className="flex-1 truncate text-[9px] text-slate-400 dark:text-slate-500">
                  Message ContextOS...
                </span>
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600">
                  <ArrowUp size={11} className="text-white" strokeWidth={2.5} />
                </div>
              </div>

              {/* Copy Link button */}
              <div className="relative mt-3 flex justify-center">
                <div
                  className={`relative flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-[9px] font-semibold text-slate-700 dark:text-white transition-transform duration-150 ${
                    phase === 'tap' ? 'scale-90' : 'scale-100'
                  }`}
                >
                  <Link2 size={10} />
                  Copy Link
                </div>

                {/* Animated cursor */}
                <div
                  className="pointer-events-none absolute transition-all duration-500 ease-out"
                  style={{
                    left: phase === 'idle' ? '85%' : '50%',
                    top: phase === 'idle' ? '-60%' : '40%',
                    opacity: phase === 'copied' ? 0 : 1,
                  }}
                >
                  <MousePointer2
                    size={16}
                    className="text-slate-900 dark:text-white drop-shadow-lg"
                    fill="currentColor"
                  />
                </div>
              </div>

              {/* Copied toast — centered over the whole screen */}
              <div
                className={`pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-green-500 px-4 py-2 text-[10px] font-semibold text-white shadow-2xl transition-all duration-300 ${
                  phase === 'copied' ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}
              >
                <Check size={11} strokeWidth={3} />
                Link copied!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PhoneMockup
