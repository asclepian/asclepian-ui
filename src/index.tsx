import React, { FunctionComponent } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Main from './components/MainComponent'
import { globalConfig, globalConfigUrl } from './Configuration/config'
import './app.scss'
import './index.css'
import './dashboard.css'

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = createRoot(rootElement)

fetch(globalConfigUrl)
    .then((res) => res.json())
    .then((result) => {
        globalConfig.config = result;
    }).catch(e => {
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
  });


