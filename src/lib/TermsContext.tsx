import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { checkTermsAccepted, acceptTermsRemote } from './termsConsent'

type TermsContextValue = {
  accepted: boolean
  loading: boolean
  accept: () => Promise<void>
}

const TermsContext = createContext<TermsContextValue | undefined>(undefined)

export function TermsProvider({ children }: { children: ReactNode }) {
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkTermsAccepted()
      .then(setAccepted)
      .finally(() => setLoading(false))
  }, [])

  const accept = async () => {
    const ok = await acceptTermsRemote()
    if (ok) setAccepted(true)
  }

  return (
    <TermsContext.Provider value={{ accepted, loading, accept }}>
      {children}
    </TermsContext.Provider>
  )
}

export function useTerms() {
  const ctx = useContext(TermsContext)
  if (!ctx) throw new Error('useTerms must be used within TermsProvider')
  return ctx
}
