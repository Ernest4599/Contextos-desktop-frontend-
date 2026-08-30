import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  FileText, Check, Circle, Trash2, Lock, ShieldCheck,
  Target, Activity, CheckCircle2, ClipboardCheck, ClipboardList,
  Shield, HelpCircle, Key, ArrowRight, Package, Server
} from 'lucide-react'
import { streamProcessPaste, streamProcessShareLink, streamProcessUpload } from './lib/api'

type LocationState =
  | { method: 'link'; url: string }
  | { method: 'paste'; text: string }
  | { method: 'upload'; file: File }

type Counts = {
  goals: number
  current_state: number
  decisions: number
  completed_work: number
  tasks: number
  constraints: number
  key_facts: number
  open_questions: number
  next_action: number
}

const STEP_ORDER = [
  'reading_conversation',
  'detecting_topics',
  'extracting_decisions',
  'finding_tasks',
  'identifying_constraints',
  'finding_open_questions',
  'next_action',
  'building_context_package',
  'deleting_raw_conversation',
] as const

function Processing() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null

  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [readingProgress, setReadingProgress] = useState({ current: 0, total: 0 })
  const [counts, setCounts] = useState<Counts>({
    goals: 0, current_state: 0, decisions: 0, completed_work: 0,
    tasks: 0, constraints: 0, key_facts: 0, open_questions: 0, next_action: 0,
  })
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const startedRef = useRef(false)

  const stepIndex = completedSteps.size
  const progress = Math.min(100, Math.round((stepIndex / STEP_ORDER.length) * 100))
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  useEffect(() => {
    if (!state || startedRef.current) return
    startedRef.current = true

    const onEvent = (evt: { event: string; data: any }) => {
      if (evt.event === 'progress' && evt.data.step === 'reading_conversation') {
        setReadingProgress({ current: evt.data.current, total: evt.data.total })
      } else if (evt.event === 'step' && evt.data.status === 'complete') {
        setCompletedSteps((prev) => new Set(prev).add(evt.data.step))

        setCounts((prev) => ({
          ...prev,
          goals: evt.data.goals ?? prev.goals,
          current_state: evt.data.current_state ?? prev.current_state,
          decisions: evt.data.decisions ?? prev.decisions,
          completed_work: evt.data.completed_work ?? prev.completed_work,
          tasks: evt.data.tasks ?? prev.tasks,
          constraints: evt.data.constraints ?? prev.constraints,
          key_facts: evt.data.key_facts ?? prev.key_facts,
          open_questions: evt.data.open_questions ?? prev.open_questions,
          next_action: evt.data.next_action ? 1 : prev.next_action,
        }))
      } else if (evt.event === 'complete') {
        setTimeout(() => {
          navigate('/context-ready', {
            state: {
              contextPackage: evt.data.context_package,
              summary: evt.data.extraction_summary,
            },
          })
        }, 500)
      } else if (evt.event === 'error') {
        setErrorMsg(evt.data.message)
      }
    }

    const handleFailure = (err: unknown) => {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to reach the server')
    }

    if (state.method === 'link') {
      streamProcessShareLink(state.url, onEvent).catch(handleFailure)
    } else if (state.method === 'paste') {
      streamProcessPaste(state.text, onEvent).catch(handleFailure)
    } else if (state.method === 'upload') {
      streamProcessUpload(state.file, onEvent).catch(handleFailure)
    }
  }, [state, navigate])

  const isDone = (step: string) => completedSteps.has(step)
  const totalItems = Object.values(counts).reduce((a, b) => a + b, 0)

  const readingLabel =
    readingProgress.total > 0 && !isDone('reading_conversation')
      ? `Reading message ${readingProgress.current} of ${readingProgress.total}...`
      : 'Reading conversation'

  const steps = [
    { key: 'reading_conversation', label: readingLabel },
    { key: 'detecting_topics', label: 'Detecting topics' },
    { key: 'extracting_decisions', label: 'Extracting decisions' },
    { key: 'finding_tasks', label: 'Finding tasks' },
    { key: 'identifying_constraints', label: 'Identifying constraints' },
    { key: 'finding_open_questions', label: 'Finding open questions & key facts' },
  ]

  return (
    <div className="flex-1 flex flex-col gap-6 p-4 h-dvh overflow-y-auto bg-cream dark:bg-transparent md:flex-row md:gap-8 md:p-6">
      {/* Center column */}
      <div className="flex-1">
        <div className="flex flex-col gap-3 items-start justify-between mb-2 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">Processing</h1>
          <button
            type="button"
            className="flex items-center gap-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          >
            <FileText size={16} />
            View logs
          </button>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-6 md:mb-8">ContextOS is analyzing your conversation and building your Context Package.</p>

        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 md:p-8">
          <h2 className="text-slate-900 dark:text-white text-lg font-semibold mb-1 md:text-xl">Analyzing your conversation...</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 md:mb-8">This will only take a few seconds.</p>

          {errorMsg && (
            <div className="border border-red-600/40 bg-red-600/10 text-red-400 text-sm rounded-xl px-5 py-4 mb-6">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-16">
            <div className="relative shrink-0" style={{ width: 200, height: 200 }}>
              <svg width="200" height="200" className="-rotate-90">
                <circle cx="100" cy="100" r={radius} stroke="currentColor" strokeWidth="14" fill="none" className="text-slate-200 dark:text-slate-800" />
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
                  className="text-blue-500 transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-slate-900 dark:text-white text-4xl font-bold">{progress}%</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 flex-1 w-full">
              {steps.map(({ key, label }) => (
                <div key={key} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isDone(key) ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-800'}`}>
                    {isDone(key) && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-slate-700 dark:text-slate-200 text-sm">{label}</span>
                </div>
              ))}

              <div className="flex gap-3">
                {isDone('building_context_package') ? (
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <Circle size={20} className={`shrink-0 ${isDone('next_action') ? 'text-blue-500' : 'text-slate-300 dark:text-slate-700'}`} strokeWidth={2.5} />
                )}
                <div>
                  <p className={`text-sm font-medium ${isDone('next_action') ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600'}`}>Building Context Package</p>
                  <p className="text-slate-500 text-xs mt-0.5">Organizing everything into a structured package.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Trash2 size={20} className={`shrink-0 ${isDone('deleting_raw_conversation') ? 'text-slate-500 dark:text-slate-400' : 'text-slate-300 dark:text-slate-700'}`} />
                <div>
                  <p className={`text-sm font-medium ${isDone('deleting_raw_conversation') ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}`}>Deleting raw conversation...</p>
                  <p className="text-slate-500 dark:text-slate-600 text-xs mt-0.5">Raw conversation will be permanently deleted after processing.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 border border-blue-600/30 bg-blue-600/5 rounded-xl px-5 py-4 mt-8">
            <Lock size={16} className="text-blue-500 dark:text-blue-400 mt-0.5" />
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Raw conversation will be permanently deleted after processing.</p>
              <p className="text-blue-600/70 dark:text-blue-400/70 text-sm">We don't keep what you don't need.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-start mt-6 px-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
            <ShieldCheck size={16} className="text-green-500" />
            <p>Processing locally on this device. Your conversation is never uploaded or stored anywhere.</p>
          </div>
          <span className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-500 text-xs font-medium px-3 py-1.5 rounded-lg">
            <FileText size={14} />
            Local Only
          </span>
        </div>
      </div>

      {/* Right column */}
      <div className="w-full shrink-0 flex flex-col gap-4 md:w-56 md:ml-auto">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3">
          <h3 className="text-slate-900 dark:text-white font-semibold mb-4 text-sm">Extraction Summary</h3>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target size={14} className="text-blue-500 dark:text-blue-400 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 text-xs">Goals</span>
              </div>
              <span className="text-slate-900 dark:text-white text-xs font-semibold">{counts.goals}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-cyan-500 dark:text-cyan-400 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 text-xs">Current State</span>
              </div>
              <span className="text-slate-900 dark:text-white text-xs font-semibold">{counts.current_state}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 text-xs">Decisions</span>
              </div>
              <span className="text-slate-900 dark:text-white text-xs font-semibold">{counts.decisions}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardCheck size={14} className="text-teal-500 dark:text-teal-400 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 text-xs">Completed Work</span>
              </div>
              <span className="text-slate-900 dark:text-white text-xs font-semibold">{counts.completed_work}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardList size={14} className="text-yellow-500 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 text-xs">Tasks</span>
              </div>
              <span className="text-slate-900 dark:text-white text-xs font-semibold">{counts.tasks}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-purple-500 dark:text-purple-400 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 text-xs">Constraints</span>
              </div>
              <span className="text-slate-900 dark:text-white text-xs font-semibold">{counts.constraints}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key size={14} className="text-orange-500 dark:text-orange-400 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 text-xs">Key Facts</span>
              </div>
              <span className="text-slate-900 dark:text-white text-xs font-semibold">{counts.key_facts}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle size={14} className="text-slate-500 dark:text-slate-400 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 text-xs">Open Questions</span>
              </div>
              <span className="text-slate-900 dark:text-white text-xs font-semibold">{counts.open_questions}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowRight size={14} className="text-red-500 dark:text-red-400 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 text-xs">Next Action</span>
              </div>
              <span className="text-slate-900 dark:text-white text-xs font-semibold">{counts.next_action}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">Total Items</span>
            <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">{totalItems}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3">
          <h3 className="text-slate-900 dark:text-white font-semibold mb-4 text-sm">Privacy Status</h3>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-green-500" />
                <span className="text-slate-700 dark:text-slate-300 text-xs">Processing</span>
              </div>
              <span className="text-green-500 text-xs font-medium">Local Only</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trash2 size={14} className="text-yellow-500" />
                <span className="text-slate-700 dark:text-slate-300 text-xs">Raw Conversation</span>
              </div>
              <span className="text-yellow-500 text-xs font-medium">Temporary</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server size={14} className="text-slate-500 dark:text-slate-400" />
                <span className="text-slate-700 dark:text-slate-300 text-xs">Stored on Server</span>
              </div>
              <span className="text-slate-700 dark:text-slate-200 text-xs font-medium">No</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package size={14} className="text-blue-500 dark:text-blue-400" />
                <span className="text-slate-700 dark:text-slate-300 text-xs">Context Package</span>
              </div>
              <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">{isDone('building_context_package') ? 'Ready' : 'Building'}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key size={14} className="text-green-500" />
                <span className="text-slate-700 dark:text-slate-300 text-xs">Encryption</span>
              </div>
              <span className="text-green-500 text-xs font-medium">AES-256</span>
            </div>
          </div>
        </div>

        <div className="border border-blue-600/30 bg-blue-600/5 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={14} className="text-blue-500 dark:text-blue-400" />
            <h4 className="text-blue-600 dark:text-blue-400 font-semibold text-xs">Your privacy is our priority</h4>
          </div>
          <p className="text-blue-600/70 dark:text-blue-400/70 text-xs leading-relaxed">
            We process everything locally and delete raw conversations after processing.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Processing
