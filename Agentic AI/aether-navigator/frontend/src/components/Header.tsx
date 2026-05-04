import { useState, useEffect, useRef } from 'react';
import { fetchContext } from '../api';

interface HeaderProps {
  contextCount: number;
  onClear: () => void;
}

interface ContextMessage {
  role: string;
  content: string;
}

export default function Header({ contextCount, onClear }: HeaderProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [ctxMessages, setCtxMessages] = useState<ContextMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!popoverOpen) return;
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [popoverOpen]);

  const handleBadgeClick = async () => {
    if (popoverOpen) { setPopoverOpen(false); return; }
    setPopoverOpen(true);
    setLoading(true);
    try {
      const msgs = await fetchContext();
      setCtxMessages(msgs);
    } catch {
      setCtxMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const roleLabel: Record<string, string> = {
    system: 'System',
    user: 'You',
    ai: 'Agent',
  };

  return (
    <header className="header">
      <div className="logo-wrap">
        <img className="logo-icon" src="/aether-logo.png" alt="Aether logo" />
        <span className="logo-text">Aether Navigator</span>
      </div>

      <div className="header-right">
        {/* Context badge + popover */}
        <div className="ctx-wrap" ref={popoverRef}>
          <button
            className={`context-badge ${popoverOpen ? 'context-badge--active' : ''}`}
            title="View context memory"
            onClick={handleBadgeClick}
          >
            {contextCount} in context
          </button>

          {popoverOpen && (
            <div className="ctx-popover">
              <div className="ctx-popover-header">
                <span className="ctx-popover-title">Context Memory</span>
                <span className="ctx-popover-count">{ctxMessages.length} messages</span>
              </div>

              <div className="ctx-popover-body">
                {loading ? (
                  <div className="ctx-loading">
                    <span className="ctx-spinner" />
                    <span>Loading…</span>
                  </div>
                ) : ctxMessages.length === 0 ? (
                  <p className="ctx-empty">No messages in context yet.</p>
                ) : (
                  ctxMessages.map((m, i) => (
                    <div key={i} className={`ctx-msg ctx-msg--${m.role}`}>
                      <span className="ctx-msg-role">{roleLabel[m.role] ?? m.role}</span>
                      <p className="ctx-msg-content">{m.content || '(empty)'}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Clear button */}
        <button className="clear-btn" onClick={onClear} title="Clear conversation">
          <svg viewBox="0 0 20 20" fill="none">
            <path
              d="M4 6h12M8 6V4h4v2M7 6v9a1 1 0 001 1h4a1 1 0 001-1V6H7z"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
