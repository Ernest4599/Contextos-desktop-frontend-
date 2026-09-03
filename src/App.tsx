import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Lightbulb, Menu } from 'lucide-react'
import Sidebar from './Sidebar'
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
import TermsPage from './TermsPage'
import { TermsProvider, useTerms } from './lib/TermsContext'

function DashboardLayout() {
  const location = useLocation()
  const [overlaySidebarOpen, setOverlaySidebarOpen] = useState(false)
  const { accepted, loading } = useTerms()

  useEffect(() => {
    document.body.style.overflow = overlaySidebarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [overlaySidebarOpen])

  if (location.pathname !== '/home') {
    if (loading) return null
    if (!accepted) {
      return <Navigate to="/home" replace />
    }
  }

  const tipExtra =
    location.pathname === '/prompt-ready' ? (
      <div className="flex gap-2">
        <Lightbulb size={16} className="text-yellow-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-slate-900 dark:text-white text-sm font-medium">Tip</p>
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

  return (
    <div className="flex bg-cream dark:bg-slate-900 h-dvh relative overflow-hidden">
      {overlaySidebarOpen ? (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOverlaySidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 z-50 h-dvh">
            <Sidebar extra={tipExtra} onClose={() => setOverlaySidebarOpen(false)} />
          </div>
        </>
      ) : (
        <>
          {/* Desktop collapsed rail — unchanged, hidden on mobile */}
          <button
            type="button"
            onClick={() => setOverlaySidebarOpen(true)}
            aria-label="Open sidebar"
            className="hidden md:flex w-12 h-dvh bg-cream dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 items-start justify-center pt-4 shrink-0 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            <Menu size={20} className="text-slate-500 dark:text-slate-400" />
          </button>

          {/* Mobile floating hamburger — no rail/strip */}
          <button
            type="button"
            onClick={() => setOverlaySidebarOpen(true)}
            aria-label="Open sidebar"
            className="md:hidden fixed top-3 left-3 z-30 p-2 rounded-lg bg-cream/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            <Menu size={20} className="text-slate-500 dark:text-slate-400" />
          </button>
        </>
      )}
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
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route
        path="/*"
        element={
          <TermsProvider>
            <DashboardLayout />
          </TermsProvider>
        }
      />
    </Routes>
  )
}

export default App
