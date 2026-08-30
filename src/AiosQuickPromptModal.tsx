import { useState } from 'react'
import { X, Send, Copy, Sparkles } from 'lucide-react'
import { apiAiosQuickPrompt } from './lib/api'

function AiosQuickPromptModal({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSend = async () => {
    if (!message.trim()) {
      setErrorMsg('Tell AIOS what you need first')
      return
    }
    setErrorMsg(null)
    setLoading(true)

    try {
      const result = await apiAiosQuickPrompt(message.trim())
      if (!result.success || !result.prompt) {
        setErrorMsg(result.error ?? 'Something went wrong')
        setLoading(false)
        return
      }
      setPrompt(result.prompt)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to reach the server')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!prompt) return
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-6">
        {!prompt ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-slate-900 dark:text-white text-lg font-semibold flex items-center gap-2">
                <Sparkles size={18} className="text-purple-400" />
                Ask AIOS
              </h2>
              <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                <X size={20} />
              </button>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">What do you need help creating?</p>

            {errorMsg && (
              <div className="border border-red-600/40 bg-red-600/10 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
                {errorMsg}
              </div>
            )}

            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell AIOS what you need..."
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg px-4 py-3 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none mb-4"
            />

            <button
              type="button"
              disabled={loading}
              onClick={handleSend}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition-all"
            >
              {loading ? 'Thinking...' : 'Send'}
              {!loading && <Send size={16} />}
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-slate-900 dark:text-white text-lg font-semibold">Your Prompt</h2>
              <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                <X size={20} />
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-4 max-h-80 overflow-y-auto">
              <pre className="text-slate-800 dark:text-slate-200 text-sm font-mono whitespace-pre-wrap leading-relaxed">
                {prompt}
              </pre>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
            >
              <Copy size={16} />
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default AiosQuickPromptModal
