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
    if (data.success === false) {
      onEvent({ event: 'error', data: { message: data.error } })
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
      headers: { 'Content-Type': 'application/json' },
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
      headers: { 'Content-Type': 'application/json' },
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
    { method: 'POST', body: formData },
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
}

export async function callQuickPrompt(
  overview: string,
  decisions: string,
  task: string
): Promise<QuickPromptResult> {
  const resp = await fetch(`${API_BASE_URL}/quick-prompt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ overview, decisions, task }),
  })
  return resp.json()
}
