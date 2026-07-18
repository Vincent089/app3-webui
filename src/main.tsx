import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App } from './App'
import { applyTheme, getTheme } from '@/lib/theme'
import { initOtel } from '@/lib/telemetry/otel'
import { initReplay } from '@/lib/telemetry/replay'
import './index.css'

// Apply saved theme before first render to avoid flash
applyTheme(getTheme())

initOtel()   // no-op if VITE_OTEL_ENABLED not set
initReplay() // no-op if VITE_OPENREPLAY_PROJECT_KEY not set

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
