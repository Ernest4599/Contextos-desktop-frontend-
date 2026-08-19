import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Zap, Folder, Upload, Package, Settings, ShieldCheck, ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import Logo from './Logo'

const navItems = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/quick-prompt', label: 'Quick Prompt', icon: Zap },
  { to: '/projects', label: 'Projects', icon: Folder },
  { to: '/import', label: 'Import', icon: Upload },
  { to: '/package', label: 'Package', icon: Package },
  { to: '/settings', label: 'Setting', icon: Settings },
]

function Sidebar({ extra }: { extra?: ReactNode }) {
  const navigate = useNavigate()

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 h-screen flex flex-col p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Logo size={58} />
        <div>
          <h1 className="text-white font-semibold text-sm leading-tight">ContextOS</h1>
          <p className="text-slate-500 text-xs leading-tight">Never restart an AI project again.</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 pt-6 border-t border-slate-800">
        <p className="text-slate-500 text-xs font-medium px-2 mb-3">SYSTEM STATUS</p>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-500" />
            <span className="text-slate-300 text-sm">No conversations storage</span>
          </div>
          <span className="flex items-center gap-1 text-green-500 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            ON
          </span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800">
        <p className="text-slate-500 text-xs font-medium px-2 mb-3">PRIVACY</p>
        <div className="flex items-start gap-2 px-2">
          <ShieldCheck size={16} className="text-green-500 mt-0.5" />
          <div>
            <p className="text-slate-200 text-sm font-medium">100% Private</p>
            <p className="text-slate-500 text-xs mt-0.5">Your data never leaves your device.</p>
          </div>
        </div>
      </div>

      {extra && <div className="mt-6 pt-6 border-t border-slate-800 px-2">{extra}</div>}

      <div className="mt-auto pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={() => navigate('/account')}
          className="flex items-center gap-3 px-2 py-2 w-full rounded-lg hover:bg-slate-800 transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
            A
          </div>
          <div className="flex-1 text-left">
            <p className="text-white text-sm font-medium leading-tight">Aravind</p>
            <p className="text-slate-500 text-xs leading-tight">Local Workspace</p>
          </div>
          <ChevronDown size={16} className="text-slate-500" />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
