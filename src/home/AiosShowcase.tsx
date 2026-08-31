import { useEffect, useState } from 'react'
import { Sparkles, User, Sliders, Target, Heart, BookOpen, PenLine } from 'lucide-react'

const EXAMPLE_PROMPTS = [
  'I need a prompt for content ideas',
  'Prompt for an essay on climate policy',
  'Prompt for a cold email to a potential client',
  'Prompt to plan a study schedule for my exams',
  'Prompt for a product description for my new app',
  'Prompt to summarize a research paper',
  'Prompt for a workout plan that fits my schedule',
  'Prompt to help me prepare for a job interview',
  'Prompt for a birthday message for my best friend',
  'Prompt to outline a business plan for my side project',
  'Prompt for social media captions for my launch',
  'Prompt to help me debug a piece of code',
]

function PromptCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % EXAMPLE_PROMPTS.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-blue-400" />
        <h3 className="text-slate-900 dark:text-white font-semibold">Ask AIOS anything</h3>
      </div>

      <div className="relative h-14 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 flex items-center">
        <p key={index} className="text-slate-700 dark:text-slate-300 text-sm animate-slide-up-fade">
          {EXAMPLE_PROMPTS[index]}
        </p>
      </div>

      <div className="flex gap-1 mt-4">
        {EXAMPLE_PROMPTS.map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i === index ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function PhoneMockup() {
  const categories = [
    { label: 'Personality', icon: User },
    { label: 'Preferences', icon: Sliders },
    { label: 'Goals', icon: Target },
    { label: 'Interests', icon: Heart },
    { label: 'Knowledge', icon: BookOpen },
    { label: 'Writing', icon: PenLine },
  ]

  return (
    <div className="[perspective:1400px]">
      <div
        style={{ animation: 'floatY 4s ease-in-out infinite' }}
        className="w-[220px] sm:w-[240px] mx-auto rounded-[36px] border-4 border-slate-800 bg-slate-950 p-3 shadow-2xl shadow-black/40 [transform:rotateY(-14deg)_rotateX(4deg)] transition-transform duration-500 hover:[transform:rotateY(-6deg)_rotateX(2deg)]"
      >
        <div className="rounded-[24px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="h-6 flex items-center justify-center">
            <div className="w-16 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>

          <div className="px-3 pb-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-slate-900 dark:text-white text-xs font-semibold">AIOS</span>
            </div>

            <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-2 mb-3">
              <p className="text-slate-400 dark:text-slate-500 text-[10px]">Tell AIOS what you need...</p>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {categories.map(({ label, icon: Icon }) => (
                <div key={label} className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-1.5">
                  <Icon size={10} className="text-blue-400 mb-1" />
                  <p className="text-slate-500 dark:text-slate-400 text-[8px]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AiosShowcase() {
  return (
    <section className="border-b border-slate-200 dark:border-slate-800/60">
      <div className="mx-auto flex max-w-[1440px] flex-col md:flex-row items-center gap-10 px-[clamp(16px,4vw,96px)] py-[clamp(24px,4vw,64px)]">
        <div className="shrink-0">
          <PhoneMockup />
        </div>

        <div className="flex-1 w-full max-w-md">
          <p className="mb-2 text-[clamp(8px,0.75vw,12px)] font-bold tracking-[0.2em] text-blue-400">
            YOUR AI IDENTITY
          </p>
          <h2 className="text-[clamp(22px,3vw,38px)] font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white mb-3">
            One AIOS.
            <br />
            Endless prompts.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-6 mb-6">
            AIOS learns what matters about you, then personalizes any prompt you ask it to build — for anything you're working on.
          </p>

          <PromptCarousel />
        </div>
      </div>
    </section>
  )
}

export default AiosShowcase
