import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Main from './components/MainComponent'
import './index.css'
import { withErrorBoundary } from 'react-error-boundary'
import { trpc } from './utils/trpc'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'

const queryClient = new QueryClient()

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api',
      async headers () {
        return {}
      }
    })
  ],
  transformer: superjson
})

const rootElement = document.getElementById('root')
if (rootElement == null) throw new Error('Failed to find the root element')
const root = createRoot(rootElement)

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

function ErrorFallback ({ error, resetErrorBoundary }: ErrorFallbackProps): JSX.Element {
  return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
  )
}

const MainWithErrorBoundary = withErrorBoundary(Main, {
  FallbackComponent: ErrorFallback,
  onError (error, info) {
    console.error(error, info)
  }
}
)

root.render(
    <React.StrictMode>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <MainWithErrorBoundary/>
            </BrowserRouter>
        </QueryClientProvider>
        </trpc.Provider>
    </React.StrictMode>
)
