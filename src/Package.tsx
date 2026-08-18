import { MessageSquare, ChevronRight, Trash2 } from 'lucide-react'

function Package() {
  return (
    <div className="flex-1 p-6 h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Packages</h1>
      <p className="text-slate-400 mb-8">Every Context Package you've generated, saved on this device.</p>

      <div className="border border-slate-800 rounded-2xl p-5 flex items-start gap-4 mb-6 hover:bg-slate-900 transition-colors cursor-pointer">
        <div className="w-12 h-12 rounded-xl bg-green-600/10 flex items-center justify-center shrink-0">
          <MessageSquare size={22} className="text-green-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-1.5">Imported Conversation</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-600/20 text-blue-400 text-xs font-medium px-2.5 py-1 rounded-md">Import</span>
            <span className="text-slate-500 text-xs">8 Aug · 10:51</span>
          </div>
          <p className="text-slate-400 text-sm">You are continuing an existing project. Domain: General Overview: ...</p>
        </div>
        <ChevronRight size={20} className="text-slate-500 shrink-0 mt-1" />
      </div>

      <button
        type="button"
        className="flex items-center gap-2 border border-slate-700 text-slate-300 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <Trash2 size={16} />
        Clear Package History
      </button>
    </div>
  )
}

export default Package
