import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileText, Check, Circle, Trash2, Lock, ShieldCheck,
  Target, Activity, CheckCircle2, ClipboardCheck, ClipboardList,
  Shield, HelpCircle, Key, ArrowRight, Package, Server
} from 'lucide-react'

const TOTAL_MESSAGES = 24

function Processing() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  const messagesRead = Math.min(TOTAL_MESSAGES, Math.round((Math.min(progress, 15) / 15) * TOTAL_MESSAGES))

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

  const steps = [
    { threshold: 15, label: messagesRead < TOTAL_MESSAGES ? `Reading message ${messagesRead} of ${TOTAL_MESSAGES}...` : 'Reading conversation' },
    { threshold: 30, label: 'Detecting topics' },
    { threshold: 45, label: 'Extracting decisions' },
    { threshold: 58, label: 'Finding tasks' },
    { threshold: 70, label: 'Identifying constraints' },
    { threshold: 85, label: 'Finding open questions & key facts' },
  ]

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
                <circle cx="100" cy="100" r={radius} stroke="currentColor" strokeWidth="14" fill="none" className="text-slate-800" />
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
              {steps.map(({ threshold, label }) => (
                <div key={label.startsWith('Reading') ? 'reading' : label} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${progress >= threshold ? 'bg-green-500' : 'bg-slate-800'}`}>
                    {progress >= threshold && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-slate-200 text-sm">{label}</span>
                </div>
              ))}

              <div className="flex gap-3">
                {progress >= 100 ? (
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <Circle size={20} className={`shrink-0 ${progress >= 85 ? 'text-blue-500' : 'text-slate-700'}`} strokeWidth={2.5} />
                )}
                <div>
                  <p className={`text-sm font-medium ${progress >= 85 ? 'text-white' : 'text-slate-600'}`}>Building Context Package</p>
                  <p className="text-slate-500 text-xs mt-0.5">Organizing everything into a structured package.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Trash2 size={20} className={`shrink-0 ${progress >= 100 ? 'text-slate-400' : 'text-slate-700'}`} />
                <div>
                  <p className={`text-sm font-medium ${progress >= 100 ? 'text-slate-300' : 'text-slate-600'}`}>Deleting raw conversation...</p>
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
      <div className="w-56 shrink-0 ml-auto flex flex-col gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <h3 className="text-white font-semibold mb-4 text-sm">Extraction Summary</h3>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target size={14} className="text-blue-400 shrink-0" />
                <span className="text-slate-300 text-xs">Goals</span>
              </div>
              <span className="text-white text-xs font-semibold">{progress >= 30 ? 3 : 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-cyan-400 shrink-0" />
                <span className="text-slate-300 text-xs">Current State</span>
              </div>
              <span className="text-white text-xs font-semibold">{progress >= 30 ? 2 : 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                <span className="text-slate-300 text-xs">Decisions</span>
              </div>
              <span className="text-white text-xs font-semibold">{progress >= 45 ? 12 : 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardCheck size={14} className="text-teal-400 shrink-0" />
                <span className="text-slate-300 text-xs">Completed Work</span>
              </div>
              <span className="text-white text-xs font-semibold">{progress >= 58 ? 9 : 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardList size={14} className="text-yellow-500 shrink-0" />
                <span className="text-slate-300 text-xs">Tasks</span>
              </div>
              <span className="text-white text-xs font-semibold">{progress >= 58 ? 8 : 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-purple-400 shrink-0" />
                <span className="text-slate-300 text-xs">Constraints</span>
              </div>
              <span className="text-white text-xs font-semibold">{progress >= 70 ? 6 : 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key size={14} className="text-orange-400 shrink-0" />
                <span className="text-slate-300 text-xs">Key Facts</span>
              </div>
              <span className="text-white text-xs font-semibold">{progress >= 85 ? 7 : 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle size={14} className="text-slate-400 shrink-0" />
                <span className="text-slate-300 text-xs">Open Questions</span>
              </div>
              <span className="text-white text-xs font-semibold">{progress >= 85 ? 3 : 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowRight size={14} className="text-red-400 shrink-0" />
                <span className="text-slate-300 text-xs">Next Action</span>
              </div>
              <span className="text-white text-xs font-semibold">{progress >= 85 ? 1 : 0}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
            <span className="text-blue-400 text-xs font-medium">Total Items</span>
            <span className="text-blue-400 text-xs font-bold">{progress >= 85 ? 51 : 0}</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <h3 className="text-white font-semibold mb-4 text-sm">Privacy Status</h3>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-green-500" />
                <span className="text-slate-300 text-xs">Processing</span>
              </div>
              <span className="text-green-500 text-xs font-medium">Local Only</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trash2 size={14} className="text-yellow-500" />
                <span className="text-slate-300 text-xs">Raw Conversation</span>
              </div>
              <span className="text-yellow-500 text-xs font-medium">Temporary</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server size={14} className="text-slate-400" />
                <span className="text-slate-300 text-xs">Stored on Server</span>
              </div>
              <span className="text-slate-200 text-xs font-medium">No</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package size={14} className="text-blue-400" />
                <span className="text-slate-300 text-xs">Context Package</span>
              </div>
              <span className="text-blue-400 text-xs font-medium">{progress >= 100 ? 'Ready' : 'Building'}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key size={14} className="text-green-500" />
                <span className="text-slate-300 text-xs">Encryption</span>
              </div>
              <span className="text-green-500 text-xs font-medium">AES-256</span>
            </div>
          </div>
        </div>

        <div className="border border-blue-600/30 bg-blue-600/5 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={14} className="text-blue-400" />
            <h4 className="text-blue-400 font-semibold text-xs">Your privacy is our priority</h4>
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
