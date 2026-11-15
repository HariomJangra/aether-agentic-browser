import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ChatMessage } from '../api';
import EmptyState from './EmptyState';
import ToolSteps from './ToolSteps';
import AudioPlayer from './gnani/AudioPlayer';

interface ChatAreaProps {
  messages: ChatMessage[];
  isEmpty: boolean;
  isStreaming?: boolean;
}

export default function ChatArea({ messages, isEmpty, isStreaming }: ChatAreaProps) {
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (areaRef.current) {
      areaRef.current.scrollTop = areaRef.current.scrollHeight;
    }
  }, [messages]);

  if (isEmpty) {
    return (
      <main className="chat-area" ref={areaRef}>
        <EmptyState />
      </main>
    );
  }

  // Group messages: consecutive tool_call/tool_result are grouped together
  const groups: (ChatMessage | ChatMessage[])[] = [];
  let toolBuffer: ChatMessage[] = [];

  const flushTools = () => {
    if (toolBuffer.length > 0) {
      groups.push([...toolBuffer]);
      toolBuffer = [];
    }
  };

  for (const msg of messages) {
    if (msg.role === 'tool_call' || msg.role === 'tool_result') {
      toolBuffer.push(msg);
    } else {
      flushTools();
      groups.push(msg);
    }
  }
  flushTools();

  return (
    <main className="chat-area" ref={areaRef}>
      <div className="messages">
        {groups.map((group, i) => {
          if (Array.isArray(group)) {
            const isLastGroup = i === groups.length - 1;
            return <ToolSteps key={i} steps={group as (Extract<ChatMessage, { role: 'tool_call' }> | Extract<ChatMessage, { role: 'tool_result' }>)[]} isStreaming={isLastGroup && isStreaming} />;
          }

          const msg = group;

          if (msg.role === 'user') {
            return (
              <div className="msg user" key={i}>
                <div className="msg-bubble user-bubble">
                  {msg.originalVoiceText && (
                    <div className="gnani-voice-tag">
                      <span className="gnani-badge">
                        🎤 {msg.detectedLang || 'Voice'}
                      </span>
                      <span className="gnani-spoken-quote">"{msg.originalVoiceText}"</span>
                    </div>
                  )}
                  <div className="gnani-task-line">{msg.text}</div>
                </div>
              </div>
            );
          }

          if (msg.role === 'ai') {
            return (
              <div className="msg ai" key={i}>
                {msg.text ? (
                  <div
                    className={`ai-prose${msg.error ? ' ai-prose--error' : msg.stopped ? ' ai-prose--stopped' : ''}`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>

                    {/* Gnani Evon 3.3 Translated Response */}
                    {msg.nativeText && msg.nativeText !== msg.text && (
                      <div className="gnani-translated-box">
                        <div className="gnani-translated-header">
                          <span className="gnani-badge">
                            🗣️ {msg.nativeLanguage || 'Original Language'}
                          </span>
                        </div>
                        <div className="gnani-translated-body">
                          {msg.nativeText}
                        </div>
                      </div>
                    )}

                    {/* Gnani Timber 2.5 Audio Player */}
                    {msg.audioUrl && (
                      <AudioPlayer
                        audioUrl={msg.audioUrl}
                        autoPlay={true}
                        language={msg.nativeLanguage}
                      />
                    )}
                  </div>
                ) : (
                  <TypingDots />
                )}
              </div>
            );
          }

          return null;
        })}
      </div>
    </main>
  );
}

function TypingDots() {
  return (
    <span className="typing-dots">
      <span /><span /><span />
    </span>
  );
}
