import { useState } from 'react'
import { User, Mail, Lock, Eye, UserPlus, LogIn, ShieldCheck, Laptop, Info, ArrowRight, Check, LogOut } from 'lucide-react'
import { apiSignup, apiLogin, storeSession } from './lib/api'
import { useAuth } from './lib/useAuth'

type Tab = 'signin' | 'create'

function Account() {
  const { email: loggedInEmail, isLoggedIn, checking, setEmail: setAuthEmail, signOut } = useAuth()

  const [tab, setTab] = useState<Tab>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async () => {
    setErrorMsg(null)
    setLoading(true)

    try {
      const result =
        tab === 'signin'
          ? await apiLogin(email, password)
          : await apiSignup(email, password, confirmPassword)

      if (!result.success || !result.token || !result.email) {
        setErrorMsg(result.error ?? 'Something went wrong')
        setLoading(false)
        return
      }

      storeSession(result.token, result.email)
      setAuthEmail(result.email)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to reach the server')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = () => {
    if (window.confirm('Sign out of ContextOS?')) {
      signOut()
    }
  }

  if (checking) {
    return (
      <div className="flex-1 flex items-center justify-center h-dvh bg-cream dark:bg-transparent">
        <p className="text-slate-600 dark:text-slate-400 text-sm">Loading...</p>
      </div>
    )
  }

  if (isLoggedIn) {
    return (
      <div className="flex-1 p-6 h-dvh overflow-y-auto bg-cream dark:bg-transparent">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Account</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">You're signed in.</p>

          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-600/10 border-2 border-blue-500 flex items-center justify-center mb-4">
              <User size={28} className="text-blue-500 dark:text-blue-400" />
            </div>
            <h2 className="text-slate-900 dark:text-white text-xl font-semibold mb-1">{loggedInEmail}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">Projects and Packages will sync across your devices.</p>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2 border border-red-600/40 text-red-500 dark:text-red-400 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-red-600/10 transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex gap-8 p-6 h-dvh overflow-y-auto bg-cream dark:bg-transparent">
      {/* Center column */}
      <div className="flex-1 max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Account</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Optional — ContextOS works without an account.</p>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center mb-4">
            <User size={28} className="text-blue-500 dark:text-blue-400" />
          </div>
          <h2 className="text-slate-900 dark:text-white text-2xl font-bold mb-3">Optional account</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md">
            Signing in isn't required — ContextOS fully works with just a device license. Create an account only if you want your{' '}
            <span className="text-blue-600 dark:text-blue-400">Projects</span> and <span className="text-blue-600 dark:text-blue-400">Packages</span> to sync across devices.
          </p>
        </div>

        <div className="flex border border-slate-200 dark:border-slate-800 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => { setTab('signin'); setErrorMsg(null) }}
            className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg transition-colors ${
              tab === 'signin' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LogIn size={16} />
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('create'); setErrorMsg(null) }}
            className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg transition-colors ${
              tab === 'create' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserPlus size={16} />
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="border border-red-600/40 bg-red-600/10 text-red-400 text-sm rounded-xl px-5 py-4 mb-6">
            {errorMsg}
          </div>
        )}

        <div className="mb-5">
          <label className="text-slate-900 dark:text-white text-sm font-medium block mb-2">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg pl-11 pr-4 py-3 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-slate-900 dark:text-white text-sm font-medium block mb-2">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg pl-11 pr-11 py-3 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>

        {tab === 'create' && (
          <div className="mb-6">
            <label className="text-slate-900 dark:text-white text-sm font-medium block mb-2">Confirm Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg pl-11 pr-4 py-3 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl transition-colors"
        >
          {loading ? 'Please wait...' : tab === 'signin' ? 'Sign In' : 'Create Account'}
          {!loading && <ArrowRight size={16} />}
        </button>

        {tab === 'signin' && (
          <button
            type="button"
            className="w-full text-blue-600 dark:text-blue-400 text-sm font-medium py-3 mt-2 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
          >
            Forgot Password?
          </button>
        )}

        <div className="flex items-center justify-between border border-blue-600/30 bg-blue-600/5 rounded-xl px-5 py-4 mt-6">
          <div className="flex items-start gap-3">
            <Info size={18} className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold">No account required</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">You can continue using ContextOS completely offline with full privacy.</p>
            </div>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          >
            Learn more
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Right column — hidden on mobile, shown from md up */}
      <div className="hidden md:block w-72 shrink-0 ml-auto">
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex flex-col items-center text-center mb-5">
            <div className="w-12 h-12 rounded-full bg-green-600/10 flex items-center justify-center mb-3">
              <ShieldCheck size={22} className="text-green-500" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-bold">Your data stays private</h3>
          </div>

          <div className="flex flex-col gap-3 mb-5">
            <div className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 text-sm">All data is stored locally on your device</span>
            </div>
            <div className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 text-sm">No conversations are stored or sent to our servers</span>
            </div>
            <div className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 text-sm">You're in control — always</span>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-5 border-t border-slate-200 dark:border-slate-800">
            <Laptop size={18} className="text-slate-500 dark:text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-slate-900 dark:text-white text-sm font-medium">Local-first by design</p>
              <p className="text-slate-500 text-xs mt-0.5">ContextOS is built to keep you in control of your data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
