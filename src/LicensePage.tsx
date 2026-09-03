import { useEffect, useState } from 'react'
import { copyToClipboard } from './lib/clipboard'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Copy, RefreshCw, Check, Key } from 'lucide-react'
import { getMyLicense, rotateRecoveryCode, verifyLicenseByKey, storeLicenseKey, type License } from './lib/api'
import { useAuth } from './lib/useAuth'

function LicensePage() {
  const navigate = useNavigate()
  const { isLoggedIn, checking: authChecking } = useAuth()

  const [license, setLicense] = useState<License | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const [rotating, setRotating] = useState(false)
  const [rotateResult, setRotateResult] = useState<{ new_code: string; remaining: number } | null>(null)
  const [rotateError, setRotateError] = useState<string | null>(null)

  const [manualKey, setManualKey] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [verifyError, setVerifyError] = useState<string | null>(null)

  useEffect(() => {
    if (authChecking) return

    if (isLoggedIn) {
      getMyLicense().then((result) => {
        if (result.success && result.license) {
          setLicense(result.license)
        } else {
          setLoadError(result.error ?? 'Failed to load license')
        }
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [authChecking, isLoggedIn])

  const handleVerify = async () => {
    if (!manualKey.trim()) {
      setVerifyError('Enter your license number')
      return
    }
    setVerifyError(null)
    setVerifying(true)
    try {
      const result = await verifyLicenseByKey(manualKey.trim())
      if (!result.success || !result.license) {
        setVerifyError(result.error ?? 'License not found')
        setVerifying(false)
        return
      }
      storeLicenseKey(result.license.license_key)
      setLicense(result.license)
    } catch (err) {
      setVerifyError(err instanceof Error ? err.message : 'Failed to reach the server')
    } finally {
      setVerifying(false)
    }
  }

  const handleCopy = async () => {
    if (!license) return
    await copyToClipboard(license.license_key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRotate = async () => {
    if (!license) return
    setRotating(true)
    setRotateError(null)
    const result = await rotateRecoveryCode(license.license_id)
    if (result.success && result.new_code && result.recovery_codes_remaining !== undefined) {
      setRotateResult({ new_code: result.new_code, remaining: result.recovery_codes_remaining })
    } else {
      setRotateError(result.error ?? 'Failed to generate a new recovery code')
    }
    setRotating(false)
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

      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">My License</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Plan, status, and recovery.</p>

      {(authChecking || loading) && <p className="text-slate-500 text-sm">Loading...</p>}

      {!authChecking && !loading && !license && !isLoggedIn && (
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mb-4">
            <Key size={22} className="text-blue-500 dark:text-blue-400" />
          </div>
          <h2 className="text-slate-900 dark:text-white font-medium mb-1">Enter your license number</h2>
          <p className="text-slate-500 text-sm mb-4">You don't need an account to view a standalone license.</p>

          {verifyError && (
            <div className="border border-red-600/40 bg-red-600/10 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
              {verifyError}
            </div>
          )}

          <input
            type="text"
            value={manualKey}
            onChange={(e) => setManualKey(e.target.value)}
            placeholder="CTX-XXXX-XXXX-XXXX"
            className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg px-4 py-3 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-mono mb-4"
          />

          <button
            type="button"
            disabled={verifying}
            onClick={handleVerify}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
          >
            {verifying ? 'Verifying...' : 'Verify License'}
          </button>
        </div>
      )}

      {!authChecking && !loading && !license && isLoggedIn && loadError && (
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center">
          <Star size={28} className="text-slate-400 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-900 dark:text-white font-medium mb-1">No license found</p>
          <p className="text-slate-500 text-sm mb-6">{loadError}</p>
          <button
            type="button"
            onClick={() => navigate('/settings/upgrade')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Upgrade Now
          </button>
        </div>
      )}

      {!loading && license && (
        <>
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star size={18} className="text-blue-500 dark:text-blue-400" />
                <span className="text-slate-900 dark:text-white font-semibold capitalize">{license.plan} Plan</span>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                license.status === 'active' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                {license.status}
              </span>
            </div>

            <label className="text-slate-500 text-xs block mb-1">License Key</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-200 text-sm font-mono">
                {license.license_key}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-lg p-2 transition-colors"
              >
                {copied ? <Check size={16} className="text-green-500 dark:text-green-400" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {isLoggedIn && (
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <h2 className="text-slate-900 dark:text-white font-semibold mb-2">Recovery Code</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Lost or used a recovery code? Generate a new one to replace it.
              </p>

              {rotateError && (
                <div className="border border-red-600/40 bg-red-600/10 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
                  {rotateError}
                </div>
              )}

              {rotateResult ? (
                <div className="border border-green-600/40 bg-green-600/10 rounded-xl px-4 py-4">
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium mb-2">New recovery code generated — save it now:</p>
                  <code className="block bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-200 text-sm font-mono mb-2">
                    {rotateResult.new_code}
                  </code>
                  <p className="text-slate-500 text-xs">{rotateResult.remaining} recovery codes now active.</p>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={rotating}
                  onClick={handleRotate}
                  className="flex items-center gap-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-60 transition-colors"
                >
                  <RefreshCw size={16} className={rotating ? 'animate-spin' : ''} />
                  {rotating ? 'Generating...' : 'Generate New Code'}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default LicensePage
