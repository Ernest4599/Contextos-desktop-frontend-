import { API_BASE_URL, getStoredToken } from './api'

export async function checkTermsAccepted(): Promise<boolean> {
  try {
    const token = getStoredToken()
    const headers: Record<string, string> = {}
    if (token) headers.Authorization = `Bearer ${token}`

    const resp = await fetch(`${API_BASE_URL}/terms/status`, {
      headers,
      credentials: 'include',
    })
    const data = await resp.json()
    return data.success ? !!data.accepted : false
  } catch {
    return false
  }
}

export async function acceptTermsRemote(): Promise<boolean> {
  try {
    const token = getStoredToken()
    const headers: Record<string, string> = {}
    if (token) headers.Authorization = `Bearer ${token}`

    const resp = await fetch(`${API_BASE_URL}/terms/accept`, {
      method: 'POST',
      headers,
      credentials: 'include',
    })
    const data = await resp.json()
    return !!data.success
  } catch {
    return false
  }
}
