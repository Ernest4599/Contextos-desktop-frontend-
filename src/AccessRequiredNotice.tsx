import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, LogIn, Key, ChevronDown, ShieldCheck, Sparkles } from 'lucide-react'

function AccessRequiredNotice({ message }: { message?: string }) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border border-blue-600/30 bg-blue-600/5 rounded-2xl p-5">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0">
          <Lock size={16} className="text-blue-500 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <p className="text-slate-900 dark:text-white text-sm font-semibold">
            Get a license key or sign in to continue
          </p>
          {message && (
            <p className="text-slate-500 text-xs mt-0.5">{message}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <button
              type="button"
              onClick={() => navigate('/settings/upgrade')}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
            >
              <Key size={13} />
              Get a License
            </button>
            <button
              type="button"
              onClick={() => navigate('/account')}
              className="flex items-center gap-1.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
            >
              <LogIn size={13} />
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-medium hover:text-blue-500 dark:hover:text-blue-300 transition-colors ml-auto"
            >
              Learn more
              <ChevronDown size={13} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {expanded && (
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-blue-600/20">
              <div className="flex items-start gap-2.5">
                <ShieldCheck size={15} className="text-green-500 mt-0.5 shrink-0" />
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  <span className="text-slate-900 dark:text-white font-medium">With a license key</span> — purchase Pro and use Import or Quick Prompt without an account. ContextOS never stores anything about you; your raw conversation is automatically deleted after processing.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Sparkles size={15} className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  <span className="text-slate-900 dark:text-white font-medium">With an account</span> — sign in to unlock everything, including AIOS and Projects, synced across your devices.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccessRequiredNotice
