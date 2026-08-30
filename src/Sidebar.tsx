import { useState } from 'react'
import { NavLink, Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import {
  Home, Zap, Folder, Upload, Package, Settings, ShieldCheck, ChevronDown,
  Sparkles, Brain, User, Sliders, BookOpen, Target, X,
} from 'lucide-react'
import type { ReactNode } from 'react'
import Logo from './Logo'
import { useAuth } from './lib/useAuth'

const navItems = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/quick-prompt', label: 'Quick Prompt', icon: Zap },
  { to: '/projects', label: 'Projects', icon: Folder },
]

const bottomNavItems = [
  { to: '/import', label: 'Import', icon: Upload },
  { to: '/package', label: 'Package', icon: Package },
  { to: '/settings', label: 'Setting', icon: Settings },
]

const aiosTopItems = [
  { to: '/aios', label: 'Overview', icon: Sparkles, end: true },
  { to: '/aios/memories', label: 'Memory', icon: Brain, end: true },
]

const aiosCategoryItems = [
  { category: 'personality', label: 'Personality', icon: User },
  { category: 'preference', label: 'Preferences', icon: Sliders },
  { category: 'knowledge', label: 'Knowledge', icon: BookOpen },
  { category: 'goal', label: 'Goals', icon: Target },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'bg-blue-600/20 text-blue-600 dark:text-blue-400'
      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
  }`


function displayNameFromEmail(email: string): string {
  const localPart = email.split('@')[0]
  return localPart.charAt(0).toUpperCase() + localPart.slice(1)
}

function Sidebar({ extra, onClose }: { extra?: ReactNode; onClose?: () => void }) {
  const { email, isLoggedIn } = useAuth()
  const displayName = isLoggedIn && email ? displayNameFromEmail(email) : 'Sign In'
  const displayLabel = isLoggedIn && email ? email : 'Access your account'
  const avatarInitial = isLoggedIn && email ? email.charAt(0).toUpperCase() : '?'
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const isAiosRoute = location.pathname.startsWith('/aios')
  const isAiosMemoriesRoute = location.pathname === '/aios/memories'
  const activeCategory = searchParams.get('category') || ''
  const [aiosOpen, setAiosOpen] = useState(isAiosRoute)

  return (
    <aside className="w-64 max-w-[85vw] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 h-dvh flex flex-col p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-2">
          <Logo size={58} />
          <div>
            <h1 className="text-slate-900 dark:text-white font-semibold text-sm leading-tight">ContextOS</h1>
            <p className="text-slate-500 text-xs leading-tight">Never restart an AI project again.</p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={navLinkClass}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}

        <button
          type="button"
          onClick={() => setAiosOpen((o) => !o)}
          className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
            isAiosRoute
              ? 'bg-blue-600/20 text-blue-600 dark:text-blue-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
          }`}
          aria-expanded={aiosOpen}
        >
          <span className="flex items-center gap-3">
            <Sparkles size={18} />
            AIOS
            <span className="text-[10px] leading-none bg-blue-600 text-white rounded px-1.5 py-0.5">NEW</span>
          </span>
          <ChevronDown size={16} className={`transition-transform ${aiosOpen ? 'rotate-180' : ''}`} />
        </button>

        {aiosOpen && (
          <div className="ml-4 flex flex-col gap-1 border-l border-slate-200 dark:border-slate-800 pl-3">
            {aiosTopItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={navLinkClass}>
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
            {aiosCategoryItems.map(({ category, label, icon: Icon }) => {
              const isActive = isAiosMemoriesRoute && activeCategory === category
              return (
                <Link
                  key={category}
                  to={`/aios/memories?category=${category}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              )
            })}
          </div>
        )}

        {bottomNavItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={navLinkClass}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <p className="text-slate-500 text-xs font-medium px-2 mb-3">SYSTEM STATUS</p>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-600 dark:text-green-500" />
            <span className="text-slate-700 dark:text-slate-300 text-sm">No conversations storage</span>
          </div>
          <span className="flex items-center gap-1 text-green-600 dark:text-green-500 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-500" />
            ON
          </span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <p className="text-slate-500 text-xs font-medium px-2 mb-3">PRIVACY</p>
        <div className="flex items-start gap-2 px-2">
          <ShieldCheck size={16} className="text-green-600 dark:text-green-500 mt-0.5" />
          <div>
            <p className="text-slate-800 dark:text-slate-200 text-sm font-medium">100% Private</p>
            <p className="text-slate-500 text-xs mt-0.5">Your data never leaves your device.</p>
          </div>
        </div>
      </div>

      {extra && <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 px-2">{extra}</div>}

      <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => navigate('/account')}
          className="flex items-center gap-3 px-2 py-2 w-full rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
            {avatarInitial}
          </div>
          <div className="flex-1 text-left">
            <p className="text-slate-900 dark:text-white text-sm font-medium leading-tight">{displayName}</p>
            <p className="text-slate-500 text-xs leading-tight">{displayLabel}</p>
          </div>
          <ChevronDown size={16} className="text-slate-500" />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
