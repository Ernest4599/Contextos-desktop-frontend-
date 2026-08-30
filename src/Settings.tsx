import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Moon, Sun, Monitor, Package, Key, Star, Sparkles, Trash2, Info, ChevronRight } from 'lucide-react'
import Logo from './Logo'
import { clearAllData } from './lib/api'
import { useTheme, type ThemeOption } from './lib/useTheme'

function Settings() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const [showThemePicker, setShowThemePicker] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [clearing, setClearing] = useState(false)
  const [clearError, setClearError] = useState<string | null>(null)
  const [cleared, setCleared] = useState(false)

  const handleThemeChange = (option: ThemeOption) => {
    setTheme(option)
    setShowThemePicker(false)
  }

  const handleClearAllData = async () => {
    setClearing(true)
    setClearError(null)
    const result = await clearAllData()
    if (result.success) {
      setCleared(true)
      setShowClearConfirm(false)
    } else {
      setClearError(result.error ?? 'Failed to clear data')
    }
    setClearing(false)
  }

  return (
    <div className="flex-1 p-6 h-screen overflow-y-auto bg-cream dark:bg-transparent">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Manage your app preferences</p>

      <p className="text-slate-500 dark:text-slate-500 text-xs font-medium mb-3">APPEARANCE</p>
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden mb-8">
        <button
          type="button"
          onClick={() => setShowThemePicker(!showThemePicker)}
          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <Moon size={18} className="text-blue-500 dark:text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-slate-900 dark:text-white font-medium text-sm">Theme</p>
            <p className="text-slate-500 text-xs mt-0.5 capitalize">{theme}</p>
          </div>
          <ChevronRight size={18} className={`text-slate-500 transition-transform ${showThemePicker ? 'rotate-90' : ''}`} />
        </button>

        {showThemePicker && (
          <div className="border-t border-slate-200 dark:border-slate-800 px-5 py-3 flex flex-col gap-1">
            {([
              { id: 'dark', label: 'Dark', icon: Moon },
              { id: 'light', label: 'Light', icon: Sun },
              { id: 'system', label: 'System', icon: Monitor },
            ] as const).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleThemeChange(id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  theme === id
                    ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-slate-500 dark:text-slate-500 text-xs font-medium mb-3">DATA & PACKAGES</p>
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden mb-8">
        <button
          type="button"
          onClick={() => navigate('/package')}
          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border-b border-slate-200 dark:border-slate-800"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <Package size={18} className="text-blue-500 dark:text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-slate-900 dark:text-white font-medium text-sm">Packages</p>
            <p className="text-slate-500 text-xs mt-0.5">Manage your saved Context Packages</p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </button>
        <button
          type="button"
          onClick={() => navigate('/settings/recovery-key')}
          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <Key size={18} className="text-blue-500 dark:text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-slate-900 dark:text-white font-medium text-sm">Recovery Key</p>
            <p className="text-slate-500 text-xs mt-0.5">Recover a license using a saved recovery code</p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </button>
      </div>

      <p className="text-slate-500 dark:text-slate-500 text-xs font-medium mb-3">ACCOUNT</p>
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden mb-8">
        <button
          type="button"
          onClick={() => navigate('/settings/upgrade')}
          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border-b border-slate-200 dark:border-slate-800"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <Star size={18} className="text-blue-500 dark:text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-slate-900 dark:text-white font-medium text-sm">Upgrade</p>
            <p className="text-slate-500 text-xs mt-0.5">Choose a plan and unlock more</p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </button>
        <button
          type="button"
          onClick={() => navigate('/settings/license')}
          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border-b border-slate-200 dark:border-slate-800"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <Star size={18} className="text-blue-500 dark:text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-slate-900 dark:text-white font-medium text-sm">My License</p>
            <p className="text-slate-500 text-xs mt-0.5">Plan, credits, and upgrades</p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </button>
        <button
          type="button"
          onClick={() => navigate('/settings/aios-preferences')}
          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center shrink-0">
            <Sparkles size={18} className="text-purple-500 dark:text-purple-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-slate-900 dark:text-white font-medium text-sm">AIOS Preferences</p>
            <p className="text-slate-500 text-xs mt-0.5">Control how AIOS personalizes your prompts</p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </button>
      </div>

      <p className="text-slate-500 dark:text-slate-500 text-xs font-medium mb-3">DANGER ZONE</p>
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden mb-8">
        {!showClearConfirm ? (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center shrink-0">
              <Trash2 size={18} className="text-red-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-red-500 font-medium text-sm">Clear All Data</p>
              <p className="text-slate-500 text-xs mt-0.5">
                {cleared ? 'Data cleared.' : 'Permanently delete all local ContextOS data'}
              </p>
            </div>
            <ChevronRight size={18} className="text-slate-500" />
          </button>
        ) : (
          <div className="px-5 py-4">
            <p className="text-red-500 dark:text-red-400 text-sm font-medium mb-1">
              This permanently deletes your locally stored ContextOS data. This action cannot be undone.
            </p>
            <p className="text-slate-500 text-xs mb-4">
              This does not delete your license or account.
            </p>
            {clearError && <p className="text-red-500 dark:text-red-400 text-xs mb-3">{clearError}</p>}
            <div className="flex gap-3">
              <button
                type="button"
                disabled={clearing}
                onClick={handleClearAllData}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                {clearing ? 'Deleting...' : 'Yes, Delete Everything'}
              </button>
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="text-slate-600 dark:text-slate-400 text-sm hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-slate-500 dark:text-slate-500 text-xs font-medium mb-3">ABOUT</p>
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden mb-10">
        <button
          type="button"
          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <Info size={18} className="text-blue-500 dark:text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-slate-900 dark:text-white font-medium text-sm">About ContextOS</p>
            <p className="text-slate-500 text-xs mt-0.5">App information, version and legal details</p>
          </div>
          <ChevronRight size={18} className="text-slate-500" />
        </button>
      </div>

      <div className="flex flex-col items-center text-center pb-8">
        <div className="flex items-center gap-2 mb-1">
          <Logo size={20} />
          <span className="text-slate-900 dark:text-white font-semibold">ContextOS</span>
        </div>
        <p className="text-slate-500 text-xs">Version 1.0.0</p>
      </div>
    </div>
  )
}

export default Settings
