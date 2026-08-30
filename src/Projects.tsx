import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Folder, MoreVertical, ChevronRight, Briefcase, X } from 'lucide-react'
import { getProjects, createProject, type Project } from './lib/api'

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

function NewProjectModal({ onClose, onCreated }: { onClose: () => void; onCreated: (p: Project) => void }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleCreate = async () => {
    setErrorMsg(null)
    setLoading(true)
    try {
      const result = await createProject(name)
      if (!result.success || !result.project) {
        setErrorMsg(result.error ?? 'Something went wrong')
        setLoading(false)
        return
      }
      onCreated(result.project)
      onClose()
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to reach the server')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-slate-900 dark:text-white text-lg font-semibold">New Project</h2>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
            <X size={20} />
          </button>
        </div>

        {errorMsg && (
          <div className="border border-red-600/40 bg-red-600/10 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
            {errorMsg}
          </div>
        )}

        <label className="text-slate-900 dark:text-white text-sm font-medium block mb-2">Project Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. SaaS Landing"
          autoFocus
          className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg px-4 py-3 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 mb-5"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleCreate}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)

  async function loadProjects() {
    setLoading(true)
    setLoadError(null)
    const result = await getProjects()
    if (result.success) {
      setProjects(result.projects ?? [])
    } else {
      setLoadError(result.error ?? 'Failed to load projects')
    }
    setLoading(false)
  }

  useEffect(() => {
    loadProjects()
  }, [])

  return (
    <div className="flex-1 p-6 h-dvh overflow-y-auto bg-cream dark:bg-transparent">
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Projects</h1>
        <button
          type="button"
          onClick={() => setShowNewProjectModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Your AI projects, saved securely to your account.</p>

      {loading && <p className="text-slate-500 text-sm">Loading your projects...</p>}
      {loadError && <p className="text-red-400 text-sm">{loadError}</p>}

      {!loading && !loadError && projects.length === 0 && (
        <div className="flex flex-col items-center text-center mt-16 pb-8">
          <Briefcase size={28} className="text-slate-400 dark:text-slate-600 mb-3" />
          <h3 className="text-slate-900 dark:text-white font-semibold mb-1">No projects yet</h3>
          <p className="text-slate-500 text-sm mb-6">Create a new project to start organizing your AI work.</p>
          <button
            type="button"
            onClick={() => setShowNewProjectModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            <Plus size={16} />
            New Project
          </button>
        </div>
      )}

      {!loading && !loadError && projects.length > 0 && (
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
                <Folder size={22} className="text-blue-500 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 dark:text-white font-semibold mb-1.5">{project.name}</h3>
                <p className="text-slate-500 text-sm">
                  {project.created_at && project.updated_at && project.created_at === project.updated_at
                    ? `Created ${formatRelativeTime(project.created_at)}`
                    : `Updated ${formatRelativeTime(project.updated_at)}`}
                </p>
              </div>
              <button type="button" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 p-1" onClick={(e) => e.stopPropagation()}>
                <MoreVertical size={18} />
              </button>
              <ChevronRight size={20} className="text-slate-400 dark:text-slate-500" />
            </div>
          ))}
        </div>
      )}

      {showNewProjectModal && (
        <NewProjectModal
          onClose={() => setShowNewProjectModal(false)}
          onCreated={(p) => setProjects((prev) => [p, ...prev])}
        />
      )}
    </div>
  )
}

export default Projects
