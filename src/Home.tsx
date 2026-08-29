import { useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react'
import { useAuth } from './lib/useAuth'

function firstNameFromEmail(email: string): string {
  const localPart = email.split('@')[0]
  return localPart.charAt(0).toUpperCase() + localPart.slice(1)
}

function Home() {
  const navigate = useNavigate()
  const { email, isLoggedIn } = useAuth()
  const greetingName = isLoggedIn && email ? firstNameFromEmail(email) : null

  return (
    <div className="flex-1 flex flex-col h-screen overflow-y-auto">
      <div className="flex-1 flex gap-6 p-4 overflow-y-auto">
      {/* Center column */}
      <div className="flex-1 max-w-3xl">
        <p className="text-blue-400 text-sm font-semibold mb-3">
          {greetingName ? `Welcome back, ${greetingName}` : 'ContextOS'}
        </p>
        <h1 className="text-5xl font-bold text-white mb-2 leading-tight">
          Continue. <span className="text-blue-500">Don't restart.</span>
        </h1>
        <p className="text-slate-400 text-lg mb-8">Never restart your AI again. Your work, preserved, anywhere you go.</p>

        <button
          type="button"
          onClick={() => navigate('/import')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-6 py-3.5 rounded-xl transition-colors mb-8"
        >
          Try Importing
          <ArrowRight size={18} />
        </button>

        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <Lock size={14} />
          <p>We process everything locally. Your conversation is never stored.</p>
        </div>
      </div>

      {/* Right column - pinned to far right edge */}
      <div className="w-50 shrink-0 ml-auto flex flex-col gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4">Privacy Status</h3>

          <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2.5 mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-green-500" />
              <span className="text-slate-200 text-xs">Offline Mode</span>
            </div>
            <span className="text-green-500 text-xs font-medium">ON</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs whitespace-nowrap">Raw Conversation</span>
              <span className="text-green-500 text-xs font-medium">Deleted</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs whitespace-nowrap">Stored on Server</span>
              <span className="text-slate-200 text-xs font-medium">No</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs whitespace-nowrap">Encrypted Package</span>
              <span className="text-slate-200 text-xs font-medium">Yes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs whitespace-nowrap">Processing Time</span>
              <span className="text-slate-200 text-xs font-medium">4.2 sec</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4">How it works</h3>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center shrink-0">1</div>
              <div>
                <p className="text-slate-200 text-sm font-medium">Import</p>
                <p className="text-slate-500 text-xs mt-0.5">You import a conversation from any AI.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center shrink-0">2</div>
              <div>
                <p className="text-slate-200 text-sm font-medium">Analyze</p>
                <p className="text-slate-500 text-xs mt-0.5">We extract what matters using on-device AI.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center shrink-0">3</div>
              <div>
                <p className="text-slate-200 text-sm font-medium">Package</p>
                <p className="text-slate-500 text-xs mt-0.5">Get your Context Package to continue anywhere.</p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 text-center">
            <p className="text-blue-400 text-sm italic">"Your context. Your control." Always.</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home
