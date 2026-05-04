import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AetherSearch from './AetherSearch'

createRoot(document.getElementById('aether-root')!).render(
  <StrictMode>
    <AetherSearch />
  </StrictMode>,
)
