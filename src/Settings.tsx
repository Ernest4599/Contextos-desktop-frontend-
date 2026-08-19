import { Moon, Package, Key, Star, Trash2, Info, ChevronRight } from 'lucide-react'
import Logo from './Logo'

function Settings() {
  return (
    <div className="flex-1 p-6 h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
      <p className="text-slate-400 mb-8">Manage your app preferences</p>

      <p className="text-slate-500 text-xs font-medium mb-3">APPEARANCE</p>
      <div className="border border-slate-800 rounded-2xl overflow-hidden mb-8">
        <button
          type="button"
          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-900 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <Moon size={18} className="text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-white font-medium text-sm">Theme</p>
            <p className="text-slate-500 text-xs mt-0.5">Dark</p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </button>
      </div>

      <p className="text-slate-500 text-xs font-medium mb-3">DATA & PACKAGES</p>
      <div className="border border-slate-800 rounded-2xl overflow-hidden mb-8">
        <button
          type="button"
          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-900 transition-colors border-b border-slate-800"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <Package size={18} className="text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-white font-medium text-sm">Packages</p>
            <p className="text-slate-500 text-xs mt-0.5">Manage your saved Context Packages</p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-900 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <Key size={18} className="text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-white font-medium text-sm">Recovery Key</p>
            <p className="text-slate-500 text-xs mt-0.5">Back up and restore access to your local ContextOS data</p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </button>
      </div>

      <p className="text-slate-500 text-xs font-medium mb-3">ACCOUNT</p>
      <div className="border border-slate-800 rounded-2xl overflow-hidden mb-8">
        <button
          type="button"
          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-900 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <Star size={18} className="text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-white font-medium text-sm">My License</p>
            <p className="text-slate-500 text-xs mt-0.5">Plan, credits, and upgrades</p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </button>
      </div>

      <p className="text-slate-500 text-xs font-medium mb-3">DANGER ZONE</p>
      <div className="border border-slate-800 rounded-2xl overflow-hidden mb-8">
        <button
          type="button"
          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-900 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center shrink-0">
            <Trash2 size={18} className="text-red-500" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-red-500 font-medium text-sm">Clear All Data</p>
            <p className="text-slate-500 text-xs mt-0.5">Permanently delete all local ContextOS data</p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </button>
      </div>

      <p className="text-slate-500 text-xs font-medium mb-3">ABOUT</p>
      <div className="border border-slate-800 rounded-2xl overflow-hidden mb-10">
        <button
          type="button"
          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-900 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <Info size={18} className="text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-white font-medium text-sm">About ContextOS</p>
            <p className="text-slate-500 text-xs mt-0.5">App information, version and legal details</p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </button>
      </div>

      <div className="flex flex-col items-center text-center pb-8">
        <div className="flex items-center gap-2 mb-1">
          <Logo size={20} />
          <span className="text-white font-semibold">ContextOS</span>
        </div>
        <p className="text-slate-500 text-xs">Version 1.0.0</p>
      </div>
    </div>
  )
}

export default Settings
