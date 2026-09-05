import { useEffect, useState } from 'react'
import { Loader2, ChevronLeft, ChevronRight, CheckCircle2, XCircle } from 'lucide-react'
import {
  getAdminIntegrations,
  getAdminIntegrationEvents,
  type AdminIntegrationProvider,
  type IntegrationEvent,
} from '../lib/api'
import { formatRelativeTime } from './utils'

const PAGE_SIZE = 25

function ProviderCard({ data }: { data: AdminIntegrationProvider }) {
  const rate = data.total > 0 ? Math.round((data.success / data.total) * 100) : null
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-2">{data.provider}</p>
      <p className="text-2xl font-semibold text-white mb-3">{rate === null ? '—' : `${rate}%`}</p>
      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <CheckCircle2 size={12} className="text-green-500" /> {data.success.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <XCircle size={12} className="text-red-400" /> {data.failure.toLocaleString()}
        </span>
        <span>{data.total.toLocaleString()} total</span>
      </div>
    </div>
  )
}

function AdminIntegrations() {
  const [providers, setProviders] = useState<AdminIntegrationProvider[]>([])
  const [events, setEvents] = useState<IntegrationEvent[]>([])
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [providerFilter, setProviderFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [statsData, eventsData] = await Promise.all([
          getAdminIntegrations(),
          getAdminIntegrationEvents(PAGE_SIZE, offset, providerFilter || undefined),
        ])
        if (cancelled) return
        setProviders(statsData.providers ?? [])
        setEvents(eventsData.events ?? [])
        setTotal(eventsData.total ?? 0)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Failed to load integrations data')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [offset, providerFilter])

  function handleFilterChange(value: string) {
    setProviderFilter(value)
    setOffset(0)
  }

  const rangeStart = total === 0 ? 0 : offset + 1
  const rangeEnd = Math.min(offset + PAGE_SIZE, total)

  if (loading && providers.length === 0) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <Loader2 size={24} className="text-slate-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-1">Integrations</h1>
      <p className="text-slate-400 text-sm mb-8">LLM provider health and call history</p>

      {error && <p className="text-red-400 text-sm mb-6">{error}</p>}

      {providers.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {providers.map((p) => (
            <ProviderCard key={p.provider} data={p} />
          ))}
        </div>
      )}
      {providers.length === 0 && !error && (
        <p className="text-slate-500 text-sm mb-8">No provider calls logged yet.</p>
      )}

      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => handleFilterChange('')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            providerFilter === '' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          All
        </button>
        {providers.map((p) => (
          <button
            key={p.provider}
            type="button"
            onClick={() => handleFilterChange(p.provider)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              providerFilter === p.provider
                ? 'bg-blue-600/20 text-blue-400'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {p.provider}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-wide">
              <th className="text-left font-medium px-5 py-3">Status</th>
              <th className="text-left font-medium px-5 py-3">Provider</th>
              <th className="text-left font-medium px-5 py-3">Error</th>
              <th className="text-left font-medium px-5 py-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-slate-500 py-8">
                  No events found.
                </td>
              </tr>
            )}
            {events.map((event) => (
              <tr key={event.id} className="border-b border-slate-800/60 last:border-0">
                <td className="px-5 py-3">
                  {event.success ? (
                    <CheckCircle2 size={16} className="text-green-500" />
                  ) : (
                    <XCircle size={16} className="text-red-400" />
                  )}
                </td>
                <td className="px-5 py-3 text-slate-200 font-medium">{event.provider}</td>
                <td className="px-5 py-3 text-slate-400 truncate max-w-[280px]">{event.error_message ?? '—'}</td>
                <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{formatRelativeTime(event.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default AdminIntegrations
