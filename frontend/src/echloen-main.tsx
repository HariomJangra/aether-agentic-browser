import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EchloenSearch from './EchloenSearch'

createRoot(document.getElementById('echloen-root')!).render(
  <StrictMode>
    <EchloenSearch />
  </StrictMode>,
)
