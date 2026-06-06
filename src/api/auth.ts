import { setToken } from '@/lib/auth'

interface LoginResponse {
  token: string
  user: { username: string }
}

export async function login(username: string, password: string): Promise<void> {
  const res = await fetch('/api/v1/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) {
    if (res.status === 401) throw new Error('Invalid credentials')
    throw new Error(`Login failed: ${res.status}`)
  }

  const json = (await res.json()) as { success: boolean; data: LoginResponse }
  setToken(json.data.token)
}
