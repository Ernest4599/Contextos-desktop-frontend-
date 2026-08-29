import { useNavigate, useLocation } from 'react-router-dom'
import { Sparkles, Zap, Upload, HelpCircle, Info } from 'lucide-react'

const topNavItems = [
  { to: '/import', label: 'Import', icon: Upload },
  { to: '/aios', label: 'AIOS', icon: Sparkles },
  { to: '/quick-prompt', label: 'Quick Prompt', icon: Zap },
  { to: '/how-it-works', label: 'How it Works', icon: HelpCircle },
  { to: '/about', label: 'About ContextOS', icon: Info },
]

function TopNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex items-center justify-center gap-2 px-4 py-3 border-b border-slate-800 overflow-x-auto shrink-0">
      {topNavItems.map(({ to, label, icon: Icon }) => {
        const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`)
        return (
          <button
            key={to}
            type="button"
            onClick={() => navigate(to)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
              isActive
                ? 'bg-blue-600/20 text-blue-400'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default TopNav
