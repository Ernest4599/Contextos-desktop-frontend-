import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lightbulb, Sparkles, ArrowRight, ShieldCheck, Target, Check, ClipboardList, Lock, FileText } from 'lucide-react'
import { callQuickPrompt } from './lib/api'

function QuickPrompt() {
  const navigate = useNavigate()
  const [overview, setOverview] = useState('')
  const [decisions, setDecisions] = useState('')
  const [task, setTask] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleGenerate = async () => {
    setErrorMsg(null)
    setLoading(true)
    const startedAt = performance.now()

    try {
      const result = await callQuickPrompt(overview, decisions, task)
      const elapsedSeconds = (performance.now() - startedAt) / 1000

      if (!result.success) {
        setErrorMsg(result.error ?? 'Something went wrong')
        setLoading(false)
        return
      }

      navigate('/prompt-ready', {
        state: {
          role: result.role,
          prompt: result.prompt,
          assumptions: result.assumptions,
          outputFormat: result.output_format,
          elapsedSeconds,
        },
      })
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to reach the server')
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-6 p-4 h-dvh overflow-y-auto md:gap-8 md:p-6 md:flex-row">
      {/* Center column */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col gap-3 items-start justify-between mb-2 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold text-white md:text-3xl">Quick Prompt</h1>
          <button
            type="button"
            className="flex items-center gap-2 border border-slate-700 text-slate-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
          >
            <Lightbulb size={16} />
            Examples
          </button>
        </div>
        <p className="text-slate-400 mb-6 md:mb-8">Build a prompt from scratch — no conversation needed.</p>

        <div className="border border-slate-800 rounded-2xl p-4 md:p-6">
          {errorMsg && (
            <div className="border border-red-600/40 bg-red-600/10 text-red-400 text-sm rounded-xl px-5 py-4 mb-6">
              {errorMsg}
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-white font-semibold mb-1">Overview</h3>
            <p className="text-slate-400 text-sm mb-3">Explain the main situation or context.</p>
            <div className="relative">
              <textarea
                rows={4}
                maxLength={2000}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                placeholder="What's the big picture?"
                className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none"
              />
              <span className="absolute bottom-2 right-3 text-slate-500 text-xs">{overview.length}/2000</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-white font-semibold mb-1">
              Decisions <span className="text-slate-500 font-normal">(optional)</span>
            </h3>
            <p className="text-slate-400 text-sm mb-3">What's already been decided or locked in?</p>
            <div className="relative">
              <textarea
                rows={4}
                maxLength={2000}
                value={decisions}
                onChange={(e) => setDecisions(e.target.value)}
                placeholder="What's already locked in?"
                className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none"
              />
              <span className="absolute bottom-2 right-3 text-slate-500 text-xs">{decisions.length}/2000</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-white font-semibold mb-1">Task</h3>
            <p className="text-slate-400 text-sm mb-3">What do you need help with right now?</p>
            <div className="relative">
              <textarea
                rows={4}
                maxLength={2000}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Explain what you want the AI to do..."
                className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none"
              />
              <span className="absolute bottom-2 right-3 text-slate-500 text-xs">{task.length}/2000</span>
            </div>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleGenerate}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl transition-all"
          >
            <Sparkles size={18} />
            {loading ? 'Generating...' : 'Generate Prompt'}
            {!loading && <ArrowRight size={18} />}
          </button>

          <div className="flex items-center justify-center gap-2 mt-4 text-slate-400 text-sm text-center">
            <ShieldCheck size={14} className="text-green-500 shrink-0" />
            <p>Nothing is stored on our side beyond generating this prompt.</p>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="w-full md:w-60 shrink-0 md:ml-auto flex flex-col gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <h3 className="text-white font-semibold mb-4">What you'll get</h3>
          <p className="text-slate-400 text-xs mb-4">ContextOS will build a complete prompt including everything you provide.</p>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center shrink-0">
                <Target size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-slate-200 text-sm font-medium">Your goal and situation</p>
                <p className="text-slate-500 text-xs mt-0.5">Clear context for the AI</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-600/10 flex items-center justify-center shrink-0">
                <Check size={16} className="text-green-500" />
              </div>
              <div>
                <p className="text-slate-200 text-sm font-medium">Important decisions</p>
                <p className="text-slate-500 text-xs mt-0.5">What's already decided</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-600/10 flex items-center justify-center shrink-0">
                <ClipboardList size={16} className="text-yellow-500" />
              </div>
              <div>
                <p className="text-slate-200 text-sm font-medium">Your task</p>
                <p className="text-slate-500 text-xs mt-0.5">What the AI needs to do</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-600/10 flex items-center justify-center shrink-0">
                <Lock size={16} className="text-purple-400" />
              </div>
              <div>
                <p className="text-slate-200 text-sm font-medium">Relevant constraints</p>
                <p className="text-slate-500 text-xs mt-0.5">Boundaries and requirements</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center shrink-0">
                <FileText size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-slate-200 text-sm font-medium">Ready-to-use prompt</p>
                <p className="text-slate-500 text-xs mt-0.5">Structured and effective</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={18} className="text-green-500" />
            <h3 className="text-white font-semibold">Privacy First</h3>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <Check size={14} className="text-green-500 shrink-0" />
              <span className="text-slate-300 text-sm">Processed locally on your device</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-green-500 shrink-0" />
              <span className="text-slate-300 text-sm">Nothing stored on our servers</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-green-500 shrink-0" />
              <span className="text-slate-300 text-sm">No conversations storage</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-green-500 shrink-0" />
              <span className="text-slate-300 text-sm">100% private by design</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={18} className="text-yellow-500" />
            <h3 className="text-white font-semibold">Tips for better prompts</h3>
          </div>

          <ul className="flex flex-col gap-2.5">
            <li className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-slate-600 mt-1">•</span>
              Be specific about your goal
            </li>
            <li className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-slate-600 mt-1">•</span>
              Include important constraints
            </li>
            <li className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-slate-600 mt-1">•</span>
              List what's already decided
            </li>
            <li className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-slate-600 mt-1">•</span>
              Describe the task clearly
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default QuickPrompt
