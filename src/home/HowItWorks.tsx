import { UploadCloud, Sparkles, Rocket } from 'lucide-react'

function StepCard({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="flex-1 min-w-[clamp(140px,20vw,280px)] rounded-2xl border border-slate-800 bg-slate-950/60 p-[clamp(10px,1.6vw,24px)]">
      <div className="flex items-start justify-between mb-[clamp(6px,1vw,16px)]">
        <span className="text-[clamp(8px,0.8vw,13px)] font-bold text-blue-400">{number}</span>
        <div className="h-[clamp(14px,1.6vw,24px)] w-[clamp(14px,1.6vw,24px)] text-slate-500">{icon}</div>
      </div>
      <h3 className="text-[clamp(11px,1.2vw,17px)] font-semibold text-white mb-[clamp(3px,0.5vw,8px)]">{title}</h3>
      <p className="text-[clamp(9px,0.9vw,13px)] leading-relaxed text-slate-500">{description}</p>
    </div>
  )
}

function HowItWorks() {
  return (
    <section className="border-b border-slate-800/60">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[clamp(16px,2.4vw,32px)] px-[clamp(16px,4vw,96px)] py-[clamp(24px,4vw,64px)] md:flex-row md:items-start">
        <div className="w-full md:w-[clamp(200px,24vw,320px)] md:shrink-0">
          <p className="mb-[clamp(4px,0.6vw,10px)] text-[clamp(8px,0.75vw,12px)] font-bold tracking-[0.2em] text-blue-400">
            HOW IT WORKS
          </p>
          <h2 className="text-[clamp(20px,3vw,38px)] font-semibold leading-[1.1] tracking-tight text-white">
            Three steps.
            <br />
            Infinite continuity.
          </h2>
        </div>

        <div className="flex flex-1 flex-col sm:flex-row gap-[clamp(8px,1.4vw,20px)]">
          <StepCard
            number="01"
            title="Capture"
            description="Import or share your conversation from any AI."
            icon={<UploadCloud className="h-full w-full" />}
          />
          <StepCard
            number="02"
            title="Extract"
            description="ContextOS identifies and structures what matters."
            icon={<Sparkles className="h-full w-full" />}
          />
          <StepCard
            number="03"
            title="Continue"
            description="Copy the Context Package and continue anywhere."
            icon={<Rocket className="h-full w-full" />}
          />
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
