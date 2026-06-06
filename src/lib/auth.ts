const TOKEN_KEY = 'app3_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

type Listener = () => void
const listeners = new Set<Listener>()

export function onUnauthorized(fn: Listener) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function emitUnauthorized() {
  listeners.forEach((fn) => fn())
}
