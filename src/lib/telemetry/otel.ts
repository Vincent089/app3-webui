import { trace } from '@opentelemetry/api'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web'
import { WebTracerProvider, BatchSpanProcessor } from '@opentelemetry/sdk-trace-web'
import { ZoneContextManager } from '@opentelemetry/context-zone'
import { W3CTraceContextPropagator } from '@opentelemetry/core'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'

let initialized = false

// No-op unless VITE_OTEL_ENABLED=true, so this stays silent in environments
// where Alloy isn't reachable (e.g. local dev without the cluster).
export function initOtel(): void {
  if (initialized) return
  if (import.meta.env.VITE_OTEL_ENABLED !== 'true') return

  const endpoint = import.meta.env.VITE_OTEL_EXPORTER_ENDPOINT ?? 'http://localhost:4318/v1/traces'

  const provider = new WebTracerProvider({
    spanProcessors: [new BatchSpanProcessor(new OTLPTraceExporter({ url: endpoint }))],
  })

  provider.register({
    propagator: new W3CTraceContextPropagator(),
    contextManager: new ZoneContextManager(),
  })

  // Only fetch/XHR are instrumented — traceparent needs to reach Kong on
  // every API call. document-load/user-interaction aren't part of that.
  registerInstrumentations({
    instrumentations: [
      getWebAutoInstrumentations({
        '@opentelemetry/instrumentation-fetch': { propagateTraceHeaderCorsUrls: /.*/ },
        '@opentelemetry/instrumentation-xml-http-request': { propagateTraceHeaderCorsUrls: /.*/ },
        '@opentelemetry/instrumentation-document-load': { enabled: false },
        '@opentelemetry/instrumentation-user-interaction': { enabled: false },
      }),
    ],
  })

  initialized = true
}

export function getActiveTraceId(): string | null {
  const traceId = trace.getActiveSpan()?.spanContext().traceId
  return traceId && traceId !== '00000000000000000000000000000000' ? traceId : null
}
