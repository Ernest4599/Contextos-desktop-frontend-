import { useEffect, useState } from 'react'
import { getStoredEmail, getStoredToken, apiCheckSession, clearSession } from './api'

export function useAuth() {
  const [email, setEmail] = useState<string | null>(getStoredEmail())
  const [isAdmin, setIsAdmin] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = getStoredToken()
    if (!token) {
      setChecking(false)
      return
    }

    apiCheckSession()
      .then((result) => {
        if (result.success && result.email) {
          setEmail(result.email)
          setIsAdmin(!!result.is_admin)
        } else {
          clearSession()
          setEmail(null)
          setIsAdmin(false)
        }
      })
      .catch(() => {
        // Network error, cold-start timeout, etc. - don't clear the
        // session on a transient failure, just stop blocking the UI.
      })
      .finally(() => {
        setChecking(false)
      })
  }, [])

  const signOut = () => {
    clearSession()
    setEmail(null)
    setIsAdmin(false)
  }

  return { email, isLoggedIn: !!email, isAdmin, checking, setEmail, signOut }
}
