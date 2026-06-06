import { getToken, emitUnauthorized } from '@/lib/auth'

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken()
  const res = await fetch(`/api/v1${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...init,
  })

  if (res.status === 401) {
    emitUnauthorized()
    throw new Error('401')
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`${res.status}${text ? `: ${text}` : ''}`)
  }

  if (res.status === 204) return undefined as T
  const json = (await res.json()) as { success: boolean; data: T }
  return json.data
}

export default apiFetch
