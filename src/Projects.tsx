import { Plus, Folder, Users, Target, BarChart3, BookOpen, MoreVertical, ChevronRight, Briefcase } from 'lucide-react'

const projects = [
  {
    name: 'AI Memory OS',
    status: 'Research',
    statusColor: 'text-purple-400',
    dotColor: 'bg-purple-400',
    updated: 'Updated 2h ago',
    icon: Folder,
    iconBg: 'bg-purple-600/10',
    iconColor: 'text-purple-400',
  },
  {
    name: 'Client Onboarding',
    status: 'Planning',
    statusColor: 'text-green-400',
    dotColor: 'bg-green-400',
    updated: 'Updated yesterday',
    icon: Users,
    iconBg: 'bg-green-600/10',
    iconColor: 'text-green-400',
  },
  {
    name: 'SaaS Landing Page',
    status: 'Execution',
    statusColor: 'text-blue-400',
    dotColor: 'bg-blue-400',
    updated: 'Updated 3 days ago',
    icon: Target,
    iconBg: 'bg-blue-600/10',
    iconColor: 'text-blue-400',
  },
  {
    name: 'Content Strategy System',
    status: 'Research',
    statusColor: 'text-yellow-400',
    dotColor: 'bg-yellow-400',
    updated: 'Updated 5 days ago',
    icon: BarChart3,
    iconBg: 'bg-yellow-600/10',
    iconColor: 'text-yellow-400',
  },
  {
    name: 'Personal Knowledge Base',
    status: 'Ongoing',
    statusColor: 'text-teal-400',
    dotColor: 'bg-teal-400',
    updated: 'Updated 1 week ago',
    icon: BookOpen,
    iconBg: 'bg-teal-600/10',
    iconColor: 'text-teal-400',
  },
]

function Projects() {
  return (
    <div className="flex-1 p-6 h-screen overflow-y-auto">
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>
      <p className="text-slate-400 mb-8">Your AI projects, saved securely on this device/account.</p>

      <div className="flex flex-col gap-4">
        {projects.map(({ name, status, statusColor, dotColor, updated, icon: Icon, iconBg, iconColor }) => (
          <div
            key={name}
            className="border border-slate-800 rounded-2xl p-5 flex items-center gap-4 hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
              <Icon size={22} className={iconColor} />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1.5">{name}</h3>
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                <span className={`text-sm ${statusColor}`}>{status}</span>
              </div>
              <p className="text-slate-500 text-sm">{updated}</p>
            </div>
            <button type="button" className="text-slate-500 hover:text-slate-300 p-1">
              <MoreVertical size={18} />
            </button>
            <ChevronRight size={20} className="text-slate-500" />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center text-center mt-10 pb-8">
        <Briefcase size={28} className="text-slate-600 mb-3" />
        <h3 className="text-white font-semibold mb-1">Everything in one place.</h3>
        <p className="text-slate-500 text-sm">Create a new project to start organizing your AI work.</p>
      </div>
    </div>
  )
}

export default Projects
