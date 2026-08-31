import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { TERMS_TEXT } from './legal/termsText'

function renderTerms(text: string) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (trimmed === '---') {
      elements.push(<hr key={key++} className="my-6 border-slate-200 dark:border-slate-800" />)
    } else if (/^\d+\.\s+[A-Z0-9 ,&'\-]+$/.test(trimmed)) {
      elements.push(
        <h2 key={key++} className="text-lg font-semibold text-slate-900 dark:text-white mt-8 mb-2">
          {trimmed}
        </h2>
      )
    } else if (/^\d+\.\d+\s+[A-Za-z]/.test(trimmed)) {
      elements.push(
        <h3 key={key++} className="text-base font-semibold text-slate-900 dark:text-white mt-4 mb-1">
          {trimmed}
        </h3>
      )
    } else {
      elements.push(
        <p key={key++} className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-3">
          {trimmed}
        </p>
      )
    }
  }

  return elements
}

function TermsPage() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 h-dvh overflow-y-auto bg-cream dark:bg-slate-900">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div>{renderTerms(TERMS_TEXT)}</div>
      </div>
    </div>
  )
}

export default TermsPage
