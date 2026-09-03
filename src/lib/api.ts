export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export type SSEEvent = { event: string; data: any }

async function streamSSE(
  url: string,
  init: RequestInit,
  onEvent: (evt: SSEEvent) => void
): Promise<void> {
  const resp = await fetch(url, init)

  const contentType = resp.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const data = await resp.json()
    if (resp.status === 401) {
      onEvent({ event: 'access_denied', data: { message: data.detail || 'Sign in or enter a license key to continue.' } })
      return
    }
    if (data.success === false) {
      onEvent({ event: 'error', data: { message: data.error } })
      return
    }
    if (!resp.ok) {
      onEvent({ event: 'error', data: { message: data.detail || data.error || 'Something went wrong' } })
      return
    }
  }

  if (!resp.body) {
    onEvent({ event: 'error', data: { message: 'No response body from server' } })
    return
  }

  const reader = resp.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    const chunks = buffer.split('\n\n')
    buffer = chunks.pop() ?? ''

    for (const chunk of chunks) {
      let eventName = 'message'
      let dataLine = ''
      for (const line of chunk.split('\n')) {
        if (line.startsWith('event:')) eventName = line.slice(6).trim()
        else if (line.startsWith('data:')) dataLine = line.slice(5).trim()
      }
      if (dataLine) {
        try {
          onEvent({ event: eventName, data: JSON.parse(dataLine) })
        } catch {
          onEvent({ event: eventName, data: dataLine })
        }
      }
    }
  }
}

export function streamProcessPaste(text: string, onEvent: (evt: SSEEvent) => void) {
  return streamSSE(
    `${API_BASE_URL}/process/paste`,
    {
      method: 'POST',
      headers: accessHeaders(),
      body: JSON.stringify({ text }),
    },
    onEvent
  )
}

export function streamProcessShareLink(url: string, onEvent: (evt: SSEEvent) => void) {
  return streamSSE(
    `${API_BASE_URL}/process/share-link`,
    {
      method: 'POST',
      headers: accessHeaders(),
      body: JSON.stringify({ url }),
    },
    onEvent
  )
}

export function streamProcessUpload(file: File, onEvent: (evt: SSEEvent) => void) {
  const formData = new FormData()
  formData.append('file', file)
  return streamSSE(
    `${API_BASE_URL}/process/upload`,
    { method: 'POST', headers: accessHeadersNoContentType(), body: formData },
    onEvent
  )
}


export type QuickPromptResult = {
  success: boolean
  role?: string
  prompt?: string
  assumptions?: string[]
  output_format?: string
  error?: string
  accessDenied?: boolean
}

export type AiosQuickPromptResult = {
  success: boolean
  prompt?: string
  error?: string
}

export async function callAiosQuickPrompt(message: string): Promise<AiosQuickPromptResult> {
  const resp = await fetch(`${API_BASE_URL}/aios/quick-prompt`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ message }),
  })
  return resp.json()
}

export async function callQuickPrompt(
  overview: string,
  decisions: string,
  task: string
): Promise<QuickPromptResult> {
  const resp = await fetch(`${API_BASE_URL}/quick-prompt`, {
    method: 'POST',
    headers: accessHeaders(),
    body: JSON.stringify({ overview, decisions, task }),
  })
  const data = await resp.json()
  if (resp.status === 401) {
    return { success: false, error: data.detail || 'Sign in or enter a license key to continue.', accessDenied: true }
  }
  return data
}


// --- Auth ---

const TOKEN_KEY = 'contextos_token'
const EMAIL_KEY = 'contextos_email'
const LICENSE_KEY_STORAGE = 'contextos_license_key'

export function getStoredLicenseKey(): string | null {
  return localStorage.getItem(LICENSE_KEY_STORAGE)
}

export function storeLicenseKey(key: string) {
  localStorage.setItem(LICENSE_KEY_STORAGE, key)
}

export function clearLicenseKey() {
  localStorage.removeItem(LICENSE_KEY_STORAGE)
}

function accessHeaders(): HeadersInit {
  const token = getStoredToken()
  const licenseKey = getStoredLicenseKey()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  } else if (licenseKey) {
    headers['X-License-Key'] = licenseKey
  }
  return headers
}

function accessHeadersNoContentType(): HeadersInit {
  const token = getStoredToken()
  const licenseKey = getStoredLicenseKey()
  const headers: Record<string, string> = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  } else if (licenseKey) {
    headers['X-License-Key'] = licenseKey
  }
  return headers
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getStoredEmail(): string | null {
  return localStorage.getItem(EMAIL_KEY)
}

export function storeSession(token: string, email: string) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(EMAIL_KEY, email)
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(EMAIL_KEY)
}

export type AuthResult = {
  success: boolean
  token?: string
  email?: string
  error?: string
}

export async function apiSignup(email: string, password: string, confirmPassword: string): Promise<AuthResult> {
  const resp = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, confirm_password: confirmPassword }),
  })
  return resp.json()
}

export async function apiLogin(email: string, password: string): Promise<AuthResult> {
  const resp = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return resp.json()
}

export async function apiCheckSession(): Promise<{ success: boolean; email?: string }> {
  const token = getStoredToken()

  const resp = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return resp.json()
}

// --- AIOS ---

export type AiosMemory = {
  id: number
  content: string
  category: string
  confidence?: string
  created_at?: string
  updated_at?: string
}

export type AiosIdentityStrength = {
  score: number
  label: string
}

export type AiosOverview = {
  success: boolean
  total_memories?: number
  categories?: Record<string, number>
  last_updated?: string | null
  conversations_used?: number
  identity_strength?: AiosIdentityStrength
  recent_memories?: { id: number; content: string; category: string; updated_at: string | null }[]
  error?: string
}

export type AiosTellResult = {
  success: boolean
  added?: { content: string; category: string }[]
  updated?: { content: string; category: string }[]
  duplicates_skipped?: number
  error?: string
}

export type AiosMemoriesResult = {
  success: boolean
  memories?: AiosMemory[]
  error?: string
}

function authHeaders(): HeadersInit {
  const token = getStoredToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

export async function aiosTell(content: string): Promise<AiosTellResult> {
  const resp = await fetch(`${API_BASE_URL}/aios/tell`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ content }),
  })
  return resp.json()
}

export async function getAiosOverview(): Promise<AiosOverview> {
  const resp = await fetch(`${API_BASE_URL}/aios/overview`, {
    headers: authHeaders(),
  })
  return resp.json()
}

export async function getAiosMemories(category?: string): Promise<AiosMemoriesResult> {
  const url = category
    ? `${API_BASE_URL}/aios/memories?category=${encodeURIComponent(category)}`
    : `${API_BASE_URL}/aios/memories`
  const resp = await fetch(url, { headers: authHeaders() })
  return resp.json()
}

export async function updateAiosMemory(memoryId: number, content: string) {
  const resp = await fetch(`${API_BASE_URL}/aios/memories/${memoryId}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ content }),
  })
  return resp.json()
}

export async function deleteAiosMemory(memoryId: number) {
  const resp = await fetch(`${API_BASE_URL}/aios/memories/${memoryId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  return resp.json()
}


export type AiosQuickPromptResult = {
  success: boolean
  prompt?: string
  error?: string
}

export async function apiAiosQuickPrompt(message: string): Promise<AiosQuickPromptResult> {
  const token = getStoredToken()
  const resp = await fetch(`${API_BASE_URL}/aios/quick-prompt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  })
  return resp.json()
}


// --- Projects ---

export type Project = {
  id: number
  name: string
  created_at?: string
  updated_at?: string
}

export type ProjectsResult = {
  success: boolean
  projects?: Project[]
  error?: string
}

export type ProjectResult = {
  success: boolean
  project?: Project
  error?: string
}

export async function getProjects(): Promise<ProjectsResult> {
  const resp = await fetch(`${API_BASE_URL}/projects`, { headers: authHeaders() })
  return resp.json()
}

export async function createProject(name: string): Promise<ProjectResult> {
  const resp = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ name }),
  })
  return resp.json()
}

export async function deleteProject(projectId: number): Promise<{ success: boolean; error?: string }> {
  const resp = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: "DELETE",
    headers: authHeaders(),
  })
  return resp.json()
}


// --- License ---

export type License = {
  license_id: number
  license_key: string
  plan: string
  status: string
  created_at?: string
  expires_at?: string | null
}

export type LicenseResult = {
  success: boolean
  license?: License
  error?: string
}

export type PurchaseWithCodesResult = {
  success: boolean
  license?: License
  recovery_codes?: string[]
  error?: string
}

export async function getMyLicense(): Promise<LicenseResult> {
  const resp = await fetch(`${API_BASE_URL}/license/mine`, { headers: authHeaders() })
  return resp.json()
}

export async function purchaseLicenseWithCodes(plan: string): Promise<PurchaseWithCodesResult> {
  const resp = await fetch(`${API_BASE_URL}/license/purchase-with-codes`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ plan }),
  })
  return resp.json()
}

export async function recoverLicense(code: string): Promise<{ success: boolean; license_key?: string; plan?: string; status?: string; recovery_codes_remaining?: number; error?: string }> {
  const resp = await fetch(`${API_BASE_URL}/license/recover`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
  return resp.json()
}

export async function rotateRecoveryCode(licenseId: number): Promise<{ success: boolean; new_code?: string; recovery_codes_remaining?: number; error?: string }> {
  const resp = await fetch(`${API_BASE_URL}/license/${licenseId}/rotate-code`, {
    method: 'POST',
    headers: authHeaders(),
  })
  return resp.json()
}

// --- AIOS Preferences ---

export type AiosPreferencesResult = {
  success: boolean
  personalization_level?: string
  enabled_categories?: string[]
  error?: string
}

export async function getAiosPreferences(): Promise<AiosPreferencesResult> {
  const resp = await fetch(`${API_BASE_URL}/aios/preferences`, { headers: authHeaders() })
  return resp.json()
}

export async function updateAiosPreferences(level: string, categories: string[]): Promise<AiosPreferencesResult> {
  const resp = await fetch(`${API_BASE_URL}/aios/preferences`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ personalization_level: level, enabled_categories: categories }),
  })
  return resp.json()
}

export async function resetAiosIdentity(): Promise<{ success: boolean; error?: string }> {
  const resp = await fetch(`${API_BASE_URL}/aios/reset-identity`, {
    method: 'POST',
    headers: authHeaders(),
  })
  return resp.json()
}

// --- Data ---

export async function clearAllData(): Promise<{ success: boolean; error?: string }> {
  const resp = await fetch(`${API_BASE_URL}/data/clear-all`, {
    method: 'POST',
    headers: authHeaders(),
  })
  return resp.json()
}


export async function verifyLicenseByKey(licenseKey: string): Promise<LicenseResult> {
  const resp = await fetch(`${API_BASE_URL}/license/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ license_key: licenseKey }),
  })
  return resp.json()
}
