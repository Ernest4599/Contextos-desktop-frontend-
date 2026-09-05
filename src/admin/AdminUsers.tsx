import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react'
import { getAdminUsers, type AdminUser } from '../lib/api'
import { formatRelativeTime } from './utils'

const PAGE_SIZE = 25

function AdminUsers() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(searchInput)
      setOffset(0)
    }, 300)
    return () => clearTimeout(id)
  }, [searchInput])

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await getAdminUsers(search || undefined, PAGE_SIZE, offset)
        if (cancelled) return
        setUsers(data.users ?? [])
        setTotal(data.total ?? 0)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Failed to load users')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [search, offset])

  const rangeStart = total === 0 ? 0 : offset + 1
  const rangeEnd = Math.min(offset + PAGE_SIZE, total)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-1">Users</h1>
      <p className="text-slate-400 text-sm mb-8">Manage user accounts and access</p>

      <div className="relative mb-4 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by email…"
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-600"
        />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {error && <p className="text-red-400 text-sm p-5">{error}</p>}

        {!error && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-wide">
                <th className="text-left font-medium px-5 py-3">Email</th>
                <th className="text-left font-medium px-5 py-3">Role</th>
                <th className="text-left font-medium px-5 py-3">Joined</th>
                <th className="text-left font-medium px-5 py-3">Last Login</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={4} className="text-center text-slate-500 py-8">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && users.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-slate-500 py-8">
                    No users found.
                  </td>
                </tr>
              )}
              {!loading &&
                users.map((u) => (
                  <tr
                    key={u.id}
                    onClick={() => navigate(`/admin/users/${u.id}`)}
                    className="border-b border-slate-800/60 last:border-0 cursor-pointer hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-5 py-3 text-slate-200 font-medium">{u.email}</td>
                    <td className="px-5 py-3">
                      {u.is_admin ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-400">
                          <ShieldCheck size={13} /> Admin
                        </span>
                      ) : (
                        <span className="text-slate-500 text-xs">User</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-slate-500">{formatRelativeTime(u.created_at)}</td>
                    <td className="px-5 py-3 text-slate-500">
                      {u.last_login_at ? formatRelativeTime(u.last_login_at) : 'Never'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {total > 0 && (
        <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
          <span>
            {rangeStart}–{rangeEnd} of {total}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={offset === 0}
              onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
              className="p-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              disabled={offset + PAGE_SIZE >= total}
              onClick={() => setOffset(offset + PAGE_SIZE)}
              className="p-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsers
