import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Main from './components/MainComponent'
import './index.css'
import { withErrorBoundary } from 'react-error-boundary'

const queryClient = new QueryClient()

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
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <MainWithErrorBoundary/>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)
