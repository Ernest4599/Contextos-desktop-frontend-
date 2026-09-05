import { Navigate } from 'react-router-dom'
import { useAuth } from './lib/useAuth'

/**
 * Client-side gate for the admin area - defense in depth alongside the
 * backend's require_admin dependency, which is the actual enforcement.
 * This just keeps a non-admin from seeing the admin shell flash before
 * a request fails; it is never the thing that makes the data safe.
 */
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isAdmin, checking } = useAuth()

  if (checking) return null

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/home" replace />
  }

  return <>{children}</>
}

export default AdminRoute
