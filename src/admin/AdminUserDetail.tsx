import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Shield, Ban, Package, Zap, FolderKanban, Loader2 } from 'lucide-react'
import { getAdminUser, setAdminRole, revokeUserLicense, type AdminUserDetail as AdminUserDetailData } from '../lib/api'

function StatBlock({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Package }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-blue-600/10 flex items-center justify-center shrink-0">
        <Icon size={16} className="text-blue-400" />
      </div>
      <div>
        <p className="text-white font-semibold text-lg leading-tight">{value.toLocaleString()}</p>
        <p className="text-slate-500 text-xs">{label}</p>
      </div>
    </div>
  )
}

function AdminUserDetail() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const [data, setData] = useState<AdminUserDetailData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionPending, setActionPending] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    setError(null)
    try {
      const result = await getAdminUser(Number(userId))
      if (!result.success) {
        setError(result.error ?? 'User not found')
        return
      }
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    load()
  }, [load])

  async function handleToggleAdmin() {
    if (!data?.user || !userId) return
    const nextValue = !data.user.is_admin
    if (!nextValue === false && data.user.is_admin) {
      if (!window.confirm(`Remove admin access for ${data.user.email}?`)) return
    }
    setActionPending(true)
    setActionError(null)
    try {
      const result = await setAdminRole(Number(userId), nextValue)
      if (!result.success) {
        setActionError(result.error ?? 'Failed to update admin role')
        return
      }
      await load()
    } finally {
      setActionPending(false)
    }
  }

  async function handleRevokeLicense() {
    if (!data?.user || !userId) return
    if (!window.confirm(`Revoke the active license for ${data.user.email}? This can't be undone.`)) return
    setActionPending(true)
    setActionError(null)
    try {
      const result = await revokeUserLicense(Number(userId))
      if (!result.success) {
        setActionError(result.error ?? 'Failed to revoke license')
        return
      }
      await load()
    } finally {
      setActionPending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <Loader2 size={24} className="text-slate-500 animate-spin" />
      </div>
    )
  }

  if (error || !data?.user) {
    return (
      <div className="p-8">
        <button
          type="button"
          onClick={() => navigate('/admin/users')}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Users
        </button>
        <p className="text-red-400 text-sm">{error ?? 'Something went wrong.'}</p>
      </div>
    )
  }

  const { user, license, activity } = data

  return (
    <div className="p-8 max-w-3xl">
      <button
        type="button"
        onClick={() => navigate('/admin/users')}
        className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Users
      </button>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{user.email}</h1>
          <p className="text-slate-500 text-sm">
            Joined {user.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}
            {' · '}
            Last login {user.last_login_at ? new Date(user.last_login_at).toLocaleString() : 'never'}
          </p>
        </div>
        {user.is_admin ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 bg-blue-600/10 px-2.5 py-1 rounded-lg">
            <ShieldCheck size={13} /> Admin
          </span>
        ) : (
          <span className="text-slate-500 text-xs bg-slate-800 px-2.5 py-1 rounded-lg">User</span>
        )}
      </div>

      {actionError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2.5 mb-6">
          {actionError}
        </div>
      )}

      {activity && (
        <div className="grid grid-cols-3 gap-3 mb-8">
          <StatBlock label="Context Packages" value={activity.context_packages} icon={Package} />
          <StatBlock label="AIOS Memories" value={activity.aios_memories} icon={Zap} />
          <StatBlock label="Projects" value={activity.projects} icon={FolderKanban} />
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
        <h2 className="text-white font-semibold mb-4">License</h2>
        {license ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Plan</span>
              <span className="text-slate-200">{license.plan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status</span>
              <span className={license.status === 'active' ? 'text-green-400' : 'text-slate-400'}>
                {license.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Key</span>
              <span className="text-slate-300 font-mono text-xs">{license.license_key}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Expires</span>
              <span className="text-slate-300">
                {license.expires_at ? new Date(license.expires_at).toLocaleDateString() : '—'}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No license on file.</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={actionPending}
          onClick={handleToggleAdmin}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50 transition-colors"
        >
          {user.is_admin ? <Shield size={15} /> : <ShieldCheck size={15} />}
          {user.is_admin ? 'Remove Admin Access' : 'Make Admin'}
        </button>

        {license?.status === 'active' && (
          <button
            type="button"
            disabled={actionPending}
            onClick={handleRevokeLicense}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-50 transition-colors"
          >
            <Ban size={15} /> Revoke License
          </button>
        )}
      </div>
    </div>
  )
}

export default AdminUserDetail
