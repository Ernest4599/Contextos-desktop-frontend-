import { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { Plus, Check, Clock, Copy, ShieldCheck, Info } from 'lucide-react'

type LocationState = {
  role?: string
  prompt?: string
  assumptions?: string[]
  outputFormat?: string
  elapsedSeconds?: number
}

function PromptReady() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null
  const [copied, setCopied] = useState(false)

  if (!state?.prompt) {
    return <Navigate to="/quick-prompt" replace />
  }

  const generatedText = state.prompt

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex-1 p-6 h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => navigate('/quick-prompt')}
          className="flex items-center gap-2 text-slate-300 text-sm font-medium hover:text-white transition-colors"
        >
          ← Back to Quick Prompt
        </button>
        <button
          type="button"
          onClick={() => navigate('/quick-prompt')}
          className="flex items-center gap-2 border border-slate-700 text-slate-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Plus size={16} />
          New Prompt
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(34,197,94,0.3)]">
            <Check size={36} className="text-white" strokeWidth={3} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Prompt Ready</h1>
          <p className="text-slate-400 mb-5">Your prompt is ready to use with any AI.</p>
          <span className="flex items-center gap-2 border border-slate-700 text-slate-300 text-sm px-4 py-2 rounded-full">
            <Clock size={14} />
            {state.elapsedSeconds ? `Generated in ${state.elapsedSeconds.toFixed(1)} seconds` : 'Generated'}
          </span>
          {state.role && (
            <span className="mt-3 text-slate-500 text-sm">Role: {state.role}</span>
          )}
        </div>

        {state.assumptions && state.assumptions.length > 0 && (
          <div className="border border-yellow-600/30 bg-yellow-600/5 rounded-xl px-5 py-4 mb-6">
            <p className="text-yellow-400 text-sm font-medium mb-2">Assumptions made</p>
            <ul className="flex flex-col gap-1">
              {state.assumptions.map((a, i) => (
                <li key={i} className="text-yellow-400/80 text-sm">• {a}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <p className="text-blue-400 text-sm font-semibold tracking-wide">GENERATED PROMPT</p>
          <span className="flex items-center gap-1.5 text-slate-500 text-sm">
            {generatedText.length.toLocaleString()} characters
            <Info size={14} />
          </span>
        </div>

        <div className="relative border border-slate-800 rounded-2xl p-6">
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 border border-slate-700 rounded-lg p-2 transition-colors"
          >
            <Copy size={16} />
          </button>
          <pre className="text-slate-200 text-sm font-mono whitespace-pre-wrap leading-relaxed pr-10">
            {generatedText}
          </pre>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-4 rounded-xl transition-colors mt-6"
        >
          <Copy size={18} />
          {copied ? 'Copied!' : 'Copy Prompt'}
        </button>

        <div className="flex items-center justify-center gap-2 mt-5 text-slate-500 text-sm">
          <ShieldCheck size={14} />
          <p>Nothing is stored. Everything stays on your device.</p>
        </div>
      </div>
    </div>
  )
}

export default PromptReady
