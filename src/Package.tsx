import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageSquare, Sparkles, Zap, ChevronRight, Trash2, Lock, Package as PackageIcon, X } from 'lucide-react'
import { getPackages, deletePackage, clearPackages, type ContextPackage } from './lib/api'
import { useAuth } from './lib/useAuth'

function formatRelativeTime(iso: string | null | undefined): string {
  if (!iso) return ''
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

const SOURCE_META: Record<string, { label: string; icon: typeof MessageSquare; badgeClass: string; iconWrapClass: string; iconClass: string }> = {
  import: {
    label: 'Import',
    icon: MessageSquare,
    badgeClass: 'bg-green-600/20 text-green-600 dark:text-green-400',
    iconWrapClass: 'bg-green-600/10',
    iconClass: 'text-green-500',
  },
  quick_prompt: {
    label: 'Quick Prompt',
    icon: Zap,
    badgeClass: 'bg-blue-600/20 text-blue-600 dark:text-blue-400',
    iconWrapClass: 'bg-blue-600/10',
    iconClass: 'text-blue-500 dark:text-blue-400',
  },
  aios_quick_prompt: {
    label: 'AIOS Quick Prompt',
    icon: Sparkles,
    badgeClass: 'bg-purple-600/20 text-purple-600 dark:text-purple-400',
    iconWrapClass: 'bg-purple-600/10',
    iconClass: 'text-purple-500 dark:text-purple-400',
  },
}

function PackageDetailModal({ pkg, onClose }: { pkg: ContextPackage; onClose: () => void }) {
  const meta = SOURCE_META[pkg.source] ?? SOURCE_META.import
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${meta.badgeClass}`}>{meta.label}</span>
            <h2 className="text-slate-900 dark:text-white text-lg font-semibold mt-2">{pkg.title}</h2>
          </div>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 shrink-0">
            <X size={20} />
          </button>
        </div>
        <pre className="text-slate-700 dark:text-slate-200 text-sm font-mono whitespace-pre-wrap leading-relaxed overflow-y-auto flex-1">
          {pkg.content}
        </pre>
      </div>
    </div>
  )
}

function Package() {
  const navigate = useNavigate()
  const { isLoggedIn, checking: authChecking } = useAuth()
  const [packages, setPackages] = useState<ContextPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [selected, setSelected] = useState<ContextPackage | null>(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [clearing, setClearing] = useState(false)

  async function loadPackages() {
    setLoading(true)
    setLoadError(null)
    const result = await getPackages()
    if (result.success) {
      setPackages(result.packages ?? [])
    } else {
      setLoadError(result.error ?? 'Failed to load packages')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (authChecking) return
    if (!isLoggedIn) {
      setLoading(false)
      return
    }
    loadPackages()
  }, [authChecking, isLoggedIn])

  const handleDelete = async (id: number) => {
    const previous = packages
    setPackages((prev) => prev.filter((p) => p.id !== id))
    const result = await deletePackage(id)
    if (!result.success) {
      setPackages(previous)
    }
  }

  const handleClearAll = async () => {
    setClearing(true)
    const result = await clearPackages()
    if (result.success) {
      setPackages([])
      setShowClearConfirm(false)
    }
    setClearing(false)
  }

  if (authChecking || (loading && isLoggedIn)) {
    return (
      <div className="flex-1 p-6 h-dvh overflow-y-auto bg-cream dark:bg-transparent">
        <p className="text-slate-500 text-sm">Loading...</p>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="flex-1 p-6 h-dvh overflow-y-auto bg-cream dark:bg-transparent">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Packages</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Every Context Package you've generated, saved to your account.</p>

        <div className="flex flex-col items-center text-center mt-16 pb-8">
          <div className="w-14 h-14 rounded-full bg-blue-600/10 flex items-center justify-center mb-4">
            <Lock size={24} className="text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-slate-900 dark:text-white font-semibold mb-1">Sign in to save Packages</h3>
          <p className="text-slate-500 text-sm mb-6 max-w-xs">
            Context Packages are tied to your account. License-only access never stores anything — your packages
            appear once and are gone when you leave the page.
          </p>
          <button
            type="button"
            onClick={() => navigate('/account')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 h-dvh overflow-y-auto bg-cream dark:bg-transparent">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Packages</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Every Context Package you've generated, saved to your account.</p>

      {loadError && <p className="text-red-400 text-sm mb-6">{loadError}</p>}

      {!loadError && packages.length === 0 && (
        <div className="flex flex-col items-center text-center mt-16 pb-8">
          <PackageIcon size={28} className="text-slate-400 dark:text-slate-600 mb-3" />
          <h3 className="text-slate-900 dark:text-white font-semibold mb-1">No packages yet</h3>
          <p className="text-slate-500 text-sm max-w-xs">
            Import a conversation or run Quick Prompt — every result is saved here automatically.
          </p>
        </div>
      )}

      {!loadError && packages.length > 0 && (
        <>
          <div className="flex flex-col gap-4 mb-6">
            {packages.map((pkg) => {
              const meta = SOURCE_META[pkg.source] ?? SOURCE_META.import
              const Icon = meta.icon
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelected(pkg)}
                  className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-start gap-4 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${meta.iconWrapClass}`}>
                    <Icon size={22} className={meta.iconClass} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-900 dark:text-white font-semibold mb-1.5">{pkg.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${meta.badgeClass}`}>{meta.label}</span>
                      <span className="text-slate-500 text-xs">{formatRelativeTime(pkg.created_at)}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm truncate">{pkg.preview}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(pkg.id)
                    }}
                    className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1 shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                  <ChevronRight size={20} className="text-slate-400 dark:text-slate-500 shrink-0 mt-1" />
                </div>
              )
            })}
          </div>

          {!showClearConfirm ? (
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Trash2 size={16} />
              Clear Package History
            </button>
          ) : (
            <div className="border border-red-600/40 bg-red-600/10 rounded-xl px-5 py-4">
              <p className="text-red-500 dark:text-red-400 text-sm font-medium mb-3">
                Delete all {packages.length} saved packages? This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={clearing}
                  onClick={handleClearAll}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  {clearing ? 'Deleting...' : 'Yes, Delete All'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="text-slate-600 dark:text-slate-400 text-sm hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {selected && <PackageDetailModal pkg={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

export default Package
