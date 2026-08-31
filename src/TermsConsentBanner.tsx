import { useNavigate } from 'react-router-dom'
import { useTerms } from './lib/TermsContext'

function TermsConsentBanner() {
  const navigate = useNavigate()
  const { accepted, loading, accept } = useTerms()

  if (loading || accepted) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50">
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xl">
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
          By using ContextOS, you agree to our Terms & Conditions.{' '}
          <button
            type="button"
            onClick={() => navigate('/terms')}
            className="text-blue-600 dark:text-blue-400 font-medium underline"
          >
            See more
          </button>
        </p>
        <button
          type="button"
          onClick={accept}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  )
}

export default TermsConsentBanner
