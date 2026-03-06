import { type FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './EchloenSearch.css'

type TabId = 'assistant' | 'links' | 'images' | 'videos'

interface SourceItem {
  title: string
  url: string
  body: string
}

interface ImageItem {
  title: string
  image: string
  thumbnail: string
}

interface VideoItem {
  title: string
  url: string
  description: string
  publisher: string
  duration: string
  thumbnail: string
}

interface SearchResult {
  query: string
  answer: string
  sources: SourceItem[]
  images: ImageItem[]
  videos: VideoItem[]
}

const API_BASE = 'http://localhost:8000'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'assistant', label: 'Assistant' },
  { id: 'images', label: 'Images' },
  { id: 'videos', label: 'Videos' },
  { id: 'links', label: 'Sources' },
]

function getInitialQuery(): string {
  const params = new URLSearchParams(window.location.search)
  return params.get('q')?.trim() ?? ''
}

export default function EchloenSearch() {
  const [activeTab, setActiveTab] = useState<TabId>('assistant')
  const [followUpQuery, setFollowUpQuery] = useState('')
  const [resultQuery, setResultQuery] = useState<string>(() => getInitialQuery())
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SearchResult | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const fetchResults = useCallback(async (query: string) => {
    if (!query) return
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        signal: controller.signal,
      })
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const data: SearchResult = await res.json()
      setResult(data)
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchResults(resultQuery)
  }, [resultQuery, fetchResults])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsVisible(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    document.title = resultQuery ? `${resultQuery} • Echloen` : 'Echloen'
  }, [resultQuery])

  const showLinks = activeTab === 'assistant' || activeTab === 'links'
  const showImages = activeTab === 'assistant' || activeTab === 'images'
  const showVideos = activeTab === 'assistant' || activeTab === 'videos'

  const animatePage = () => {
    setIsVisible(false)
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsVisible(true)
      })
    })
  }

  const handleFollowUpSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextQuery = followUpQuery.trim()
    if (!nextQuery) return

    setResultQuery(nextQuery)
    setFollowUpQuery('')

    const params = new URLSearchParams(window.location.search)
    params.set('q', nextQuery)
    const nextUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', nextUrl)
    animatePage()
  }

  return (
    <div className="echloen-page">
      <div className={`echloen-shell${isVisible ? ' is-visible' : ''}`}>
        <header className="echloen-header animate-in" style={{ animationDelay: '30ms' }}>
          <p className="echloen-brand">Echloen</p>
          <nav className="echloen-tabs" aria-label="Result tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`tab-btn${tab.id === activeTab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        <main className="echloen-layout">
          <section className="echloen-main">
            <div className="query-pill animate-in" style={{ animationDelay: '90ms' }}>
              <p>{resultQuery || 'Ask something...'}</p>
            </div>

            {loading && (
              <section className="panel animate-in" style={{ animationDelay: '130ms' }}>
                <div className="panel-head"><h2>Searching...</h2></div>
                <p className="answer-lead">Fetching results from the web...</p>
              </section>
            )}

            {error && (
              <section className="panel animate-in" style={{ animationDelay: '130ms' }}>
                <div className="panel-head"><h2>Error</h2></div>
                <p className="answer-lead">{error}</p>
              </section>
            )}

            {!loading && !error && result && (
              <>
                {showLinks && result.sources.length > 0 && (
                  <section className="panel animate-in" style={{ animationDelay: '130ms' }}>
                    <div className="panel-head">
                      <h2>Sources</h2>
                      <span>{result.sources.length} references</span>
                    </div>
                    <div className="source-grid">
                      {(activeTab === 'assistant' ? result.sources.slice(0, 4) : result.sources).map((item, index) => (
                        <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="source-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                          <p className="source-title">{item.title}</p>
                          <div className="source-meta">
                            <span className="source-favicon" />
                            <span>{new URL(item.url).hostname} · {index + 1}</span>
                          </div>
                        </a>
                      ))}
                      {activeTab === 'assistant' && result.sources.length > 4 && (
                        <button type="button" className="source-card source-more" onClick={() => setActiveTab('links')}>
                          <div className="source-more-icons">
                            <span className="source-more-icon" />
                            <span className="source-more-icon" />
                          </div>
                          <span>View {result.sources.length - 4} more</span>
                        </button>
                      )}
                    </div>
                  </section>
                )}

                {activeTab === 'assistant' && (
                  <section className="panel answer-panel animate-in" style={{ animationDelay: '170ms' }}>
                    <div className="panel-head">
                      <h2>Answer</h2>
                    </div>
                    <div className="answer-block">
                      <ReactMarkdown>{result.answer}</ReactMarkdown>
                    </div>
                  </section>
                )}

                {activeTab === 'links' && (
                  <section className="panel links-panel animate-in" style={{ animationDelay: '170ms' }}>
                    <div className="panel-head">
                      <h2>Sources</h2>
                    </div>
                    <ul className="links-list">
                      {result.sources.map(item => (
                        <li key={item.url}>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <p>{item.title}</p>
                            <span>{new URL(item.url).hostname}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {activeTab === 'images' && (
                  <section className="panel animate-in" style={{ animationDelay: '170ms' }}>
                    <div className="panel-head">
                      <h2>Image results</h2>
                    </div>
                    <div className="image-grid wide">
                      {result.images.map(image => (
                        <a key={image.image} href={image.image} target="_blank" rel="noopener noreferrer" className="image-card">
                          <img src={image.thumbnail} alt={image.title} className="image-thumb" loading="lazy" />
                          <div className="image-copy">
                            <p>{image.title}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                )}

                {activeTab === 'videos' && (
                  <section className="panel animate-in" style={{ animationDelay: '170ms' }}>
                    <div className="panel-head">
                      <h2>Video results</h2>
                    </div>
                    <ul className="video-list wide">
                      {result.videos.map(video => (
                        <li key={video.url} className="video-item">
                          <a href={video.url} target="_blank" rel="noopener noreferrer" className="video-link">
                            <div className="video-thumb">
                              {video.thumbnail ? (
                                <img src={video.thumbnail} alt={video.title} loading="lazy" />
                              ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="12" r="9" />
                                  <path d="m10 8 6 4-6 4V8z" fill="currentColor" stroke="none" />
                                </svg>
                              )}
                            </div>
                            <div className="video-copy">
                              <p>{video.title}</p>
                              <span>{video.publisher}{video.duration ? ` · ${video.duration}` : ''}</span>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            )}

            <div className="follow-up-wrapper">
              <form className="follow-up animate-in" style={{ animationDelay: '300ms' }} onSubmit={handleFollowUpSubmit}>
                <button type="button" className="follow-up-icon" aria-label="Add context">
                  +
                </button>
                <input
                  type="text"
                  value={followUpQuery}
                  onChange={event => setFollowUpQuery(event.target.value)}
                  placeholder="Ask follow-up..."
                  aria-label="Ask follow-up"
                />
                <button
                  type="submit"
                  className="follow-up-submit"
                  aria-label="Send follow-up"
                  disabled={!followUpQuery.trim()}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14" />
                    <path d="m6 11 6-6 6 6" />
                  </svg>
                </button>
              </form>
            </div>
          </section>

          {activeTab === 'assistant' && result && !loading && (
            <aside className="echloen-side">
              {showImages && result.images.length > 0 && (
                <section className="panel animate-in" style={{ animationDelay: '210ms' }}>
                  <div className="panel-head compact">
                    <h2>Images</h2>
                    <button type="button" onClick={() => setActiveTab('images')}>View all</button>
                  </div>
                  <div className="image-grid">
                    {result.images.slice(0, 4).map(image => (
                      <a key={image.image} href={image.image} target="_blank" rel="noopener noreferrer" className="image-card compact">
                        <img src={image.thumbnail} alt={image.title} className="image-thumb" loading="lazy" />
                        <div className="image-copy">
                          <p>{image.title}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {showVideos && result.videos.length > 0 && (
                <section className="panel animate-in" style={{ animationDelay: '250ms' }}>
                  <div className="panel-head compact">
                    <h2>Videos</h2>
                    <button type="button" onClick={() => setActiveTab('videos')}>View all</button>
                  </div>
                  <ul className="video-list">
                    {result.videos.slice(0, 3).map(video => (
                      <li key={video.url} className="video-item">
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="video-link">
                          <div className="video-thumb">
                            {video.thumbnail ? (
                              <img src={video.thumbnail} alt={video.title} loading="lazy" />
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="9" />
                                <path d="m10 8 6 4-6 4V8z" fill="currentColor" stroke="none" />
                              </svg>
                            )}
                          </div>
                          <div className="video-copy">
                            <p>{video.title}</p>
                            <span>{video.publisher}{video.duration ? ` · ${video.duration}` : ''}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </aside>
          )}
        </main>
      </div>
    </div>
  )
}
