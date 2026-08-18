import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Info, Link2, Clipboard, UploadCloud, FileText, Lock, ShieldCheck } from 'lucide-react'

type ImportMethod = 'link' | 'paste' | 'upload' | null

function Import() {
  const navigate = useNavigate()
  const [activeMethod, setActiveMethod] = useState<ImportMethod>(null)

  return (
    <div className="flex-1 p-8 h-screen overflow-y-auto">
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-white">Import</h1>
        <button
          type="button"
          className="flex items-center gap-2 border border-slate-700 text-slate-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Info size={16} />
          How it works
        </button>
      </div>
      <p className="text-slate-400 mb-8">Bring any AI conversation into ContextOS.</p>

      <div className="border border-slate-800 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-white text-xl font-semibold mb-1">Choose how you want to import</h2>
          <p className="text-slate-400 text-sm">We'll extract what matters and turn it into a Context Package.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div
            className={`border rounded-xl p-6 flex flex-col items-center text-center transition-colors ${
              activeMethod === 'link' ? 'border-blue-500 bg-blue-600/5' : 'border-slate-800'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mb-4">
              <Link2 size={22} className="text-blue-500" />
            </div>
            <h3 className="text-white font-semibold mb-1">Share Link</h3>
            <p className="text-slate-400 text-xs mb-5">Import from a public AI conversation link</p>
            <button
              type="button"
              onClick={() => setActiveMethod(activeMethod === 'link' ? null : 'link')}
              className="w-full border border-blue-600/40 text-blue-400 text-sm font-medium py-2.5 rounded-lg hover:bg-blue-600/10 transition-colors"
            >
              Use Share Link →
            </button>
          </div>

          <div
            className={`border rounded-xl p-6 flex flex-col items-center text-center transition-colors ${
              activeMethod === 'paste' ? 'border-blue-500 bg-blue-600/5' : 'border-slate-800'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mb-4">
              <Clipboard size={22} className="text-blue-500" />
            </div>
            <h3 className="text-white font-semibold mb-1">Paste Conversation</h3>
            <p className="text-slate-400 text-xs mb-5">Paste the full conversation text from your AI chat</p>
            <button
              type="button"
              onClick={() => setActiveMethod(activeMethod === 'paste' ? null : 'paste')}
              className="w-full border border-blue-600/40 text-blue-400 text-sm font-medium py-2.5 rounded-lg hover:bg-blue-600/10 transition-colors"
            >
              Paste Text →
            </button>
          </div>

          <div
            className={`border rounded-xl p-6 flex flex-col items-center text-center transition-colors ${
              activeMethod === 'upload' ? 'border-blue-500 bg-blue-600/5' : 'border-slate-800'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mb-4">
              <UploadCloud size={22} className="text-blue-500" />
            </div>
            <h3 className="text-white font-semibold mb-1">Upload File</h3>
            <p className="text-slate-400 text-xs mb-5">Upload an exported conversation file</p>
            <button
              type="button"
              onClick={() => setActiveMethod(activeMethod === 'upload' ? null : 'upload')}
              className="w-full border border-blue-600/40 text-blue-400 text-sm font-medium py-2.5 rounded-lg hover:bg-blue-600/10 transition-colors"
            >
              Upload File →
            </button>
          </div>
        </div>

        {activeMethod && (
          <>
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-slate-800" />
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {activeMethod === 'link' && (
              <div className="border border-slate-800 rounded-2xl p-8">
                <h3 className="text-white font-semibold mb-3">Paste your share link</h3>
                <input
                  type="url"
                  placeholder="https://chat.openai.com/share/..."
                  className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            {activeMethod === 'paste' && (
              <div className="border border-slate-800 rounded-2xl p-8">
                <h3 className="text-white font-semibold mb-3">Paste your conversation</h3>
                <textarea
                  rows={8}
                  placeholder="Paste the full conversation text here..."
                  className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
            )}

            {activeMethod === 'upload' && (
              <div className="border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center py-14 px-8 cursor-pointer">
                <FileText size={32} className="text-slate-500 mb-4" />
                <h3 className="text-white font-semibold mb-1">Drag & drop your file here</h3>
                <p className="text-slate-400 text-sm mb-5">or click to browse</p>
                <div className="flex gap-2">
                  <span className="border border-slate-700 text-slate-400 text-xs px-3 py-1.5 rounded-lg">.txt</span>
                  <span className="border border-slate-700 text-slate-400 text-xs px-3 py-1.5 rounded-lg">.md</span>
                  <span className="border border-slate-700 text-slate-400 text-xs px-3 py-1.5 rounded-lg">.html</span>
                  <span className="border border-slate-700 text-slate-400 text-xs px-3 py-1.5 rounded-lg">.json</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <button
        type="button"
        onClick={() => navigate('/processing')}
        className={`w-full mt-6 text-white font-semibold text-sm py-3.5 rounded-xl transition-all ${
          activeMethod
            ? 'bg-blue-600 hover:bg-blue-700 opacity-100 pointer-events-auto'
            : 'bg-blue-600 opacity-0 pointer-events-none'
        }`}
      >
        Analyze Conversation
      </button>

      <div className="flex items-center justify-between mt-6 px-2">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Lock size={16} />
          <p>All processing happens locally on your device. Your conversation is never stored.</p>
        </div>
        <span className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-medium px-3 py-1.5 rounded-lg">
          <ShieldCheck size={14} />
          100% Private
        </span>
      </div>
    </div>
  )
}

export default Import
