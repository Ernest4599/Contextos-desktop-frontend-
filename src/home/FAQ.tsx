import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    question: 'Is ContextOS actually private?',
    answer:
      "Yes. Nothing is stored on our servers by default. Raw conversations are processed and then deleted immediately. AIOS memories, if you create an account, are encrypted at rest.",
  },
  {
    question: 'Do I need an account?',
    answer:
      "No. A license key alone unlocks Import and Quick Prompt. An account is only needed for AIOS personalization and Projects, since those require remembering things about you.",
  },
  {
    question: "What's the difference between a license and an account?",
    answer:
      "A license gives you standalone access with zero stored memory — nothing to remember, nothing to leak. An account lets AIOS learn your preferences over time to personalize every prompt.",
  },
  {
    question: 'Which AI tools does ContextOS work with?',
    answer:
      "Any of them. ChatGPT, Claude, Gemini, Perplexity, and more — Context Packages are plain text you paste anywhere.",
  },
  {
    question: 'What is a Context Package?',
    answer:
      "A structured extract of your conversation: decisions, goals, constraints, current state, next steps, and open questions — the thinking behind your work, ready to hand to a new AI session.",
  },
  {
    question: 'What is AIOS?',
    answer:
      "Your AI identity layer. It learns your goals, preferences, and working style, then personalizes every prompt you build with it.",
  },
  {
    question: 'Is it free?',
    answer:
      "Yes, there's a free tier. Paid plans unlock more capability and usage.",
  },
]

function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-[clamp(12px,1.8vw,20px)] text-left"
      >
        <span className="text-[clamp(12px,1.15vw,16px)] font-medium text-slate-900 dark:text-white">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="text-[clamp(11px,1vw,14px)] leading-relaxed text-slate-600 dark:text-slate-400 pb-[clamp(12px,1.8vw,20px)] pr-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="border-b border-slate-200 dark:border-slate-800/60">
      <div className="mx-auto max-w-[900px] px-[clamp(16px,4vw,96px)] py-[clamp(24px,4vw,64px)]">
        <div className="text-center mb-[clamp(20px,3vw,40px)]">
          <p className="mb-[clamp(4px,0.6vw,10px)] text-[clamp(8px,0.75vw,12px)] font-bold tracking-[0.2em] text-blue-400">
            FAQ
          </p>
          <h2 className="text-[clamp(20px,3vw,38px)] font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
            Frequently asked questions
          </h2>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
