import { FileText, Share2, CheckCircle2, ClipboardList, Boxes, ArrowRightCircle, MessageSquareText, Copy } from 'lucide-react'

function FeatureChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-[clamp(3px,0.5vw,8px)] rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/50 px-[clamp(4px,0.8vw,12px)] py-[clamp(6px,1vw,14px)]">
      <div className="h-[clamp(11px,1.1vw,16px)] w-[clamp(11px,1.1vw,16px)] text-blue-400">{icon}</div>
      <span className="text-center text-[clamp(6px,0.65vw,10px)] leading-tight text-slate-600 dark:text-slate-400">{label}</span>
    </div>
  )
}

function PackageColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="min-h-[clamp(120px,15vw,235px)] border-b border-r border-slate-200 dark:border-slate-800 p-[clamp(6px,1vw,16px)] last:border-r-0 sm:border-b-0">
      <p className="mb-[clamp(4px,0.6vw,10px)] text-[clamp(6px,0.55vw,8px)] font-bold tracking-[0.14em] text-blue-400">
        {title}
      </p>
      <div className="space-y-[clamp(3px,0.5vw,8px)]">
        {items.map((item, index) =>
          item ? (
            <p
              key={`${item}-${index}`}
              className={
                item === 'GOAL' || item === 'NEXT STEP' || item === 'CONSTRAINTS'
                  ? 'text-[clamp(6px,0.6vw,10px)] font-semibold text-blue-400'
                  : 'text-[clamp(6px,0.6vw,10px)] leading-relaxed text-slate-600 dark:text-slate-400'
              }
            >
              {item}
            </p>
          ) : (
            <div key={`space-${index}`} className="h-[clamp(2px,0.3vw,4px)]" />
          ),
        )}
      </div>
    </div>
  )
}

function Solution() {
  return (
    <section className="border-b border-slate-200 dark:border-slate-800/60">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[clamp(20px,3vw,48px)] px-[clamp(16px,4vw,96px)] py-[clamp(24px,4vw,64px)] md:flex-row md:items-start">
        {/* LEFT COPY */}
        <div className="w-full md:w-[clamp(220px,26vw,380px)] md:shrink-0">
          <p className="mb-[clamp(4px,0.6vw,10px)] text-[clamp(8px,0.75vw,12px)] font-bold tracking-[0.2em] text-blue-400">
            THE SOLUTION
          </p>
          <h2 className="text-[clamp(20px,3vw,38px)] font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
            ContextOS captures
            <br />
            what matters.
          </h2>
          <p className="mt-[clamp(6px,0.9vw,16px)] text-[clamp(10px,1vw,15px)] leading-6 text-slate-600 dark:text-slate-400">
            We extract the signal from the noise and turn it into a portable Context Package.
          </p>

          <div className="mt-[clamp(10px,1.6vw,24px)] flex items-center gap-[clamp(4px,0.6vw,8px)] text-[clamp(10px,1.05vw,15px)] font-medium text-slate-900 dark:text-white">
            <FileText className="h-[clamp(11px,1.1vw,16px)] w-[clamp(11px,1.1vw,16px)] text-blue-400" />
            Context Package
          </div>

          <div className="mt-[clamp(6px,1vw,16px)] grid grid-cols-3 gap-[clamp(4px,0.7vw,10px)]">
            <FeatureChip icon={<Share2 className="h-full w-full" />} label="Decisions" />
            <FeatureChip icon={<CheckCircle2 className="h-full w-full" />} label="Goals" />
            <FeatureChip icon={<ClipboardList className="h-full w-full" />} label="Constraints" />
            <FeatureChip icon={<Boxes className="h-full w-full" />} label="State" />
            <FeatureChip icon={<ArrowRightCircle className="h-full w-full" />} label="Next Steps" />
            <FeatureChip icon={<MessageSquareText className="h-full w-full" />} label="Open Questions" />
          </div>
        </div>

        {/* RIGHT: CONTEXT PACKAGE PREVIEW */}
        <div className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a0f18] p-[clamp(10px,1.6vw,24px)] shadow-2xl">
          <div className="mb-[clamp(8px,1.4vw,20px)] flex items-center justify-between">
            <div className="flex items-center gap-[clamp(4px,0.7vw,10px)]">
              <svg viewBox="0 0 100 100" className="h-[clamp(12px,1.4vw,20px)] w-[clamp(12px,1.4vw,20px)]">
                <path d="M75 30 A38 38 0 1 0 75 70" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" fill="none" />
                <rect x="68" y="42" width="10" height="16" rx="5" fill="#60a5fa" />
              </svg>
              <span className="text-[clamp(10px,1.15vw,16px)] font-semibold text-slate-900 dark:text-white">AI Product Launch</span>
              <span className="rounded-md bg-blue-500/10 px-[clamp(4px,0.6vw,8px)] py-[clamp(2px,0.3vw,4px)] text-[clamp(6px,0.65vw,10px)] text-blue-400">
                Context Package
              </span>
            </div>
            <FileText className="h-[clamp(10px,1.1vw,16px)] w-[clamp(10px,1.1vw,16px)] text-slate-600" />
          </div>

          <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 sm:grid-cols-4">
            <PackageColumn
              title="PROJECT"
              items={['AI Product Launch', '', 'GOAL', 'Build the best AIOS for preserving and moving context between AIs.']}
            />
            <PackageColumn
              title="KEY DECISIONS"
              items={[
                'Target power users first',
                'Privacy-first architecture',
                'Offline processing priority',
                'Multiple AI support',
                'Simple copy & paste output',
              ]}
            />
            <PackageColumn
              title="CURRENT STATE"
              items={[
                'MVP in development',
                'Pre-launch phase',
                'User interviews ongoing',
                '',
                'NEXT STEP',
                'Build Context Package export flow',
              ]}
            />
            <PackageColumn
              title="OPEN QUESTIONS"
              items={[
                'How to handle large conversations?',
                'What metadata matters most?',
                '',
                'CONSTRAINTS',
                'Must work across all major AIs',
                'No vendor lock-in',
                "User owns their data",
              ]}
            />
          </div>

          <div className="mt-[clamp(8px,1.2vw,16px)] flex justify-end">
            <button
              type="button"
              className="flex items-center gap-[clamp(4px,0.6vw,8px)] rounded-lg bg-blue-600 px-[clamp(10px,1.3vw,20px)] py-[clamp(6px,0.9vw,12px)] text-[clamp(9px,0.95vw,13px)] font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Copy Context Package
              <Copy className="h-[clamp(9px,0.9vw,14px)] w-[clamp(9px,0.9vw,14px)]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Solution
