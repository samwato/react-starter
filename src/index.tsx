import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app'
import '@/globals.css'

// Live Reload
if (!window.IS_PRODUCTION) {
  new EventSource('/esbuild').addEventListener('change', () =>
    location.reload(),
  )
}

// Wrap App in strict mode in development
const RenderApp = () =>
  !window.IS_PRODUCTION ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  )

const rootElement = document.querySelector('#root')!
const root = createRoot(rootElement)
root.render(<RenderApp />)
