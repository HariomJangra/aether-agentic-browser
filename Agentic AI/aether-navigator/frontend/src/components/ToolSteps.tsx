import { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '../api';

type ToolMsg = Extract<ChatMessage, { role: 'tool_call' }> | Extract<ChatMessage, { role: 'tool_result' }>;

interface ToolStepProps {
  steps: ToolMsg[];
  isStreaming?: boolean;
}

function formatArgs(args: Record<string, unknown>): string {
  return Object.entries(args)
    .map(([k, v]) => `${k}: ${typeof v === 'string' ? v : JSON.stringify(v)}`)
    .join('\n');
}

const toolLabels: Record<string, string> = {
  snapshot: 'Snapshot',
  list_tabs: 'List Tabs',
  list_tab: 'List Tabs',
  switch_tab: 'Switch Tab',
  navigate: 'Navigate',
  interact: 'Interact',
  click: 'Click',
  type: 'Type',
  scroll: 'Scroll',
  wait: 'Wait',
  search: 'Search',
  extract: 'Extract',
};

// Wrench/tool SVG icon
function WrenchIcon() {
  return (
    <svg className="ts-tool-icon" viewBox="0 0 16 16" fill="none">
      <path
        d="M13.5 2.5a3 3 0 00-4.1 2.8l-5.8 5.8a1.5 1.5 0 002.1 2.1l5.8-5.8a3 3 0 002.8-4.1l-1.8 1.8-1.4-1.4 1.8-1.8z"
        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ToolSteps({ steps, isStreaming = true }: ToolStepProps) {
  // Open by default
  const [panelOpen, setPanelOpen] = useState(true);
  const [openStep, setOpenStep] = useState<number | null>(null);
  // Track which step indices are "new" (for entry animation)
  const prevCountRef = useRef(0);
  const [animatingIndices, setAnimatingIndices] = useState<Set<number>>(new Set());

  if (steps.length === 0) return null;

  // Build call/result pairs
  const pairs: {
    call: Extract<ChatMessage, { role: 'tool_call' }>;
    result?: Extract<ChatMessage, { role: 'tool_result' }>;
  }[] = [];

  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    if (s.role === 'tool_call') {
      const next = steps[i + 1];
      if (next && next.role === 'tool_result') {
        pairs.push({ call: s, result: next });
        i++;
      } else {
        pairs.push({ call: s });
      }
    }
  }

  const lastPair = pairs[pairs.length - 1];
  const isRunning = isStreaming && lastPair && !lastPair.result;

  // Animate new steps as they appear
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const prev = prevCountRef.current;
    if (pairs.length > prev) {
      const newIndices = new Set<number>();
      for (let i = prev; i < pairs.length; i++) newIndices.add(i);
      setAnimatingIndices(newIndices);
      prevCountRef.current = pairs.length;
      // Remove animation class after it plays
      const t = setTimeout(() => setAnimatingIndices(new Set()), 400);
      return () => clearTimeout(t);
    }
  }, [pairs.length]);

  const toggleStep = (i: number) => {
    setOpenStep(prev => (prev === i ? null : i));
  };

  const headerLabel = isRunning
    ? `Running ${toolLabels[lastPair.call.name] ?? lastPair.call.name}…`
    : `Ran ${pairs.length} action${pairs.length > 1 ? 's' : ''}`;

  return (
    <div className="ts-container">
      {/* ── Header row ── */}
      <button
        className={`ts-header ${panelOpen ? 'ts-header--open' : ''}`}
        onClick={() => { setPanelOpen(p => !p); setOpenStep(null); }}
      >
        <div className="ts-header-left">
          {isRunning ? (
            <span className="ts-spinner" />
          ) : (
            <WrenchIcon />
          )}
          <span className="ts-label">{headerLabel}</span>
        </div>
        <svg className={`ts-chevron ${panelOpen ? 'ts-chevron--up' : ''}`} viewBox="0 0 14 14" fill="none">
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── Step list ── */}
      {panelOpen && (
        <div className="ts-list">
          {pairs.map((pair, i) => {
            const name = toolLabels[pair.call.name] ?? pair.call.name;
            const done = !!pair.result;
            const isOpen = openStep === i;
            const isNew = animatingIndices.has(i);
            const argsText = formatArgs(pair.call.args);
            const preview = pair.result?.preview ?? '';
            const isTabTool = pair.call.name === 'list_tabs' || pair.call.name === 'list_tab' || pair.call.name === 'switch_tab';

            return (
              <div key={i} className={`ts-step ${isNew ? 'ts-step--enter' : ''}`}>
                <button
                  className={`ts-step-row ${isOpen ? 'ts-step-row--open' : ''}`}
                  onClick={() => toggleStep(i)}
                >
                  <div className="ts-step-left">
                    <span className={`ts-dot ${done ? 'ts-dot--done' : (isStreaming ? 'ts-dot--running' : 'ts-dot--error')}`} />
                    <span className="ts-step-name">{name}</span>
                  </div>
                  <svg
                    className={`ts-mini-chevron ${isOpen ? 'ts-mini-chevron--up' : ''}`}
                    viewBox="0 0 12 12" fill="none"
                  >
                    <path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="ts-step-detail">
                    {argsText && (
                      <div className="ts-detail-block">
                        <span className="ts-detail-label">Input</span>
                        <pre className="ts-detail-pre">{argsText}</pre>
                      </div>
                    )}
                    {preview && (
                      <div className="ts-detail-block">
                        <span className="ts-detail-label">Result</span>
                        {isTabTool ? (
                          <pre className="ts-detail-pre">{preview}</pre>
                        ) : (
                          <p className="ts-detail-result">{preview}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
