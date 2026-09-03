import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, ShieldAlert } from 'lucide-react'
import { purchaseLicenseWithCodes, storeLicenseKey } from './lib/api'

const PLANS = [
  { id: 'pro', name: 'Pro', price: '$12/mo', features: ['Unlimited imports', 'AIOS enabled', 'Priority support'] },
  { id: 'team', name: 'Team', price: '$29/mo', features: ['Everything in Pro', 'Shared projects', '5 seats'] },
]

function UpgradePage() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [codes, setCodes] = useState<string[] | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  const handlePurchase = async () => {
    if (!selectedPlan) return
    setErrorMsg(null)
    setLoading(true)

    try {
      // NOTE: payment is stubbed for now - this simulates a successful
      // purchase immediately. Real Stripe/Paystack checkout wires in here later.
      const result = await purchaseLicenseWithCodes(selectedPlan)
      if (!result.success || !result.recovery_codes) {
        setErrorMsg(result.error ?? 'Purchase failed')
        setLoading(false)
        return
      }
      if (result.license) {
        storeLicenseKey(result.license.license_key)
      }
      setCodes(result.recovery_codes)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to reach the server')
    } finally {
      setLoading(false)
    }
  }

  if (codes) {
    return (
      <div className="flex-1 p-6 h-dvh overflow-y-auto max-w-2xl mx-auto w-full bg-cream dark:bg-transparent">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Save your recovery codes</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          We've generated 4 recovery codes for your ContextOS license. Each code can be used once to recover your
          license. Save them somewhere safe — ContextOS will not show these codes again.
        </p>

        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-6">
          <div className="flex flex-col gap-3">
            {codes.map((c) => (
              <code key={c} className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 text-sm font-mono text-center">
                {c}
              </code>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-3 border border-yellow-600/30 bg-yellow-600/5 rounded-xl px-5 py-4 mb-6">
          <ShieldAlert size={18} className="text-yellow-500 dark:text-yellow-400 mt-0.5 shrink-0" />
          <p className="text-yellow-600 dark:text-yellow-400 text-sm">
            ContextOS does not store the raw codes and cannot show them to you again. If you lose all four, you'll
            need to go through account recovery instead.
          </p>
        </div>

        <label className="flex items-center gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950"
          />
          <span className="text-slate-900 dark:text-white text-sm">I've saved my recovery codes</span>
        </label>

        <button
          type="button"
          disabled={!confirmed}
          onClick={() => navigate('/settings/license')}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-colors"
        >
          Continue
        </button>
      </div>
    )
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

      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Upgrade ContextOS</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Choose a plan to unlock more.</p>

      {errorMsg && (
        <div className="border border-red-600/40 bg-red-600/10 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col gap-4 mb-6">
        {PLANS.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => setSelectedPlan(plan.id)}
            className={`text-left border rounded-2xl p-5 transition-colors ${
              selectedPlan === plan.id ? 'border-blue-500 bg-blue-600/5' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-900 dark:text-white font-semibold">{plan.name}</h3>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">{plan.price}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                  <Check size={14} className="text-green-500" />
                  {f}
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={!selectedPlan || loading}
        onClick={handlePurchase}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-colors"
      >
        {loading ? 'Processing...' : 'Continue to Payment'}
      </button>
    </div>
  )
}

export default UpgradePage
