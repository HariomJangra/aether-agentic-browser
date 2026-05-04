import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChatMessage, SSEEvent } from './api';
import { streamChat, stopTask, clearMemory, fetchStatus } from './api';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import InputBar from './components/InputBar';
import './App.css';

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [contextCount, setContextCount] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    fetchStatus().then(setContextCount).catch(() => { });
  }, []);

  const handleSend = useCallback(async (text: string) => {
    if (streaming) return;

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setStreaming(true);

    // Placeholder AI message (empty = shows typing dots)
    setMessages((prev) => [...prev, { role: 'ai', text: '' }]);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    let aiText = '';
    let aiStarted = false;

    const onEvent = (evt: SSEEvent) => {
      switch (evt.type) {
        case 'tool_call':
          setMessages((prev) => {
            // Insert tool event before the AI placeholder
            const copy = [...prev];
            copy.splice(copy.length - 1, 0, { role: 'tool_call', name: evt.name, args: evt.args });
            return copy;
          });
          break;

        case 'tool_result':
          setMessages((prev) => {
            const copy = [...prev];
            copy.splice(copy.length - 1, 0, { role: 'tool_result', name: evt.name, preview: evt.preview });
            return copy;
          });
          break;

        case 'ai_message':
          aiStarted = true;
          aiText = evt.content;
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: 'ai', text: aiText };
            return copy;
          });
          break;

        case 'stopped':
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: 'ai', text: evt.content, stopped: true };
            return copy;
          });
          break;

        case 'error':
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: 'ai', text: evt.content, error: true };
            return copy;
          });
          break;

        case 'done':
          if (!aiStarted) {
            setMessages((prev) => {
              const copy = [...prev];
              copy[copy.length - 1] = { role: 'ai', text: '(No response)' };
              return copy;
            });
          }
          fetchStatus().then(setContextCount).catch(() => { });
          break;
      }
    };

    try {
      await streamChat(text, onEvent, ctrl.signal);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last && last.role === 'ai' && !last.text) {
            copy[copy.length - 1] = { role: 'ai', text: 'Task stopped by user.', stopped: true };
          }
          return copy;
        });
        return;
      }
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: 'ai',
          text: 'Could not reach the agent server. Make sure server.py is running on port 5050.',
          error: true,
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }, [streaming, messages.length]);

  const handleStop = useCallback(async () => {
    stopTask().catch(() => { });
    abortRef.current?.abort();
  }, []);

  const handleClear = useCallback(async () => {
    await clearMemory().catch(() => { });
    setMessages([]);
    setContextCount(1);
  }, []);

  return (
    <div className="panel">
      <Header contextCount={contextCount} onClear={handleClear} />
      <ChatArea messages={messages} isEmpty={messages.length === 0} isStreaming={streaming} />
      <InputBar onSend={handleSend} onStop={handleStop} streaming={streaming} />
    </div>
  );
}
