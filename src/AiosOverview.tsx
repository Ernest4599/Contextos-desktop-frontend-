import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles, MessageSquareText, User, Sliders, Target, Heart,
  BookOpen, PenLine, Info, Layers, ArrowRight,
} from 'lucide-react'
import { aiosTell, getAiosOverview, type AiosOverview as AiosOverviewData } from './lib/api'
import AiosQuickPromptModal from './AiosQuickPromptModal'

const CATEGORY_META: Record<string, { label: string; icon: typeof User }> = {
  personality: { label: 'Personality', icon: User },
  preference: { label: 'Preferences', icon: Sliders },
  goal: { label: 'Goals', icon: Target },
  interest: { label: 'Interests', icon: Heart },
  knowledge: { label: 'Knowledge', icon: BookOpen },
  writing_style: { label: 'Writing Style', icon: PenLine },
  important_fact: { label: 'Important Facts', icon: Info },
  context: { label: 'Context', icon: Layers },
}

const CATEGORY_ORDER = Object.keys(CATEGORY_META)

function formatRelativeTime(iso: string | null | undefined): string {
  if (!iso) return ''
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

function strengthColor(label: string | undefined): string {
  if (label === 'Strong') return 'text-green-400'
  if (label === 'Growing') return 'text-yellow-400'
  return 'text-slate-400'
}

function strengthDescription(label: string | undefined): string {
  if (label === 'Strong') return 'AIOS has a strong understanding of you.'
  if (label === 'Growing') return 'AIOS is starting to understand you. Keep adding to build it out.'
  return "AIOS doesn't know much about you yet. Tell it more."
}

function AiosOverview() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [overview, setOverview] = useState<AiosOverviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [showQuickPromptModal, setShowQuickPromptModal] = useState(false)

  async function loadOverview() {
    setLoading(true)
    setLoadError(null)
    const result = await getAiosOverview()
    if (result.success) {
      setOverview(result)
    } else {
      setLoadError(result.error || 'Failed to load AIOS overview')
    }
    setLoading(false)
  }

  useEffect(() => {
    loadOverview()
  }, [])

  async function handleAdd() {
    if (!input.trim() || submitting) return
    setSubmitting(true)
    setSubmitError(null)
    const result = await aiosTell(input.trim())
    if (result.success) {
      setInput('')
      await loadOverview()
    } else {
      setSubmitError(result.error || 'Failed to add to AIOS')
    }
    setSubmitting(false)
  }

  const categories = overview?.categories || {}
  const recent = overview?.recent_memories || []
  const categoryCount = Object.keys(categories).length
  const strength = overview?.identity_strength

  return (
    <div className="flex-1 p-4 pb-24 overflow-y-auto md:p-8 md:pb-8">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="text-purple-400" size={24} />
        <h1 className="text-2xl font-semibold text-white">AIOS</h1>
      </div>
      <p className="text-slate-400 mb-6">Your AI identity layer. AIOS remembers what matters about you.</p>

      <div className="flex flex-col gap-6 items-stretch md:flex-row md:items-start">
        <div className="flex-1 min-w-0">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6 md:p-5">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquareText size={18} className="text-purple-400" />
              <h2 className="text-white font-medium">Tell AIOS something it should know</h2>
            </div>
            <p className="text-slate-500 text-sm mb-3">
              Add thoughts, notes, preferences, experiences, or anything that helps AI understand you better.
            </p>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 2000))}
              placeholder="I prefer concise technical explanations..."
              rows={4}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 placeholder:text-slate-600 resize-none focus:outline-none focus:border-blue-600"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
              <span className="text-slate-600 text-xs">{input.length} / 2000</span>
              <button
                type="button"
                onClick={handleAdd}
                disabled={!input.trim() || submitting}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                <Sparkles size={16} />
                {submitting ? 'Adding...' : 'Add to AIOS'}
              </button>
            </div>
            {submitError && <p className="text-red-400 text-xs mt-2">{submitError}</p>}
          </div>

          {loading && <p className="text-slate-500 text-sm">Loading your AI identity...</p>}
          {loadError && <p className="text-red-400 text-sm">{loadError}</p>}

          {!loading && !loadError && (
            <>
              <div className="flex flex-col gap-1 justify-between mb-4 sm:flex-row sm:items-center sm:gap-0">
                <div>
                  <h2 className="text-white font-medium">Your AI Identity</h2>
                  <p className="text-slate-500 text-sm">Structured from everything you've shared with AIOS.</p>
                </div>
                <p className="text-slate-500 text-sm">{overview?.total_memories ?? 0} total memories</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CATEGORY_ORDER.map((key) => {
                  const { label, icon: Icon } = CATEGORY_META[key]
                  const count = categories[key] || 0
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => navigate(`/aios/memories?category=${key}`)}
                      className="text-left bg-slate-950 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors"
                    >
                      <Icon size={18} className="text-blue-400 mb-2" />
                      <p className="text-white text-sm font-medium">{label}</p>
                      <p className="text-slate-500 text-xs mt-1">{count} item{count === 1 ? '' : 's'}</p>
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>

        {!loading && !loadError && (
          <div className="w-full md:w-80 shrink-0 flex flex-col gap-6">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:p-5">
              <h2 className="text-white font-medium mb-4">AIOS Summary</h2>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Memories</span>
                  <span className="text-white font-medium">{overview?.total_memories ?? 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Categories</span>
                  <span className="text-white font-medium">{categoryCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Last Updated</span>
                  <span className="text-white font-medium">{formatRelativeTime(overview?.last_updated) || '—'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Conversations Used</span>
                  <span className="text-white font-medium">{overview?.conversations_used ?? 0}</span>
                </div>
              </div>
            </div>

            {strength && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:p-5">
                <h2 className="text-white font-medium mb-4">Identity Strength</h2>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{strength.score}%</div>
                  <p className={`text-sm font-medium mt-1 ${strengthColor(strength.label)}`}>{strength.label}</p>
                  <p className="text-slate-500 text-xs mt-3">{strengthDescription(strength.label)}</p>
                </div>
              </div>
            )}

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white font-medium">Recent Memories</h2>
                <button
                  type="button"
                  onClick={() => navigate('/aios/memories')}
                  className="text-blue-400 hover:text-blue-300 text-xs font-medium"
                >
                  View all
                </button>
              </div>
              {recent.length === 0 && (
                <p className="text-slate-500 text-sm">AIOS hasn't learned anything yet.</p>
              )}
              <div className="flex flex-col gap-3">
                {recent.slice(0, 5).map((m, i) => (
                  <div key={m.id} className="flex items-start justify-between gap-3 text-sm">
                    <p className="text-slate-300">
                      <span className="text-slate-600 mr-1">{i + 1}.</span>
                      {m.content}
                    </p>
                    <span className="text-slate-600 text-xs whitespace-nowrap shrink-0">
                      {formatRelativeTime(m.updated_at)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* DESKTOP: unchanged gradient card */}
            <div className="hidden md:block bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4 md:p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-white" />
                <h2 className="text-white font-medium">Use AIOS in Quick Prompt</h2>
              </div>
              <p className="text-blue-100 text-sm mb-4">
                AIOS uses what it knows about you to create more personalized prompts.
              </p>
              <button
                type="button"
                onClick={() => setShowQuickPromptModal(true)}
                className="flex items-center gap-2 bg-white text-blue-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Try Quick Prompt
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE/TABLET: fixed bottom pill, replaces the card below md */}
      {!loading && !loadError && (
        <button
          type="button"
          onClick={() => setShowQuickPromptModal(true)}
          className="md:hidden fixed inset-x-4 bottom-4 z-40 flex items-center justify-between gap-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3.5 text-white shadow-2xl shadow-black/40"
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            <Sparkles size={16} />
            Try Quick Prompt
          </span>
          <ArrowRight size={16} />
        </button>
      )}

      {showQuickPromptModal && (
        <AiosQuickPromptModal onClose={() => setShowQuickPromptModal(false)} />
      )}
    </div>
  )
}

export default AiosOverview
