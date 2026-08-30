function PlatformCard({ name, highlighted = false }: { name: string; highlighted?: boolean }) {
  return (
    <div
      className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border sm:h-20 sm:w-20 md:h-[clamp(50px,8vw,125px)] md:w-[clamp(50px,8vw,125px)] ${
        highlighted
          ? 'border-blue-500/60 bg-blue-500/[0.06] shadow-[0_0_30px_rgba(59,130,246,0.18)]'
          : 'border-slate-300 bg-slate-100 dark:border-slate-800 dark:bg-slate-950/60'
      }`}
    >
      {highlighted ? (
        <svg width="34%" height="34%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M75 30 A38 38 0 1 0 75 70" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" fill="none" />
          <rect x="68" y="42" width="10" height="16" rx="5" fill="#60a5fa" />
        </svg>
      ) : null}
      <p className="mt-1 text-[9px] font-semibold text-slate-900 dark:text-white sm:mt-1.5 sm:text-[10px] md:mt-[clamp(4px,0.8vw,10px)] md:text-[clamp(7px,0.85vw,13px)]">
        {name}
      </p>
    </div>
  )
}

function Connector() {
  return (
    <div className="hidden h-px w-[clamp(6px,1.5vw,32px)] shrink-0 bg-gradient-to-r from-blue-500/20 via-blue-500/60 to-blue-500/20 md:block" />
  )
}

function EveryAI() {
  return (
    <section className="border-b border-slate-200 dark:border-slate-800/60">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 md:flex-row md:flex-wrap md:items-center md:gap-[clamp(16px,3vw,48px)] md:px-[clamp(16px,4vw,96px)] md:py-[clamp(20px,3vw,48px)]">
        <div className="w-full md:w-[clamp(160px,20vw,250px)] md:shrink-0">
          <p className="mb-1 text-xs font-bold tracking-[0.2em] text-blue-400 md:mb-[clamp(4px,0.5vw,8px)] md:text-[clamp(7px,0.65vw,10px)]">
            BUILT FOR REAL WORK
          </p>
          <h2 className="text-xl font-semibold leading-tight text-slate-900 dark:text-white md:text-[clamp(15px,1.9vw,24px)]">
            One context.
            <br />
            <span className="text-blue-400">Every AI.</span>
          </h2>
          <p className="mt-1.5 text-sm leading-5 text-slate-600 dark:text-slate-500 md:mt-[clamp(4px,0.6vw,8px)] md:text-[clamp(8px,0.85vw,12px)]">
            Move your context across AI platforms without losing what matters.
          </p>
        </div>

        {/* MOBILE / TABLET: circular orbit layout */}
        <div className="relative mx-auto aspect-square w-64 shrink-0 sm:w-80 md:hidden">
          {/* radial connector lines, behind the cards */}
          <div className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 bg-gradient-to-t from-blue-500/50 to-transparent" />
          <div className="absolute bottom-0 left-1/2 h-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-blue-500/50 to-transparent" />
          <div className="absolute left-0 top-1/2 h-px w-1/2 -translate-y-1/2 bg-gradient-to-l from-blue-500/50 to-transparent" />
          <div className="absolute right-0 top-1/2 h-px w-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500/50 to-transparent" />

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <PlatformCard name="ContextOS" highlighted />
          </div>
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <PlatformCard name="ChatGPT" />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <PlatformCard name="Claude" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <PlatformCard name="Gemini" />
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <PlatformCard name="Perplexity" />
          </div>
        </div>

        {/* DESKTOP: existing row layout, unchanged */}
        <div className="hidden md:flex md:flex-1 md:flex-wrap md:items-center md:justify-center md:gap-[clamp(4px,1vw,16px)]">
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
  )
}

export default EveryAI
