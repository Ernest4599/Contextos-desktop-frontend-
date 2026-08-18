import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Home from './Home'
import Import from './Import'
import ComingSoon from './ComingSoon'

function App() {
  return (
    <div className="flex bg-slate-900 min-h-screen">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quick-prompt" element={<ComingSoon title="Quick Prompt" />} />
        <Route path="/projects" element={<ComingSoon title="Projects" />} />
        <Route path="/import" element={<Import />} />
        <Route path="/package" element={<ComingSoon title="Package" />} />
        <Route path="/settings" element={<ComingSoon title="Settings" />} />
      </Routes>
    </div>
  )
}

export default App
