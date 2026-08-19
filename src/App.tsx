import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Home from './Home'
import Import from './Import'
import Processing from './Processing'
import QuickPrompt from './QuickPrompt'
import Package from './Package'
import Settings from './Settings'
import Projects from './Projects'
import Account from './Account'

function App() {
  return (
    <div className="flex bg-slate-900 min-h-screen">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quick-prompt" element={<QuickPrompt />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/import" element={<Import />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/package" element={<Package />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  )
}

export default App
