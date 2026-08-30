import { ArrowRight, MessageCircle, Sparkles, Plus, Globe, Mic, Send } from 'lucide-react'

function ConversationPanel() {
  const messages = [
    { author: 'You', text: "Let's rethink the positioning for our product..." },
    { author: 'AI', text: "Based on everything we've discussed, here's a new angle..." },
    { author: 'You', text: 'Actually, I think we should focus more on this problem...' },
    { author: 'AI', text: "Good call. Here's how that changes our approach..." },
  ]
  return (
    <div className="w-[clamp(140px,26vw,340px)] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#050b13] p-[clamp(8px,1.4vw,20px)] shadow-xl">
      <div className="mb-[clamp(6px,1vw,16px)] flex items-center justify-between">
        <span className="text-[clamp(9px,1vw,13px)] font-medium text-slate-900 dark:text-white">Old Conversation</span>
        <span className="rounded-md bg-slate-200 dark:bg-slate-800 px-[clamp(4px,0.6vw,8px)] py-[clamp(2px,0.3vw,4px)] text-[clamp(6px,0.6vw,9px)] text-slate-600 dark:text-slate-400">
          847 messages
        </span>
      </div>
      <div className="space-y-[clamp(4px,0.8vw,12px)]">
        {messages.map((m, i) => (
          <div key={i} className="flex items-start gap-[clamp(3px,0.6vw,8px)]">
            <div
              className={`flex h-[clamp(12px,1.6vw,22px)] w-[clamp(12px,1.6vw,22px)] shrink-0 items-center justify-center rounded-full ${
                m.author === 'You' ? 'bg-emerald-600/30 text-emerald-400' : 'bg-blue-600/30 text-blue-400'
              }`}
            >
              {m.author === 'You' ? (
                <MessageCircle className="h-[clamp(6px,0.8vw,11px)] w-[clamp(6px,0.8vw,11px)]" />
              ) : (
                <Sparkles className="h-[clamp(6px,0.8vw,11px)] w-[clamp(6px,0.8vw,11px)]" />
              )}
            </div>
            <div className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-[clamp(5px,0.8vw,10px)]">
              <p className="mb-[clamp(1px,0.15vw,3px)] text-[clamp(6px,0.6vw,9px)] text-slate-500">{m.author}</p>
              <p className="text-[clamp(7px,0.75vw,11px)] leading-snug text-slate-300">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NewChatPanel() {
  return (
    <div className="relative w-[clamp(140px,26vw,340px)] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#050b13] p-[clamp(8px,1.4vw,20px)] shadow-xl">
      <div className="mb-[clamp(6px,1vw,16px)] flex items-center justify-between">
        <span className="text-[clamp(9px,1vw,13px)] font-medium text-slate-900 dark:text-white">New Chat</span>
        <span className="rounded-md bg-slate-200 dark:bg-slate-800 px-[clamp(4px,0.6vw,8px)] py-[clamp(2px,0.3vw,4px)] text-[clamp(6px,0.6vw,9px)] text-slate-600 dark:text-slate-400">
          0 messages
        </span>
      </div>
      <div className="flex h-[clamp(70px,10vw,140px)] items-center justify-center text-center text-[clamp(8px,0.85vw,13px)] text-slate-600">
        How can I help you today?
      </div>
      <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-[clamp(6px,0.9vw,14px)] py-[clamp(5px,0.7vw,10px)] text-slate-500 dark:text-slate-600">
        <div className="flex items-center gap-[clamp(4px,0.8vw,12px)]">
          <Plus className="h-[clamp(9px,0.9vw,15px)] w-[clamp(9px,0.9vw,15px)]" />
          <Globe className="h-[clamp(9px,0.9vw,15px)] w-[clamp(9px,0.9vw,15px)]" />
        </div>
        <div className="flex items-center gap-[clamp(4px,0.8vw,12px)]">
          <Mic className="h-[clamp(9px,0.9vw,15px)] w-[clamp(9px,0.9vw,15px)]" />
          <Send className="h-[clamp(9px,0.9vw,15px)] w-[clamp(9px,0.9vw,15px)]" />
        </div>
      </div>
    </div>
  )
}

function Problem() {
  return (
    <section className="border-b border-slate-200 dark:border-slate-800/60">
      <div className="mx-auto max-w-[1440px] px-[clamp(16px,4vw,96px)] py-[clamp(24px,4vw,64px)]">
        <div className="mb-[clamp(16px,3vw,40px)] max-w-2xl">
          <p className="mb-[clamp(4px,0.6vw,10px)] text-[clamp(8px,0.75vw,12px)] font-bold tracking-[0.2em] text-blue-400">
            THE PROBLEM
          </p>
          <h2 className="text-[clamp(22px,3.2vw,42px)] font-semibold leading-[1.08] tracking-tight text-slate-900 dark:text-white">
            You've already done
            <br />
            the hard part.
          </h2>
          <p className="mt-[clamp(6px,0.9vw,16px)] text-[clamp(11px,1.05vw,16px)] leading-6 text-slate-600 dark:text-slate-400">
            Hours of research, decisions and iterations—gone the moment you start a new chat.
          </p>
          <a
            href="#"
            className="mt-[clamp(6px,0.9vw,16px)] inline-block text-[clamp(10px,1vw,15px)] font-medium text-blue-400 hover:text-blue-300"
          >
            Why explain everything again? →
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-[clamp(8px,2vw,32px)]">
          <ConversationPanel />
          <div className="flex h-[clamp(24px,4vw,48px)] w-[clamp(24px,4vw,48px)] shrink-0 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-900/40 rotate-90 md:rotate-0">
            <ArrowRight className="h-[clamp(12px,2vw,20px)] w-[clamp(12px,2vw,20px)] text-white" />
          </div>
          <NewChatPanel />
        </div>
      </div>
    </section>
  )
}

export default Problem
