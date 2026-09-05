import { useEffect, useState } from 'react'
import { Users, Package, Zap, ShieldAlert, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { getAdminOverview, getAdminSecurityEvents, type AdminOverview as AdminOverviewData, type SecurityEvent } from '../lib/api'
import { formatRelativeTime } from './utils'

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Users }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center">
          <Icon size={16} className="text-blue-400" />
        </div>
        <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
  )
}

function AdminOverview() {
  const [overview, setOverview] = useState<AdminOverviewData | null>(null)
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [overviewData, eventsData] = await Promise.all([
          getAdminOverview(),
          getAdminSecurityEvents(8),
        ])
        setOverview(overviewData)
        setEvents(eventsData.events ?? [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load admin data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <Loader2 size={24} className="text-slate-500 animate-spin" />
      </div>
    )
  }

  if (error || !overview) {
    return (
      <div className="p-8">
        <p className="text-red-400 text-sm">{error ?? 'Something went wrong loading the overview.'}</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-1">Overview</h1>
      <p className="text-slate-400 text-sm mb-8">System overview and key metrics</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard label="Users" value={overview.users.toLocaleString()} icon={Users} />
        <StatCard label="Context Packages" value={overview.context_packages.toLocaleString()} icon={Package} />
        <StatCard
          label="Processing Jobs"
          value={overview.processing_jobs === null ? 'Coming soon' : overview.processing_jobs.toLocaleString()}
          icon={Zap}
        />
        <StatCard label="AIOS Activity" value={overview.aios_activity.toLocaleString()} icon={Zap} />
        <StatCard
          label="Error Rate"
          value={overview.error_rate === null ? '—' : `${overview.error_rate}%`}
          icon={ShieldAlert}
        />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-white font-semibold mb-4">Recent Security Events</h2>
        {events.length === 0 && <p className="text-slate-500 text-sm">No events recorded yet.</p>}
        <div className="flex flex-col gap-3">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2 min-w-0">
                {event.success ? (
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                ) : (
                  <XCircle size={16} className="text-red-400 shrink-0" />
                )}
                <span className="text-slate-200 font-medium truncate">{event.event_type}</span>
                {event.user_email && (
                  <span className="text-slate-500 truncate">{event.user_email}</span>
                )}
              </div>
              <span className="text-slate-500 text-xs shrink-0">{formatRelativeTime(event.created_at)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminOverview
