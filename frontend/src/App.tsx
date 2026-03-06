import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

// ── Engine config ──────────────────────────────────────────────────────────────
const searchEngineUrls: Record<string, string> = {
  echloen: './echloen.html?q=',
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q=',
  duckduckgo: 'https://duckduckgo.com/?q=',
  yahoo: 'https://search.yahoo.com/search?p=',
  brave: 'https://search.brave.com/search?q=',
}

const echloenIconSvg = `data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a78bfa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z'/><path d='M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z'/></svg>`

const engineIcons: Record<string, string> = {
  echloen: echloenIconSvg,
  google: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000',
  bing: 'https://img.icons8.com/?size=100&id=pOADWgX6vV63&format=png&color=000000',
  duckduckgo: 'https://img.icons8.com/?size=100&id=63778&format=png&color=000000',
  yahoo: 'https://img.icons8.com/?size=100&id=G3F1h1aX2vpT&format=png&color=000000',
  brave: 'https://img.icons8.com/?size=100&id=ZAPJV5FAO4PW&format=png&color=000000',
}

const engineNames: Record<string, string> = {
  echloen: 'Echloen',
  google: 'Google',
  bing: 'Bing',
  duckduckgo: 'DuckDuckGo',
  yahoo: 'Yahoo',
  brave: 'Brave',
}

// ── Services ───────────────────────────────────────────────────────────────────
interface Service {
  url: string
  name: string
  icon: string | null
}

const defaultServices: Service[] = [
  { url: 'https://youtube.com', name: 'Youtube', icon: null },
  { url: 'https://chat.openai.com', name: 'ChatGPT', icon: null },
  { url: 'https://gemini.google.com', name: 'Gemini', icon: null },
  { url: 'https://github.com', name: 'Github', icon: null },
]

function getFaviconUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`
  } catch {
    return `https://www.google.com/s2/favicons?domain=${url}&sz=32`
  }
}

// ── Suggestions ────────────────────────────────────────────────────────────────
const commonSearches: Record<string, string[]> = {
  what: ['what is', 'what are', 'what does', 'what time', 'what day'],
  how: ['how to', 'how do', 'how does', 'how much', 'how many'],
  why: ['why is', 'why are', 'why do', 'why does', 'why not'],
  when: ['when is', 'when are', 'when do', 'when does', 'when will'],
  where: ['where is', 'where are', 'where do', 'where does', 'where can'],
  who: ['who is', 'who are', 'who do', 'who does', 'who can'],
}

function getFallbackSuggestions(query: string): string[] {
  const q = query.toLowerCase().trim()
  const out: string[] = []
  for (const [key, values] of Object.entries(commonSearches)) {
    if (q.startsWith(key)) {
      values.forEach(v => { if (v.startsWith(q) && v !== q) out.push(v) })
    }
  }
  if (out.length < 5) {
    const generic = [
      query + ' meaning',
      query + ' definition',
      query + ' explanation',
      'what is ' + query,
      'how to ' + query,
    ]
    generic.forEach(s => { if (!out.includes(s) && s !== query) out.push(s) })
  }
  return out.slice(0, 8)
}

// ── Component ──────────────────────────────────────────────────────────────────
function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentEngine, setCurrentEngineState] = useState<string>(() => {
    try { return localStorage.getItem('selectedSearchEngine') || 'echloen' } catch { return 'echloen' }
  })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
  const [services, setServices] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem('services')
      return saved ? JSON.parse(saved) : defaultServices.map(s => ({ ...s }))
    } catch { return defaultServices.map(s => ({ ...s })) }
  })
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(-1)
  const [editUrl, setEditUrl] = useState('')
  const [editName, setEditName] = useState('')

  const searchInputRef = useRef<HTMLTextAreaElement>(null)
  const searchBoxRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const suggestionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close menus when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false)
      }
      if (
        suggestionsRef.current && !suggestionsRef.current.contains(target) &&
        searchBoxRef.current && !searchBoxRef.current.contains(target)
      ) {
        setIsSuggestionsOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const setCurrentEngine = useCallback((engine: string, persist = true) => {
    if (!searchEngineUrls[engine]) return
    setCurrentEngineState(engine)
    if (persist) { try { localStorage.setItem('selectedSearchEngine', engine) } catch {} }
  }, [])

  const handleSearch = useCallback(() => {
    const query = searchQuery.trim()
    if (!query) return
    setSearchQuery('')
    setIsSuggestionsOpen(false)
    const url = searchEngineUrls[currentEngine] || searchEngineUrls.echloen
    window.location.href = url + encodeURIComponent(query)
  }, [searchQuery, currentEngine])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setSearchQuery(val)
    if (suggestionTimeoutRef.current) clearTimeout(suggestionTimeoutRef.current)
    if (val.trim().length < 2) { setIsSuggestionsOpen(false); return }

    suggestionTimeoutRef.current = setTimeout(async () => {
      const query = val.trim()
      const fallback = getFallbackSuggestions(query)
      setSuggestions(fallback)
      setIsSuggestionsOpen(fallback.length > 0)
      setSelectedIndex(-1)

      // Try real suggestions in background
      if (currentEngine === 'duckduckgo') {
        const cbName = 'ddgCb_' + Date.now()
        const script = document.createElement('script')
        Reflect.set(window, cbName, (data: { phrase?: string }[]) => {
          Reflect.deleteProperty(window, cbName)
          script.parentNode?.removeChild(script)
          const api = data.map(i => i.phrase ?? String(i)).slice(0, 8)
          if (api.length) { setSuggestions(api); setIsSuggestionsOpen(true) }
        })
        script.src = `https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}&callback=${cbName}`
        script.onerror = () => { script.parentNode?.removeChild(script); Reflect.deleteProperty(window, cbName) }
        document.body.appendChild(script)
        setTimeout(() => { script.parentNode?.removeChild(script); Reflect.deleteProperty(window, cbName) }, 2000)
      } else {
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`)}`)
          .then(r => r.json())
          .then(data => {
            try {
              const content = JSON.parse(data.contents)
              if (content?.[1]?.length) { setSuggestions(content[1].slice(0, 8)); setIsSuggestionsOpen(true) }
            } catch {}
          })
          .catch(() => {})
      }
    }, 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (isSuggestionsOpen && selectedIndex >= 0 && selectedIndex < suggestions.length) {
        setSearchQuery(suggestions[selectedIndex])
        setIsSuggestionsOpen(false)
      }
      handleSearch()
      return
    }
    if (!isSuggestionsOpen || suggestions.length === 0) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, suggestions.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, -1)) }
    else if (e.key === 'Escape') { setIsSuggestionsOpen(false); setSelectedIndex(-1) }
  }

  const openEditModal = (index: number) => {
    setEditingIndex(index)
    setEditUrl(services[index]?.url || '')
    setEditName(services[index]?.name || '')
    setEditModalOpen(true)
  }

  const closeEditModal = () => {
    setEditModalOpen(false)
    setEditingIndex(-1)
    setEditUrl('')
    setEditName('')
  }

  const handleEditUrlChange = (val: string) => {
    setEditUrl(val)
    try {
      const full = val.startsWith('http') ? val : 'https://' + val
      const dom = new URL(full).hostname.replace('www.', '').split('.')[0]
      const cap = dom.charAt(0).toUpperCase() + dom.slice(1)
      if (!editName || editName === services[editingIndex]?.name) setEditName(cap)
    } catch {}
  }

  const handleSave = () => {
    if (!editUrl.trim()) { alert('Please enter a URL'); return }
    if (!editName.trim()) { alert('Please enter a name'); return }
    let finalUrl = editUrl.trim()
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) finalUrl = 'https://' + finalUrl
    const newService: Service = { url: finalUrl, name: editName.trim(), icon: getFaviconUrl(finalUrl) }
    const updated = [...services]
    if (editingIndex >= 0) updated[editingIndex] = newService
    else updated.push(newService)
    setServices(updated)
    try { localStorage.setItem('services', JSON.stringify(updated)) } catch {}
    closeEditModal()
  }

  return (
    <div className="container">
      {/* Search Container */}
      <div className="search-container">
        <div
          ref={searchBoxRef}
          className="search-box"
          onClick={() => searchInputRef.current?.focus()}
        >
          <textarea
            ref={searchInputRef}
            className="search-input"
            placeholder="Ask anything..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={e => { (e.currentTarget.closest('.search-box') as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)' }}
            onBlur={e => { (e.currentTarget.closest('.search-box') as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)' }}
            rows={1}
          />

          {/* Search Engine Dropdown */}
          <div ref={dropdownRef} className={`search-engine-dropdown${isDropdownOpen ? ' active' : ''}`}>
            <button
              className="search-engine-btn"
              onClick={e => { e.stopPropagation(); setIsDropdownOpen(o => !o) }}
            >
              <svg className="engine-icon-btn" viewBox="0 0 24 24" fill="currentColor">
                <image href={engineIcons[currentEngine]} x="0" y="0" width="24" height="24" preserveAspectRatio="xMidYMid meet" />
              </svg>
              <span className="engine-name">{engineNames[currentEngine]}</span>
              <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="dropdown-menu">
              {Object.keys(engineIcons).map(engine => (
                <div
                  key={engine}
                  className="dropdown-item"
                  onClick={e => { e.stopPropagation(); setCurrentEngine(engine); setIsDropdownOpen(false) }}
                >
                  <img className="engine-icon" src={engineIcons[engine]} alt={engineNames[engine]} />
                  <span>{engineNames[engine]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="submit-btn"
            title="Submit"
            onClick={e => { e.stopPropagation(); handleSearch() }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        {/* Suggestions Dropdown */}
        <div ref={suggestionsRef} className={`suggestions-dropdown${isSuggestionsOpen ? ' active' : ''}`}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`suggestion-item${index === selectedIndex ? ' selected' : ''}`}
              onClick={() => { setSearchQuery(suggestion); setIsSuggestionsOpen(false); setTimeout(handleSearch, 0) }}
            >
              <svg className="suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Service Buttons */}
      <div className="services-container">
        {services.map((service, index) => (
          <button
            key={index}
            className="service-btn"
            onClick={() => { window.location.href = service.url }}
          >
            <img
              className="service-icon"
              src={service.icon || getFaviconUrl(service.url)}
              alt={service.name}
              onError={e => {
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
              }}
            />
            <span>{service.name}</span>
            <button
              className="edit-btn"
              onClick={e => { e.stopPropagation(); openEditModal(index) }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      <div
        className={`edit-modal${editModalOpen ? ' active' : ''}`}
        onClick={e => { if (e.target === e.currentTarget) closeEditModal() }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3>Edit Service</h3>
            <button className="close-btn" onClick={closeEditModal}>&times;</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="serviceUrl">URL</label>
              <input
                type="url"
                id="serviceUrl"
                placeholder="https://example.com"
                autoComplete="off"
                value={editUrl}
                onChange={e => handleEditUrlChange(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="serviceName">Name</label>
              <input
                type="text"
                id="serviceName"
                placeholder="Custom Name"
                autoComplete="off"
                value={editName}
                onChange={e => setEditName(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={closeEditModal}>Cancel</button>
            <button className="btn-save" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
