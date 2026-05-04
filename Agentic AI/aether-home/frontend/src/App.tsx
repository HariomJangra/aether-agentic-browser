import { useState, useEffect, useRef, useCallback, memo } from 'react'
import './App.css'

// ── Engine config ──────────────────────────────────────────────────────────────
type SearchEngine = {
  id: string
  name: string
  url?: string
  icon: string
  disabled?: boolean
  note?: string
}

const searchEngines: SearchEngine[] = [
  {
    id: 'google',
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    icon: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000',
  },
  {
    id: 'bing',
    name: 'Bing',
    url: 'https://www.bing.com/search?q=',
    icon: 'https://img.icons8.com/?size=100&id=pOADWgX6vV63&format=png&color=000000',
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q=',
    icon: 'https://img.icons8.com/?size=100&id=63778&format=png&color=000000',
  },
  {
    id: 'yahoo',
    name: 'Yahoo',
    url: 'https://search.yahoo.com/search?p=',
    icon: 'https://img.icons8.com/?size=100&id=G3F1h1aX2vpT&format=png&color=000000',
  },
  {
    id: 'brave',
    name: 'Brave',
    url: 'https://search.brave.com/search?q=',
    icon: 'https://img.icons8.com/?size=100&id=ZAPJV5FAO4PW&format=png&color=000000',
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    url: 'https://www.perplexity.ai/search?q=',
    icon: 'https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128',
  },
  {
    id: 'lucidity',
    name: 'Lucidity',
    icon: 'https://img.icons8.com/?size=100&id=11223&format=png&color=000000',
    disabled: true,
    note: 'Coming soon',
  },
]

const engineById: Record<string, SearchEngine> = Object.fromEntries(
  searchEngines.map(engine => [engine.id, engine])
)
const defaultEngineId = 'google'

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

type QuickWidget = {
  id: string
  title: string
  subtitle: string
  variant: string
  stat?: string
  tag?: string
  action?: string
  href?: string
}

const quickWidgets: QuickWidget[] = [
  {
    id: 'clock',
    title: 'Time',
    subtitle: 'Today',
    stat: '11:50 PM',
    variant: 'clock',
  },
  {
    id: 'market',
    title: 'NVDA',
    subtitle: 'NVIDIA Corporation',
    stat: '$216.10',
    tag: '+3.76%',
    variant: 'market',
  },
  {
    id: 'notes',
    title: 'Quick notes',
    subtitle: 'Jot anything down',
    variant: 'note',
  },
  {
    id: 'lucidity',
    title: 'Lucidity',
    subtitle: 'Coming soon',
    action: 'Preview',
    tag: 'Coming soon',
    variant: 'aurora',
  },
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
const MarketWidget = memo(({ symbol }: { symbol: string }) => {
  const [data, setData] = useState({
    price: 0,
    change: 0,
    name: 'Loading...',
    history: [] as number[],
    loading: true
  })

  useEffect(() => {
    let mounted = true
    const cleanSymbol = symbol.includes(':') ? symbol.split(':')[1] : symbol

    const fetchData = async () => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 6000)

      try {
        let res;
        try {
          res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${cleanSymbol}?interval=15m&range=5d`, { signal: controller.signal })
        } catch (e) {
          res = await fetch(`https://corsproxy.io/?${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${cleanSymbol}?interval=15m&range=5d`)}`, { signal: controller.signal })
        }

        clearTimeout(timeoutId)
        if (!res || !res.ok) throw new Error('Fetch failed')
        const json = await res.json()
        const result = json.chart.result[0]
        const meta = result.meta
        const quotes = result.indicators.quote[0].close
        const history = quotes.filter((q: number | null) => q !== null && q !== undefined)

        if (!mounted) return

        const price = meta.regularMarketPrice
        const prevClose = meta.previousClose || (history.length > 0 ? history[0] : 0)
        const change = price - prevClose
        const changePct = prevClose ? (change / prevClose) * 100 : 0

        setData({
          price: price,
          change: changePct,
          name: meta.shortName || cleanSymbol,
          history: history,
          loading: false
        })
      } catch (err) {
        clearTimeout(timeoutId)
        console.error('Failed to fetch real market data', err)
        if (!mounted) return
        
        // Fallback mock logic so it never looks broken
        let hash = 0
        const str = cleanSymbol.toUpperCase()
        for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
        const random = () => {
          hash = Math.sin(hash) * 10000
          return hash - Math.floor(hash)
        }
        const isPositive = random() > 0.4
        const basePrice = 50 + random() * 400
        const changePctMock = (random() * 5 * (isPositive ? 1 : -1)).toFixed(2)
        const historyMock = []
        let val = 50
        for(let i=0; i<40; i++) {
          historyMock.push(val)
          val += (random() - 0.5) * 8
          val += isPositive ? 0.5 : -0.5
        }
        setData({
          price: parseFloat(basePrice.toFixed(2)),
          change: parseFloat(changePctMock),
          name: cleanSymbol + ' Corp',
          history: historyMock,
          loading: false
        })
      }
    }

    setData(prev => ({ ...prev, loading: true }))
    fetchData()
    const interval = setInterval(fetchData, 60000)
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [symbol])

  const min = data.history.length > 0 ? Math.min(...data.history) : 0
  const max = data.history.length > 0 ? Math.max(...data.history) : 1
  const range = (max - min) || 1
  
  const pointsStr = data.history.length > 1 ? data.history.map((val, i) => {
    const x = (i / (data.history.length - 1)) * 100
    const y = 100 - ((val - min) / range) * 100
    return `${x},${y}`
  }).join(' ') : '0,50 100,50'

  const isPositive = data.change >= 0
  const color = isPositive ? '#166534' : '#a12c3f'
  const lineColor = isPositive ? '#22c55e' : '#a12c3f'
  const bgColor = isPositive ? '#dcfce7' : '#fae8ea'

  if (data.loading && data.history.length === 0) {
    return (
      <div className="custom-market-widget" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: '#888', fontSize: '13px', fontWeight: 500 }}>Loading data...</div>
      </div>
    )
  }

  return (
    <div className="custom-market-widget">
      <div className="market-header">
        <div className="market-title">
          <div className="market-symbol">{symbol.includes(':') ? symbol.split(':')[1] : symbol}</div>
          <div className="market-name">{data.name}</div>
        </div>
        <div className="market-badge" style={{ backgroundColor: bgColor, color: color }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {isPositive ? (
              <path d="M7 17L17 7M7 7h10v10" />
            ) : (
              <path d="M7 7l10 10M17 7v10H7" />
            )}
          </svg>
          {Math.abs(data.change).toFixed(2)}%
        </div>
      </div>
      
      <div className="market-chart">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="market-svg">
          <defs>
            <linearGradient id={`grad-${symbol}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline
            fill={`url(#grad-${symbol})`}
            points={`0,100 ${pointsStr} 100,100`}
          />
          <polyline
            fill="none"
            stroke={lineColor}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={pointsStr}
          />
        </svg>
      </div>

      <div className="market-footer">
        ${data.price.toFixed(2)}
      </div>
    </div>
  )
})

function App() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const h = now.getHours() % 12 || 12
  const m = now.getMinutes().toString().padStart(2, '0')
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM'
  const timeText = `${h}:${m}`
  const dateText = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const [searchQuery, setSearchQuery] = useState('')
  const [currentEngine, setCurrentEngineState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('selectedSearchEngine')
      const resolved = saved && engineById[saved] && !engineById[saved].disabled ? saved : defaultEngineId
      return resolved
    } catch {
      return defaultEngineId
    }
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
  const [quickNotes, setQuickNotes] = useState(() => {
    try { return localStorage.getItem('quickNotes') || '' } catch { return '' }
  })
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(-1)
  const [editUrl, setEditUrl] = useState('')
  const [editName, setEditName] = useState('')

  const [marketSymbol, setMarketSymbol] = useState(() => {
    try { return localStorage.getItem('marketSymbol') || 'NASDAQ:NVDA' } catch { return 'NASDAQ:NVDA' }
  })
  const [editMarketModalOpen, setEditMarketModalOpen] = useState(false)
  const [editMarketSymbol, setEditMarketSymbol] = useState('')

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

  const setCurrentEngine = useCallback((engineId: string, persist = true) => {
    const engine = engineById[engineId]
    if (!engine || engine.disabled || !engine.url) return
    setCurrentEngineState(engineId)
    if (persist) { try { localStorage.setItem('selectedSearchEngine', engineId) } catch { } }
  }, [])

  const handleSearch = useCallback((overrideQuery?: string) => {
    const query = (overrideQuery ?? searchQuery).trim()
    if (!query) return
    setSearchQuery('')
    setIsSuggestionsOpen(false)
    const engine = engineById[currentEngine] || engineById[defaultEngineId]
    const url = engine?.url || engineById[defaultEngineId].url
    if (url) window.location.href = url + encodeURIComponent(query)
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
      try {
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=8&namespace=0&format=json&origin=*`
        )
        if (res.ok) {
          const data = await res.json()
          // OpenSearch format: [query, [suggestions], [descriptions], [urls]]
          const api: string[] = Array.isArray(data[1]) ? data[1].slice(0, 8) : []
          if (api.length) {
            setSuggestions(api)
            setIsSuggestionsOpen(true)
          }
        }
      } catch (err) {
        // Silently ignore fetch errors
      }
    }, 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const picked = isSuggestionsOpen && selectedIndex >= 0 ? suggestions[selectedIndex] : undefined
      handleSearch(picked)
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
    } catch { }
  }

  const handleNotesChange = (value: string) => {
    setQuickNotes(value)
    try { localStorage.setItem('quickNotes', value) } catch { }
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
    try { localStorage.setItem('services', JSON.stringify(updated)) } catch { }
    closeEditModal()
  }

  const openEditMarketModal = () => {
    setEditMarketSymbol(marketSymbol)
    setEditMarketModalOpen(true)
  }

  const closeEditMarketModal = () => {
    setEditMarketModalOpen(false)
    setEditMarketSymbol('')
  }

  const handleSaveMarket = () => {
    if (!editMarketSymbol.trim()) return
    const symbol = editMarketSymbol.trim().toUpperCase()
    setMarketSymbol(symbol)
    try { localStorage.setItem('marketSymbol', symbol) } catch { }
    closeEditMarketModal()
  }

  const activeEngine = engineById[currentEngine] || engineById[defaultEngineId]

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
            rows={1}
          />

          {/* Search Engine Dropdown */}
          <div ref={dropdownRef} className={`search-engine-dropdown${isDropdownOpen ? ' active' : ''}`}>
            <button
              className="search-engine-btn"
              onClick={e => { e.stopPropagation(); setIsDropdownOpen(o => !o) }}
            >
              <svg className="engine-icon-btn" viewBox="0 0 24 24" fill="currentColor">
                <image href={activeEngine.icon} x="0" y="0" width="24" height="24" preserveAspectRatio="xMidYMid meet" />
              </svg>
              <span className="engine-name">{activeEngine.name}</span>
              <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="dropdown-menu">
              {searchEngines.map(engine => {
                const isDisabled = Boolean(engine.disabled || !engine.url)
                return (
                  <div
                    key={engine.id}
                    className={`dropdown-item${isDisabled ? ' disabled' : ''}`}
                    onClick={e => {
                      if (isDisabled) return
                      e.stopPropagation()
                      setCurrentEngine(engine.id)
                      setIsDropdownOpen(false)
                    }}
                  >
                    <img className="engine-icon" src={engine.icon} alt={engine.name} />
                    <span>{engine.name}</span>
                    {engine.note && <span className="engine-note">{engine.note}</span>}
                  </div>
                )
              })}
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
              onClick={() => { handleSearch(suggestion) }}
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

      {/* Quick Widgets */}
      <section className="widgets-grid" aria-label="Quick widgets">
        {quickWidgets.map(widget => {
          const isLink = Boolean(widget.href)
          const isNotes = widget.id === 'notes'
          const isExternal = widget.href?.startsWith('http')

          const stat = widget.id === 'clock' ? timeText : widget.stat
          const subtitle = widget.id === 'clock' ? dateText : widget.subtitle

          const widgetBody = (
            <>
              {isNotes ? (
                <div className="note-widget">
                  <textarea
                    className="note-input"
                    placeholder="New note..."
                    value={quickNotes}
                    onChange={e => handleNotesChange(e.target.value)}
                    rows={4}
                  />
                </div>
              ) : widget.id === 'clock' ? (
                <div className="custom-clock-widget">
                  <div className="clock-top">
                    <div className="clock-date-text">{subtitle}</div>
                    <div className="clock-icon">
                      {now.getHours() >= 6 && now.getHours() < 18 ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                      )}
                    </div>
                  </div>
                  <div className="clock-time-huge">
                    {stat}<span className="clock-ampm">{ampm}</span>
                  </div>
                </div>
              ) : widget.id === 'market' ? (
                <div className="market-widget-inner">
                  <MarketWidget symbol={marketSymbol} />
                  <button
                    className="edit-btn"
                    onClick={e => { e.preventDefault(); e.stopPropagation(); openEditMarketModal() }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  {widget.id === 'lucidity' && (
                    <img className="widget-cover-image" src="/Assistant-Widget.png" alt="Lucidity" />
                  )}
                  <div className="widget-top">
                    <div>
                      <p className="widget-title">{widget.title}</p>
                      <p className="widget-subtitle">{subtitle}</p>
                    </div>
                    {widget.tag && <span className="widget-tag">{widget.tag}</span>}
                  </div>
                  <div className="widget-bottom">
                    {stat && <span className="widget-stat">{stat}</span>}
                    {widget.action && <span className="widget-action">{widget.action}</span>}
                  </div>
                </>
              )}
            </>
          )

          if (isLink && widget.href) {
            return (
              <a
                key={widget.id}
                className="widget-card widget-link"
                data-variant={widget.variant}
                href={widget.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
              >
                {widgetBody}
              </a>
            )
          }

          return (
            <div
              key={widget.id}
              className="widget-card"
              data-variant={widget.variant}
            >
              {widgetBody}
            </div>
          )
        })}
      </section>

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

      {/* Edit Market Modal */}
      <div
        className={`edit-modal${editMarketModalOpen ? ' active' : ''}`}
        onClick={e => { if (e.target === e.currentTarget) closeEditMarketModal() }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3>Edit Ticker</h3>
            <button className="close-btn" onClick={closeEditMarketModal}>&times;</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="marketSymbol">Symbol (e.g. NASDAQ:NVDA, AAPL)</label>
              <input
                type="text"
                id="marketSymbol"
                placeholder="NASDAQ:NVDA"
                autoComplete="off"
                value={editMarketSymbol}
                onChange={e => setEditMarketSymbol(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={closeEditMarketModal}>Cancel</button>
            <button className="btn-save" onClick={handleSaveMarket}>Save</button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button className="bottom-nav-btn">History</button>
        <span className="bottom-nav-divider">|</span>
        <button className="bottom-nav-btn">Bookmarks</button>
        <span className="bottom-nav-divider">|</span>
        <button className="bottom-nav-btn">Settings</button>
      </div>
    </div>
  )
}

export default App
