import { useNavigate } from 'react-router-dom'
import { Lock, LogIn } from 'lucide-react'
import { useAuth } from './lib/useAuth'

function RequireAuth({ children, featureName }: { children: React.ReactNode; featureName: string }) {
  const { isLoggedIn, checking } = useAuth()
  const navigate = useNavigate()

  if (checking) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen">
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen p-6">
        <div className="max-w-sm text-center border border-slate-800 rounded-2xl p-8">
          <div className="w-14 h-14 rounded-full bg-blue-600/10 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-blue-400" />
          </div>
          <h2 className="text-white text-lg font-semibold mb-2">Log in required for {featureName}</h2>
          <p className="text-slate-400 text-sm mb-6">Sign in to sync your {featureName.toLowerCase()} across devices.</p>
          <button
            type="button"
            onClick={() => navigate('/account')}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
          >
            <LogIn size={16} />
            Log In
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default RequireAuth
