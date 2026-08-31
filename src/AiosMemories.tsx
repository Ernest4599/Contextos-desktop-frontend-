import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Trash2, Pencil, Check, X } from 'lucide-react'
import { getAiosMemories, updateAiosMemory, deleteAiosMemory, type AiosMemory } from './lib/api'

const CATEGORY_OPTIONS = [
  { value: '', label: 'All categories' },
  { value: 'personality', label: 'Personality' },
  { value: 'preference', label: 'Preferences' },
  { value: 'goal', label: 'Goals' },
  { value: 'interest', label: 'Interests' },
  { value: 'knowledge', label: 'Knowledge' },
  { value: 'writing_style', label: 'Writing Style' },
  { value: 'important_fact', label: 'Important Facts' },
  { value: 'context', label: 'Context' },
]

function AiosMemories() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || ''

  const [memories, setMemories] = useState<AiosMemory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')
  const [savingId, setSavingId] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  async function load() {
    setLoading(true)
    setError(null)
    const result = await getAiosMemories(category || undefined)
    if (result.success) {
      setMemories(result.memories || [])
    } else {
      setError(result.error || 'Failed to load memories')
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  function startEdit(m: AiosMemory) {
    setEditingId(m.id)
    setEditValue(m.content)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditValue('')
  }

  async function saveEdit(id: number) {
    if (!editValue.trim()) return
    setSavingId(id)
    const result = await updateAiosMemory(id, editValue.trim())
    if (result.success) {
      setMemories((prev) => prev.map((m) => (m.id === id ? { ...m, content: editValue.trim() } : m)))
      cancelEdit()
    } else {
      setError(result.error || 'Failed to update memory')
    }
    setSavingId(null)
  }

  async function handleDelete(id: number) {
    setDeletingId(id)
    const result = await deleteAiosMemory(id)
    if (result.success) {
      setMemories((prev) => prev.filter((m) => m.id !== id))
    } else {
      setError(result.error || 'Failed to delete memory')
    }
    setDeletingId(null)
  }

  return (
    <div className="flex-1 p-8 h-dvh overflow-y-auto bg-cream dark:bg-transparent">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">Memory</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Everything AIOS has stored about you.</p>
        </div>
        <select
          value={category}
          onChange={(e) => {
            const value = e.target.value
            setSearchParams(value ? { category: value } : {})
          }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-slate-200 px-3 py-2 focus:outline-none focus:border-blue-600"
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {loading && <p className="text-slate-500 text-sm">Loading memories...</p>}
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      {!loading && memories.length === 0 && !error && (
        <p className="text-slate-500 text-sm">No memories in this category yet.</p>
      )}

      <div className="flex flex-col gap-3">
        {memories.map((m) => (
          <div key={m.id} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
            {editingId === m.id ? (
              <div className="flex flex-col gap-3">
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-sm text-slate-900 dark:text-slate-200 resize-none focus:outline-none focus:border-blue-600"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs px-3 py-1.5 rounded-lg"
                  >
                    <X size={14} /> Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => saveEdit(m.id)}
                    disabled={savingId === m.id}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-lg"
                  >
                    <Check size={14} /> {savingId === m.id ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-slate-800 dark:text-slate-200 text-sm">{m.content}</p>
                  <span className="text-slate-500 dark:text-slate-600 text-xs mt-1 inline-block capitalize">
                    {m.category.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => startEdit(m)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(m.id)}
                    disabled={deletingId === m.id}
                    className="p-1.5 text-slate-500 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AiosMemories
