import React, { FunctionComponent } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Main from './components/MainComponent'
import './app.scss'
import './index.css'
import './dashboard.css'
import { withErrorBoundary } from 'react-error-boundary'

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = createRoot(rootElement)

interface ErrorFallbackProps {
    error:Error,
    resetErrorBoundary: () => void
}

function ErrorFallback({error, resetErrorBoundary}:ErrorFallbackProps) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }

const MainWithErrorBoundary =  withErrorBoundary(Main, {
    FallbackComponent: ErrorFallback,
    onError(error,info){
        console.error(error, info)
    },
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
);

/* fetch(globalConfigUrl)
    .then((res) => res.json())
    .then((result) => {

        globalConfig.config = result;
        console.log("update globalConfig ApiURL: "+globalConfig.config.apiUrl)
    }).catch(e => {
        console.error("Failed to update globalConfig"+e);
      return <p style={{color: "red", textAlign: "center"}}>Error while fetching global config</p>;
  }).then(()=>{
    root.render(
      <React.StrictMode>
          <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                  <Main/>
              </BrowserRouter>
          </QueryClientProvider>
      </React.StrictMode>
  );
  }); */


