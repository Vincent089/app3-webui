import { trace } from '@opentelemetry/api'
import { getActiveTraceId } from './otel'
import { getSessionId, setSessionMetadata } from './replay'

// Bridges OTel traces and OpenReplay sessions. Every call is null-guarded —
// safe to invoke whether one, both, or neither system is active.

export function attachReplayToActiveSpan(): void {
  const sessionId = getSessionId()
  const span = trace.getActiveSpan()

  if (!sessionId || !span) return

  span.setAttribute('session.replay_id', sessionId)
  span.setAttribute('session.replay_url', `https://app.openreplay.com/sessions/${sessionId}`)
}

export function attachTraceToReplaySession(): void {
  const traceId = getActiveTraceId()
  const sessionId = getSessionId()

  if (!traceId || !sessionId) return

  setSessionMetadata('trace_id', traceId)
}
