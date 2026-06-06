import { useState, useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { onUnauthorized } from '@/lib/auth'
import { login } from '@/api/auth'
import { Dialog, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const qc = useQueryClient()

  useEffect(() => {
    const unsub = onUnauthorized(() => setOpen(true))
    return () => { unsub() }
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => usernameRef.current?.focus(), 50)
  }, [open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const username = usernameRef.current?.value ?? ''
    const password = passwordRef.current?.value ?? ''
    if (!username || !password) return

    setLoading(true)
    setError('')
    try {
      await login(username, password)
      setOpen(false)
      qc.invalidateQueries()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {children}
      <Dialog open={open} onClose={() => {}} hideClose className="max-w-sm">
        <DialogTitle className="mb-4">Sign in</DialogTitle>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" ref={usernameRef} autoComplete="username" required />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" ref={passwordRef} autoComplete="current-password" required />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading} className="mt-1">
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </Dialog>
    </>
  )
}
