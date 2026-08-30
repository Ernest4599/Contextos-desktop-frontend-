import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Key, Check } from 'lucide-react'
import { recoverLicense } from './lib/api'

function RecoveryKeyPage() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [result, setResult] = useState<{ license_key: string; plan: string; remaining: number } | null>(null)

  const handleRecover = async () => {
    if (!code.trim()) {
      setErrorMsg('Enter your recovery code')
      return
    }
    setErrorMsg(null)
    setLoading(true)

    try {
      const response = await recoverLicense(code.trim())
      if (!response.success || !response.license_key) {
        setErrorMsg(response.error ?? 'Invalid recovery code.')
        setLoading(false)
        return
      }
      setResult({
        license_key: response.license_key,
        plan: response.plan ?? '',
        remaining: response.recovery_codes_remaining ?? 0,
      })
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to reach the server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 p-6 h-dvh overflow-y-auto max-w-2xl mx-auto w-full bg-cream dark:bg-transparent">
      <button
        type="button"
        onClick={() => navigate('/settings')}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Settings
      </button>

      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Recovery Key</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Recover a license using one of your saved recovery codes.</p>

      {!result ? (
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mb-4">
            <Key size={22} className="text-blue-500 dark:text-blue-400" />
          </div>

          {errorMsg && (
            <div className="border border-red-600/40 bg-red-600/10 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
              {errorMsg}
            </div>
          )}

          <label className="text-slate-900 dark:text-white text-sm font-medium block mb-2">Recovery Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="CTX-XXXX-XXXX-XXXX"
            className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg px-4 py-3 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-mono mb-5"
          />

          <button
            type="button"
            disabled={loading}
            onClick={handleRecover}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
          >
            {loading ? 'Verifying...' : 'Recover License'}
          </button>
        </div>
      ) : (
        <div className="border border-green-600/40 bg-green-600/10 rounded-2xl p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-white" strokeWidth={3} />
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-semibold mb-1">License Recovered</h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm mb-1 capitalize">{result.plan} Plan</p>
          <code className="block bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-200 text-sm font-mono my-4">
            {result.license_key}
          </code>
          <p className="text-slate-500 text-xs mb-6">{result.remaining} recovery codes remaining.</p>
          <button
            type="button"
            onClick={() => navigate('/settings')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      )}
    </div>
  )
}

export default RecoveryKeyPage
