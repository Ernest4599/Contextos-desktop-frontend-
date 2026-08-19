import { Routes, Route, useLocation } from 'react-router-dom'
import { Lightbulb } from 'lucide-react'
import Sidebar from './Sidebar'
import Landing from './Landing'
import Home from './Home'
import Import from './Import'
import Processing from './Processing'
import QuickPrompt from './QuickPrompt'
import Package from './Package'
import Settings from './Settings'
import Projects from './Projects'
import Account from './Account'
import ContextReady from './ContextReady'
import PromptReady from './PromptReady'

function DashboardLayout() {
  const location = useLocation()

  const tipExtra =
    location.pathname === '/prompt-ready' ? (
      <div className="flex gap-2">
        <Lightbulb size={16} className="text-yellow-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-white text-sm font-medium">Tip</p>
          <p className="text-slate-500 text-xs mt-0.5">Be specific and include constraints for the best results.</p>
        </div>
      </div>
    ) : undefined

  return (
    <div className="flex bg-slate-900 min-h-screen">
      <Sidebar extra={tipExtra} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/quick-prompt" element={<QuickPrompt />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/import" element={<Import />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/package" element={<Package />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/account" element={<Account />} />
        <Route path="/context-ready" element={<ContextReady />} />
        <Route path="/prompt-ready" element={<PromptReady />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/*" element={<DashboardLayout />} />
    </Routes>
  )
}

export default App
