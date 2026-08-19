import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Check, Circle, Trash2, Lock, ShieldCheck, MessageSquare, ClipboardList, Shield, HelpCircle, Package, Server, Key } from 'lucide-react'

function Processing() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 60)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        navigate('/context-ready')
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [progress, navigate])

  return (
    <div className="flex-1 flex gap-8 p-6 h-screen overflow-y-auto">
      {/* Center column */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-3xl font-bold text-white">Processing</h1>
          <button
            type="button"
            className="flex items-center gap-2 border border-slate-700 text-slate-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <FileText size={16} />
            View logs
          </button>
        </div>
        <p className="text-slate-400 mb-8">ContextOS is analyzing your conversation and building your Context Package.</p>

        <div className="border border-slate-800 rounded-2xl p-8">
          <h2 className="text-white text-xl font-semibold mb-1">Analyzing your conversation...</h2>
          <p className="text-slate-400 text-sm mb-8">This will only take a few seconds.</p>

          <div className="flex items-center gap-16">
            <div className="relative shrink-0" style={{ width: 200, height: 200 }}>
              <svg width="200" height="200" className="-rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="14"
                  fill="none"
                  className="text-slate-800"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="14"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="text-blue-500 transition-all duration-100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">{progress}%</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${progress >= 20 ? 'bg-green-500' : 'bg-slate-800'}`}>
                  {progress >= 20 && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-slate-200 text-sm">Reading conversation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${progress >= 40 ? 'bg-green-500' : 'bg-slate-800'}`}>
                  {progress >= 40 && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-slate-200 text-sm">Detecting topics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${progress >= 55 ? 'bg-green-500' : 'bg-slate-800'}`}>
                  {progress >= 55 && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-slate-200 text-sm">Extracting decisions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${progress >= 70 ? 'bg-green-500' : 'bg-slate-800'}`}>
                  {progress >= 70 && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-slate-200 text-sm">Finding tasks</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${progress >= 85 ? 'bg-green-500' : 'bg-slate-800'}`}>
                  {progress >= 85 && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-slate-200 text-sm">Identifying constraints</span>
              </div>
              <div className="flex gap-3">
                {progress >= 100 ? (
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <Circle size={20} className="text-blue-500 shrink-0" strokeWidth={2.5} />
                )}
                <div>
                  <p className="text-white text-sm font-medium">Building Context Package</p>
                  <p className="text-slate-500 text-xs mt-0.5">Organizing everything into a structured package.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Trash2 size={20} className="text-slate-600 shrink-0" />
                <div>
                  <p className="text-slate-500 text-sm font-medium">Deleting raw conversation...</p>
                  <p className="text-slate-600 text-xs mt-0.5">Raw conversation will be permanently deleted after processing.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 border border-blue-600/30 bg-blue-600/5 rounded-xl px-5 py-4 mt-8">
            <Lock size={16} className="text-blue-400 mt-0.5" />
            <div>
              <p className="text-blue-400 text-sm font-medium">Raw conversation will be permanently deleted after processing.</p>
              <p className="text-blue-400/70 text-sm">We don't keep what you don't need.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 px-2">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <ShieldCheck size={16} className="text-green-500" />
            <p>Processing locally on this device. Your conversation is never uploaded or stored anywhere.</p>
          </div>
          <span className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-medium px-3 py-1.5 rounded-lg">
            <FileText size={14} />
            Local Only
          </span>
        </div>
      </div>

      {/* Right column */}
      <div className="w-50 shrink-0 ml-auto flex flex-col gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2">
          <h3 className="text-white font-semibold mb-4">Extraction Summary</h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-blue-400" />
                <span className="text-slate-300 text-sm">Topics Detected</span>
              </div>
              <span className="text-white text-sm font-semibold">18</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span className="text-slate-300 text-sm">Decisions Found</span>
              </div>
              <span className="text-white text-sm font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardList size={16} className="text-yellow-500" />
                <span className="text-slate-300 text-sm">Tasks Identified</span>
              </div>
              <span className="text-white text-sm font-semibold">8</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-purple-400" />
                <span className="text-slate-300 text-sm">Constraints Found</span>
              </div>
              <span className="text-white text-sm font-semibold">6</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle size={16} className="text-slate-400" />
                <span className="text-slate-300 text-sm">Open Questions</span>
              </div>
              <span className="text-white text-sm font-semibold">3</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
            <span className="text-blue-400 text-sm font-medium">Total Items Extracted</span>
            <span className="text-blue-400 text-sm font-bold">47</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2">
          <h3 className="text-white font-semibold mb-4">Privacy Status</h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-green-500" />
                <span className="text-slate-300 text-sm">Processing</span>
              </div>
              <span className="text-green-500 text-sm font-medium">Local Only</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trash2 size={16} className="text-yellow-500" />
                <span className="text-slate-300 text-sm">Raw Conversation</span>
              </div>
              <span className="text-yellow-500 text-sm font-medium">Temporary</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server size={16} className="text-slate-400" />
                <span className="text-slate-300 text-sm">Stored on Server</span>
              </div>
              <span className="text-slate-200 text-sm font-medium">No</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package size={16} className="text-blue-400" />
                <span className="text-slate-300 text-sm">Context Package</span>
              </div>
              <span className="text-blue-400 text-sm font-medium">Building</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key size={16} className="text-green-500" />
                <span className="text-slate-300 text-sm">Encryption</span>
              </div>
              <span className="text-green-500 text-sm font-medium">AES-256</span>
            </div>
          </div>
        </div>

        <div className="border border-blue-600/30 bg-blue-600/5 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-blue-400" />
            <h4 className="text-blue-400 font-semibold text-sm">Your privacy is our priority</h4>
          </div>
          <p className="text-blue-400/70 text-xs leading-relaxed">
            We process everything locally and delete raw conversations after processing.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Processing
