import { getToken, emitUnauthorized } from '@/lib/auth'
import { ApiError, type ApiErrorPayload } from '@/lib/apiError'

export { ApiError }

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
    const json = await res.json().catch(() => null)
    if (json?.error) throw new ApiError(json.error as ApiErrorPayload)
    throw new Error(`${res.status}`)
  }

  if (res.status === 204) return undefined as T
  const json = (await res.json()) as { success: boolean; data: T }
  return json.data
}

export default apiFetch
