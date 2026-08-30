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
          <path d="M75 30 A38 38 0 1 0 75 70" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" fill="none" />
          <rect x="68" y="42" width="10" height="16" rx="5" fill="#60a5fa" />
        </svg>
      ) : null}
      <p className="mt-[clamp(4px,0.8vw,10px)] text-[clamp(7px,0.85vw,13px)] font-semibold text-white">{name}</p>
    </div>
  )
}

function Connector() {
  return <div className="h-px w-[clamp(6px,1.5vw,32px)] shrink-0 bg-gradient-to-r from-blue-500/20 via-blue-500/60 to-blue-500/20" />
}

function EveryAI() {
  return (
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
  )
}

export default EveryAI
