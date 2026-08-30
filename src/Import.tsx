import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { Info, Link2, Clipboard, UploadCloud, FileText, Lock, ShieldCheck } from 'lucide-react'

type ImportMethod = 'link' | 'paste' | 'upload' | null

function Import() {
  const navigate = useNavigate()
  const [activeMethod, setActiveMethod] = useState<ImportMethod>(null)
  const [linkValue, setLinkValue] = useState('')
  const [pasteValue, setPasteValue] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const canAnalyze =
    (activeMethod === 'link' && linkValue.trim() !== '') ||
    (activeMethod === 'paste' && pasteValue.trim() !== '') ||
    (activeMethod === 'upload' && file !== null)

  const handleAnalyze = () => {
    if (activeMethod === 'link') {
      navigate('/processing', { state: { method: 'link', url: linkValue.trim() } })
    } else if (activeMethod === 'paste') {
      navigate('/processing', { state: { method: 'paste', text: pasteValue } })
    } else if (activeMethod === 'upload' && file) {
      navigate('/processing', { state: { method: 'upload', file } })
    }
  }

  return (
    <div className="flex-1 p-4 h-dvh overflow-y-auto bg-cream dark:bg-transparent md:p-8">
      <div className="flex flex-col gap-3 items-start justify-between mb-2 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">Import</h1>
        <button
          type="button"
          className="flex items-center gap-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
        >
          <Info size={16} />
          How it works
        </button>
      </div>
      <p className="text-slate-600 dark:text-slate-400 mb-6 md:mb-8">Bring any AI conversation into ContextOS.</p>

      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 md:p-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-slate-900 dark:text-white text-lg font-semibold mb-1 md:text-xl">Choose how you want to import</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">We'll extract what matters and turn it into a Context Package.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div
            className={`border rounded-xl p-6 flex flex-col items-center text-center transition-colors ${
              activeMethod === 'link' ? 'border-blue-500 bg-blue-600/5' : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mb-4">
              <Link2 size={22} className="text-blue-500" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-1">Share Link</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs mb-5">Import from a public AI conversation link</p>
            <button
              type="button"
              onClick={() => setActiveMethod(activeMethod === 'link' ? null : 'link')}
              className="w-full border border-blue-600/40 text-blue-600 dark:text-blue-400 text-sm font-medium py-2.5 rounded-lg hover:bg-blue-600/10 transition-colors"
            >
              Use Share Link →
            </button>
          </div>

          <div
            className={`border rounded-xl p-6 flex flex-col items-center text-center transition-colors ${
              activeMethod === 'paste' ? 'border-blue-500 bg-blue-600/5' : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mb-4">
              <Clipboard size={22} className="text-blue-500" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-1">Paste Conversation</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs mb-5">Paste the full conversation text from your AI chat</p>
            <button
              type="button"
              onClick={() => setActiveMethod(activeMethod === 'paste' ? null : 'paste')}
              className="w-full border border-blue-600/40 text-blue-600 dark:text-blue-400 text-sm font-medium py-2.5 rounded-lg hover:bg-blue-600/10 transition-colors"
            >
              Paste Text →
            </button>
          </div>

          <div
            className={`border rounded-xl p-6 flex flex-col items-center text-center transition-colors ${
              activeMethod === 'upload' ? 'border-blue-500 bg-blue-600/5' : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mb-4">
              <UploadCloud size={22} className="text-blue-500" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-1">Upload File</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs mb-5">Upload an exported conversation file</p>
            <button
              type="button"
              onClick={() => setActiveMethod(activeMethod === 'upload' ? null : 'upload')}
              className="w-full border border-blue-600/40 text-blue-600 dark:text-blue-400 text-sm font-medium py-2.5 rounded-lg hover:bg-blue-600/10 transition-colors"
            >
              Upload File →
            </button>
          </div>
        </div>

        {activeMethod && (
          <>
            <div className="flex items-center gap-4 my-6 md:my-8">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            </div>

            {activeMethod === 'link' && (
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 md:p-8">
                <h3 className="text-slate-900 dark:text-white font-semibold mb-3">Paste your share link</h3>
                <input
                  type="url"
                  value={linkValue}
                  onChange={(e) => setLinkValue(e.target.value)}
                  placeholder="https://chat.openai.com/share/..."
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg px-4 py-3 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            {activeMethod === 'paste' && (
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 md:p-8">
                <h3 className="text-slate-900 dark:text-white font-semibold mb-3">Paste your conversation</h3>
                <textarea
                  rows={8}
                  value={pasteValue}
                  onChange={(e) => setPasteValue(e.target.value)}
                  placeholder="Paste the full conversation text here..."
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg px-4 py-3 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
            )}

            {activeMethod === 'upload' && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center py-10 px-4 cursor-pointer md:py-14 md:px-8"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,.html,.json"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <FileText size={32} className="text-slate-400 dark:text-slate-500 mb-4" />
                <h3 className="text-slate-900 dark:text-white font-semibold mb-1 text-center break-all">
                  {file ? file.name : 'Drag & drop your file here'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-5">{file ? 'Click to change' : 'or click to browse'}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs px-3 py-1.5 rounded-lg">.txt</span>
                  <span className="border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs px-3 py-1.5 rounded-lg">.md</span>
                  <span className="border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs px-3 py-1.5 rounded-lg">.html</span>
                  <span className="border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs px-3 py-1.5 rounded-lg">.json</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <button
        type="button"
        disabled={!canAnalyze}
        onClick={handleAnalyze}
        className={`w-full mt-6 text-white font-semibold text-sm py-3.5 rounded-xl transition-all ${
          activeMethod
            ? canAnalyze
              ? 'bg-blue-600 hover:bg-blue-700 opacity-100 pointer-events-auto'
              : 'bg-blue-600 opacity-50 pointer-events-none'
            : 'bg-blue-600 opacity-0 pointer-events-none'
        }`}
      >
        Analyze Conversation
      </button>

      <div className="flex flex-col gap-3 mt-6 px-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
          <Lock size={16} className="shrink-0" />
          <p>All processing happens locally on your device. Your conversation is never stored.</p>
        </div>
        <span className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-500 text-xs font-medium px-3 py-1.5 rounded-lg w-fit">
          <ShieldCheck size={14} />
          100% Private
        </span>
      </div>
    </div>
  )
}

export default Import
