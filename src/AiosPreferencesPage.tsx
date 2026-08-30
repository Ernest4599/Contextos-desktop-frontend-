import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sliders, RotateCcw } from 'lucide-react'
import { getAiosPreferences, updateAiosPreferences, resetAiosIdentity } from './lib/api'

const LEVELS = [
  { id: 'minimal', label: 'Minimal', description: 'Use only the most essential identity info' },
  { id: 'balanced', label: 'Balanced', description: 'A reasonable mix of personalization' },
  { id: 'maximum', label: 'Maximum', description: 'Use everything AIOS knows about you' },
]

const CATEGORY_LABELS: Record<string, string> = {
  personality: 'Personality',
  preference: 'Preferences',
  goal: 'Goals',
  interest: 'Interests',
  knowledge: 'Knowledge',
  writing_style: 'Writing Style',
  important_fact: 'Important Facts',
  context: 'Context',
}

function AiosPreferencesPage() {
  const navigate = useNavigate()
  const [level, setLevel] = useState('balanced')
  const [categories, setCategories] = useState<string[]>(Object.keys(CATEGORY_LABELS))
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const [resetting, setResetting] = useState(false)
  const [resetConfirm, setResetConfirm] = useState(false)
  const [resetError, setResetError] = useState<string | null>(null)
  const [resetDone, setResetDone] = useState(false)

  useEffect(() => {
    getAiosPreferences().then((result) => {
      if (result.success) {
        setLevel(result.personalization_level ?? 'balanced')
        setCategories(result.enabled_categories ?? Object.keys(CATEGORY_LABELS))
      }
      setLoading(false)
    })
  }, [])

  const toggleCategory = (cat: string) => {
    setCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveError(null)
    const result = await updateAiosPreferences(level, categories)
    if (result.success) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } else {
      setSaveError(result.error ?? 'Failed to save')
    }
    setSaving(false)
  }

  const handleReset = async () => {
    setResetting(true)
    setResetError(null)
    const result = await resetAiosIdentity()
    if (result.success) {
      setResetDone(true)
      setResetConfirm(false)
    } else {
      setResetError(result.error ?? 'Failed to reset AIOS identity')
    }
    setResetting(false)
  }

  return (
    <div className="flex-1 p-6 h-dvh overflow-y-auto max-w-2xl mx-auto w-full bg-cream dark:bg-transparent">
      <button
        type="button"
        onClick={() => navigate('/settings')}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Settings
      </button>

      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">AIOS Preferences</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Control how AIOS uses and applies your identity.</p>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading...</p>
      ) : (
        <>
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Sliders size={18} className="text-blue-500 dark:text-blue-400" />
              <h2 className="text-slate-900 dark:text-white font-semibold">Personalization Level</h2>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => { setLevel(l.id); setSaved(false) }}
                  className={`text-left border rounded-xl p-4 transition-colors ${
                    level === l.id ? 'border-blue-500 bg-blue-600/5' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <p className="text-slate-900 dark:text-white text-sm font-medium">{l.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{l.description}</p>
                </button>
              ))}
            </div>

            <h3 className="text-slate-900 dark:text-white text-sm font-medium mb-3">Memory Categories AIOS Can Use</h3>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categories.includes(key)}
                    onChange={() => toggleCategory(key)}
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950"
                  />
                  {label}
                </label>
              ))}
            </div>

            {saveError && <p className="text-red-400 text-xs mb-3">{saveError}</p>}

            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Preferences'}
            </button>
          </div>

          <div className="border border-red-600/30 rounded-2xl p-6">
            <h2 className="text-slate-900 dark:text-white font-semibold mb-2">Reset AIOS Identity</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Permanently deletes everything AIOS has learned about you. This does not delete your account, projects,
              or license.
            </p>

            {resetError && <p className="text-red-400 text-xs mb-3">{resetError}</p>}
            {resetDone && <p className="text-green-500 dark:text-green-400 text-xs mb-3">AIOS identity reset.</p>}

            {!resetConfirm ? (
              <button
                type="button"
                onClick={() => setResetConfirm(true)}
                className="flex items-center gap-2 border border-red-600/40 text-red-500 dark:text-red-400 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-red-600/10 transition-colors"
              >
                <RotateCcw size={16} />
                Reset AIOS Identity
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <p className="text-red-500 dark:text-red-400 text-sm">Are you sure? This can't be undone.</p>
                <button
                  type="button"
                  disabled={resetting}
                  onClick={handleReset}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  {resetting ? 'Resetting...' : 'Yes, Reset'}
                </button>
                <button
                  type="button"
                  onClick={() => setResetConfirm(false)}
                  className="text-slate-500 dark:text-slate-400 text-sm hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default AiosPreferencesPage
