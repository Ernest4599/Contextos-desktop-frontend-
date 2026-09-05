import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { getAdminSecurityEvents, type SecurityEvent } from '../lib/api'
import { formatRelativeTime } from './utils'

const EVENT_TYPES = ['LOGIN_SUCCESS', 'LOGIN_FAILURE', 'RATE_LIMIT_EXCEEDED']
const PAGE_SIZE = 25

function AdminSecurityEvents() {
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [eventType, setEventType] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await getAdminSecurityEvents(PAGE_SIZE, offset, eventType || undefined)
        if (cancelled) return
        setEvents(data.events ?? [])
        setTotal(data.total ?? 0)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Failed to load security events')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [offset, eventType])

  function handleFilterChange(value: string) {
    setEventType(value)
    setOffset(0)
  }

  const rangeStart = total === 0 ? 0 : offset + 1
  const rangeEnd = Math.min(offset + PAGE_SIZE, total)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-1">Audit Log</h1>
      <p className="text-slate-400 text-sm mb-8">Login attempts and rate-limit events</p>

      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => handleFilterChange('')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            eventType === '' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          All
        </button>
        {EVENT_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => handleFilterChange(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              eventType === type ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {error && <p className="text-red-400 text-sm p-5">{error}</p>}

        {!error && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-wide">
                <th className="text-left font-medium px-5 py-3">Status</th>
                <th className="text-left font-medium px-5 py-3">Event</th>
                <th className="text-left font-medium px-5 py-3">User</th>
                <th className="text-left font-medium px-5 py-3">IP Hash</th>
                <th className="text-left font-medium px-5 py-3">Detail</th>
                <th className="text-left font-medium px-5 py-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="text-center text-slate-500 py-8">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && events.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-slate-500 py-8">
                    No events found.
                  </td>
                </tr>
              )}
              {!loading &&
                events.map((event) => (
                  <tr key={event.id} className="border-b border-slate-800/60 last:border-0">
                    <td className="px-5 py-3">
                      {event.success ? (
                        <CheckCircle2 size={16} className="text-green-500" />
                      ) : (
                        <XCircle size={16} className="text-red-400" />
                      )}
                    </td>
                    <td className="px-5 py-3 text-slate-200 font-medium whitespace-nowrap">{event.event_type}</td>
                    <td className="px-5 py-3 text-slate-400">
                      {event.user_email ?? (event.user_id ? `#${event.user_id}` : '—')}
                    </td>
                    <td className="px-5 py-3 text-slate-500 font-mono text-xs">
                      {event.ip_hash ? `${event.ip_hash.slice(0, 10)}…` : '—'}
                    </td>
                    <td className="px-5 py-3 text-slate-400 truncate max-w-[200px]">{event.detail ?? '—'}</td>
                    <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{formatRelativeTime(event.created_at)}</td>
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

export default AdminSecurityEvents
