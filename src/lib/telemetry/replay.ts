// OpenReplay tracker — dormant until backend is deployed
// Activate by setting VITE_OPENREPLAY_PROJECT_KEY and
// VITE_OPENREPLAY_INGEST_POINT in the environment
//
// Requirements before activating:
//   - OpenReplay backend deployed (Kubernetes, requires HTTPS)
//   - HTTPS on the cluster ingress (mandatory for tracker to start)
import type Tracker from '@openreplay/tracker'

let tracker: Tracker | null = null

export function initReplay(): void {
  const projectKey = import.meta.env.VITE_OPENREPLAY_PROJECT_KEY
  const ingestPoint = import.meta.env.VITE_OPENREPLAY_INGEST_POINT

  if (!projectKey || !ingestPoint) return

  // Dynamic import so the tracker bundle is only loaded when configured
  import('@openreplay/tracker').then(({ default: Tracker }) => {
    tracker = new Tracker({ projectKey, ingestPoint })
    tracker.start()
  })
}

export function getSessionId(): string | null {
  return tracker?.getSessionID() ?? null
}

export function setSessionMetadata(key: string, value: string): void {
  tracker?.setMetadata(key, value)
}
