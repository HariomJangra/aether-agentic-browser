import { useRef, useEffect, useState } from 'react';

interface InputBarProps {
  onSend: (text: string) => void;
  onStop: () => void;
  streaming: boolean;
}

export default function InputBar({ onSend, onStop, streaming }: InputBarProps) {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [hasText, setHasText] = useState(false);
  const summarizePrompt = 'Summarize the current webpage';

  useEffect(() => {
    textRef.current?.focus();
  }, [streaming]);

  const autoGrow = () => {
    const el = textRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 140) + 'px';
    setHasText(el.value.trim().length > 0);
  };

  const handleSend = () => {
    const text = textRef.current?.value.trim();
    if (!text || streaming) return;
    onSend(text);
    if (textRef.current) {
      textRef.current.value = '';
      textRef.current.style.height = 'auto';
      setHasText(false);
    }
  };

  const handleSummarize = () => {
    if (streaming) return;
    onSend(summarizePrompt);
    if (textRef.current) {
      textRef.current.value = '';
      textRef.current.style.height = 'auto';
      setHasText(false);
    }
  };

  return (
    <footer className="input-bar">
      <div className="quick-actions">
        <button
          className="quick-action-btn"
          onClick={handleSummarize}
          disabled={streaming}
          title="Summarize the current webpage"
        >
          Summarize
        </button>
      </div>
      <div className="input-wrap">
        <textarea
          ref={textRef}
          className="prompt-input"
          placeholder="Ask anything…"
          rows={1}
          autoComplete="off"
          spellCheck={false}
          onInput={autoGrow}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        {streaming ? (
          <button className="icon-btn stop-btn" onClick={onStop} title="Stop task">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <rect x="5" y="5" width="10" height="10" rx="2" />
            </svg>
          </button>
        ) : (
          <button
            className={`icon-btn send-btn ${hasText ? 'send-btn--active' : ''}`}
            onClick={handleSend}
            title="Send"
            disabled={!hasText}
          >
            <svg viewBox="0 0 20 20" fill="none">
              <path
                d="M10 3v14M3 10l7-7 7 7"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </footer>
  );
}
