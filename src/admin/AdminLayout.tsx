import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ShieldAlert, ArrowLeft } from 'lucide-react'
import Logo from '../Logo'

const navItems = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/security', label: 'Audit Log', icon: ShieldAlert },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'bg-blue-600/20 text-blue-400'
      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
  }`

function AdminLayout() {
  const navigate = useNavigate()

  return (
    <div className="flex bg-slate-950 text-white h-dvh overflow-hidden">
      <aside className="w-60 shrink-0 border-r border-slate-800 h-dvh flex flex-col p-4 overflow-y-auto">
        <div className="flex items-center gap-2 mb-8 px-2">
          <Logo size={28} />
          <div>
            <h1 className="text-white font-semibold text-sm leading-tight">ContextOS</h1>
            <p className="text-slate-500 text-[10px] leading-tight tracking-wide">ADMIN</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={navLinkClass}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => navigate('/home')}
          className="mt-auto flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          Back to app
        </button>
      </aside>

      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
