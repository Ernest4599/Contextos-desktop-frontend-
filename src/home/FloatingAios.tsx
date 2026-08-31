import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, X, ArrowRight, Send } from 'lucide-react'
import { callQuickPrompt } from '../lib/api'

const BUBBLE_SIZE = 56
const DRAG_THRESHOLD = 6
const PANEL_WIDTH = 300
const PANEL_GAP = 12

function FloatingAios() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  const [task, setTask] = useState('')
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState<string | null>(null)

  const draggingRef = useRef(false)
  const movedRef = useRef(false)
  const startRef = useRef({ pointerX: 0, pointerY: 0, bubbleX: 0, bubbleY: 0 })

  useEffect(() => {
    const timeoutId = setTimeout(() => setOpen(true), 900)
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    setPos({
      x: window.innerWidth - BUBBLE_SIZE - 20,
      y: window.innerHeight - BUBBLE_SIZE - 20,
    })
  }, [])

  const clamp = (x: number, y: number) => {
    const maxX = window.innerWidth - BUBBLE_SIZE
    const maxY = window.innerHeight - BUBBLE_SIZE
    return { x: Math.min(Math.max(x, 0), maxX), y: Math.min(Math.max(y, 0), maxY) }
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!pos) return
    draggingRef.current = true
    movedRef.current = false
    startRef.current = { pointerX: e.clientX, pointerY: e.clientY, bubbleX: pos.x, bubbleY: pos.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!draggingRef.current) return
    const dx = e.clientX - startRef.current.pointerX
    const dy = e.clientY - startRef.current.pointerY
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      movedRef.current = true
    }
    setPos(clamp(startRef.current.bubbleX + dx, startRef.current.bubbleY + dy))
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    draggingRef.current = false
    e.currentTarget.releasePointerCapture(e.pointerId)
    if (!movedRef.current) {
      setDismissed(false)
      setOpen(true)
    }
  }

  const handleGenerate = async () => {
    if (!task.trim() || generating) return
    setGenError(null)
    setGenerating(true)
    const startedAt = performance.now()

    try {
      const result = await callQuickPrompt('', '', task.trim())
      const elapsedSeconds = (performance.now() - startedAt) / 1000

      if (!result.success) {
        setGenError(result.error ?? 'Something went wrong')
        setGenerating(false)
        return
      }

      navigate('/prompt-ready', {
        state: {
          role: result.role,
          prompt: result.prompt,
          assumptions: result.assumptions,
          outputFormat: result.output_format,
          elapsedSeconds,
        },
      })
    } catch (err) {
      setGenError(err instanceof Error ? err.message : 'Failed to reach the server')
      setGenerating(false)
    }
  }

  if (!pos) return null

  const isRightHalf = pos.x + BUBBLE_SIZE / 2 > window.innerWidth / 2
  const isBottomHalf = pos.y + BUBBLE_SIZE / 2 > window.innerHeight / 2

  const panelStyle: React.CSSProperties = {}
  if (isRightHalf) {
    panelStyle.right = Math.max(20, window.innerWidth - pos.x - BUBBLE_SIZE)
  } else {
    panelStyle.left = Math.max(20, Math.min(pos.x, window.innerWidth - PANEL_WIDTH - 20))
  }
  if (isBottomHalf) {
    panelStyle.bottom = Math.max(20, window.innerHeight - pos.y + PANEL_GAP)
  } else {
    panelStyle.top = Math.max(20, pos.y + BUBBLE_SIZE + PANEL_GAP)
  }

  const originClass = `origin-${isBottomHalf ? 'bottom' : 'top'}-${isRightHalf ? 'right' : 'left'}`

  return (
    <>
      {/* Panel */}
      <div
        style={panelStyle}
        className={`fixed z-50 w-[300px] ${originClass} rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl shadow-black/20 dark:shadow-black/60 transition-all duration-300 ${
          open && !dismissed
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-3 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600/10 dark:bg-blue-600/20">
              <Sparkles size={14} className="text-blue-500 dark:text-blue-400" />
            </div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">AIOS</span>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Close"
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-4 py-4">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            AIOS learns what matters about you — your goals, preferences, and way of working — then uses it to personalize every prompt you build.
          </p>

          <label className="text-slate-900 dark:text-white text-xs font-medium block mb-1.5">
            What do you need a prompt for?
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 mb-2">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="e.g. a cold email to a client"
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!task.trim() || generating}
              aria-label="Generate prompt"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
            >
              <Send size={13} />
            </button>
          </div>
          {generating && <p className="text-slate-500 text-xs mb-2">Generating your prompt...</p>}
          {genError && <p className="text-red-400 text-xs mb-2">{genError}</p>}

          <button
            type="button"
            onClick={() => navigate('/aios')}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium py-2 transition-colors"
          >
            Open AIOS
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Draggable floating bubble */}
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        aria-label="Open AIOS"
        style={{
          left: pos.x,
          top: pos.y,
          width: BUBBLE_SIZE,
          height: BUBBLE_SIZE,
          touchAction: 'none',
        }}
        className={`fixed z-50 flex cursor-grab items-center justify-center rounded-full bg-blue-800 shadow-2xl shadow-blue-950/50 transition-[transform,opacity] duration-200 active:cursor-grabbing hover:scale-105 ${
          open && !dismissed ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <Sparkles size={22} className="text-white" />
      </button>
    </>
  )
}

export default FloatingAios
