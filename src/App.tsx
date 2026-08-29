import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Lightbulb, Menu } from 'lucide-react'
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
import RequireAuth from './RequireAuth'
import TopNav from './TopNav'
import LicensePage from './LicensePage'
import RecoveryKeyPage from './RecoveryKeyPage'
import UpgradePage from './UpgradePage'
import AiosPreferencesPage from './AiosPreferencesPage'
import AiosOverview from './AiosOverview'
import AiosMemories from './AiosMemories'

const OVERLAY_SIDEBAR_ROUTES = ['/home', '/quick-prompt', '/import']

function DashboardLayout() {
  const location = useLocation()
  const isAiosRoute = location.pathname.startsWith('/aios')
  const isOverlaySidebarRoute = isAiosRoute || OVERLAY_SIDEBAR_ROUTES.includes(location.pathname)
  const [overlaySidebarOpen, setOverlaySidebarOpen] = useState(false)

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

  const routesElement = (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/quick-prompt" element={<QuickPrompt />} />
      <Route path="/projects" element={<RequireAuth featureName="Projects"><Projects /></RequireAuth>} />
      <Route path="/aios" element={<RequireAuth featureName="AIOS"><AiosOverview /></RequireAuth>} />
      <Route path="/aios/memories" element={<RequireAuth featureName="AIOS"><AiosMemories /></RequireAuth>} />
      <Route path="/import" element={<Import />} />
      <Route path="/processing" element={<Processing />} />
      <Route path="/package" element={<Package />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/license" element={<LicensePage />} />
      <Route path="/settings/recovery-key" element={<RecoveryKeyPage />} />
      <Route path="/settings/upgrade" element={<UpgradePage />} />
      <Route path="/settings/aios-preferences" element={<RequireAuth featureName="AIOS Preferences"><AiosPreferencesPage /></RequireAuth>} />
      <Route path="/account" element={<Account />} />
      <Route path="/context-ready" element={<ContextReady />} />
      <Route path="/prompt-ready" element={<PromptReady />} />
    </Routes>
  )

  if (isOverlaySidebarRoute) {
    return (
      <div className="flex bg-slate-900 min-h-screen relative">
        {overlaySidebarOpen ? (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setOverlaySidebarOpen(false)}
            />
            <div className="fixed left-0 top-0 z-50 h-screen">
              <Sidebar extra={tipExtra} />
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setOverlaySidebarOpen(true)}
            aria-label="Open sidebar"
            className="w-12 h-screen bg-slate-950 border-r border-slate-800 flex items-start justify-center pt-4 shrink-0 hover:bg-slate-900 transition-colors"
          >
            <Menu size={20} className="text-slate-400" />
          </button>
        )}
        <div className="flex-1 flex flex-col min-w-0">
          <TopNav />
          <div className="flex-1 overflow-y-auto">{routesElement}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex bg-slate-900 min-h-screen">
      <Sidebar extra={tipExtra} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <div className="flex-1 overflow-y-auto">{routesElement}</div>
      </div>
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
