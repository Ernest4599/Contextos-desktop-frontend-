import { useNavigate } from 'react-router-dom'
import { Link2, Clipboard, UploadCloud, Download, Lock, ShieldCheck, Sparkles, Zap, Upload, HelpCircle, Info } from 'lucide-react'

const homeTopNavItems = [
  { to: '/import', label: 'Import', icon: Upload },
  { to: '/aios', label: 'AIOS', icon: Sparkles },
  { to: '/quick-prompt', label: 'Quick Prompt', icon: Zap },
  { to: '/how-it-works', label: 'How it Works', icon: HelpCircle },
  { to: '/about', label: 'About ContextOS', icon: Info },
]

function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 flex flex-col h-screen overflow-y-auto">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 overflow-x-auto shrink-0">
        {homeTopNavItems.map(({ to, label, icon: Icon }) => (
          <button
            key={to}
            type="button"
            onClick={() => navigate(to)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 flex gap-6 p-4 overflow-y-auto">
      {/* Center column */}
      <div className="flex-1 max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome to ContextOS</h1>
        <p className="text-slate-400 text-lg mb-8">Turn any AI conversation into a reusable Context Package.</p>

        <div className="border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center py-16 px-8">
          <div className="w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center mb-6">
            <Download size={28} className="text-blue-500" />
          </div>
          <h2 className="text-white text-2xl font-semibold mb-2">Import a conversation</h2>
          <p className="text-slate-400 mb-8">Drop a file here or choose an option below</p>

          <div className="flex gap-3 w-full max-w-md">
            <button
              type="button"
              onClick={() => navigate('/import')}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              <Link2 size={16} />
              Share Link
            </button>
            <button
              type="button"
              onClick={() => navigate('/import')}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm px-4 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              <Clipboard size={16} />
              Paste Text
            </button>
            <button
              type="button"
              onClick={() => navigate('/import')}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm px-4 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              <UploadCloud size={16} />
              Upload File
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 text-slate-500 text-sm">
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
