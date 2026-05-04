// Stable, per-tab session identifier — generated once when this JS module
// is first loaded (i.e. once per WebView2 instance / browser tab).
const SESSION_ID: string = crypto.randomUUID();

export type SSEEvent =
  | { type: 'tool_call'; name: string; args: Record<string, unknown> }
  | { type: 'tool_result'; name: string; preview: string }
  | { type: 'ai_message'; content: string }
  | { type: 'stopped'; content: string }
  | { type: 'error'; content: string }
  | { type: 'done' };

export type ChatMessage =
  | { role: 'user'; text: string }
  | { role: 'ai'; text: string; error?: boolean; stopped?: boolean }
  | { role: 'tool_call'; name: string; args: Record<string, unknown> }
  | { role: 'tool_result'; name: string; preview: string };

export type ActiveTabInfo = {
  title: string;
  type: 'page';
  url: string;
};

export async function streamChat(
  message: string,
  onEvent: (evt: SSEEvent) => void,
  signal?: AbortSignal,
) {
  const resp = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id: SESSION_ID }),
    signal,
  });

  if (!resp.ok) throw new Error(`Server error ${resp.status}`);

  const reader = resp.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop()!;

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const raw = line.slice(6).trim();
      if (!raw) continue;
      try {
        onEvent(JSON.parse(raw));
      } catch { /* skip malformed */ }
    }
  }
}

export async function stopTask() {
  await fetch('/stop', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: SESSION_ID }),
  });
}

export async function clearMemory() {
  await fetch('/clear', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: SESSION_ID }),
  });
}

export async function fetchStatus(): Promise<number> {
  const r = await fetch(`/status?session_id=${SESSION_ID}`);
  const d = await r.json();
  return d.messages ?? 0;
}

export async function fetchContext(): Promise<{ role: string; content: string }[]> {
  const r = await fetch(`/context?session_id=${SESSION_ID}`);
  const d = await r.json();
  return d.messages ?? [];
}

export async function fetchActiveTab(): Promise<ActiveTabInfo | null> {
  const r = await fetch('/cdp/active');
  if (!r.ok) return null;
  const d = (await r.json()) as { active?: unknown };
  if (!d || typeof d !== 'object') return null;
  const a = (d as any).active;
  if (!a || typeof a !== 'object') return null;
  const title = (a as any).title;
  const url = (a as any).url;
  const type = (a as any).type;
  if (type !== 'page') return null;
  return {
    title: typeof title === 'string' ? title : '',
    type: 'page',
    url: typeof url === 'string' ? url : '',
  };
}
