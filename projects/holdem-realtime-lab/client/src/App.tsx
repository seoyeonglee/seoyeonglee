import { PixiTable } from "./PixiTable";
import { useEffect, useMemo, useRef, useState } from "react";

type TableState = {
  handId: string;
  street: string;
  pot: number;
  actionSeq: number;
  players: Array<{
    id: string;
    stack: number;
    committed: number;
    folded: boolean;
    allIn: boolean;
  }>;
};

const EMPTY: TableState = {
  handId: "—",
  street: "WAITING",
  pot: 0,
  actionSeq: 0,
  players: []
};

export function App() {
  const socketRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [state, setState] = useState<TableState>(EMPTY);
  const [events, setEvents] = useState<string[]>([]);

  const wsUrl = useMemo(
    () => new URLSearchParams(location.search).get("ws") || "ws://localhost:8080",
    []
  );

  useEffect(() => {
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.addEventListener("open", () => setConnected(true));
    socket.addEventListener("close", () => setConnected(false));
    socket.addEventListener("message", event => {
      const message = JSON.parse(String(event.data));
      setEvents(prev => [message.type, ...prev].slice(0, 8));

      if (message.state) {
        setState(message.state);
      }
    });

    return () => socket.close();
  }, [wsUrl]);

  function send(type: "START_HAND" | "ADVANCE_STREET") {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type }));
    }
  }

  return (
    <main>
      <header>
        <p className="eyebrow">REAL-TIME HOLD'EM LAB</p>
        <h1>Authoritative table state</h1>
        <p className="muted">
          Thin React client for observing the WebSocket game-state prototype.
        </p>
      </header>

      <section className="grid">
        <article>
          <span className="label">connection</span>
          <strong>{connected ? "CONNECTED" : "DISCONNECTED"}</strong>
        </article>
        <article>
          <span className="label">street</span>
          <strong>{state.street}</strong>
        </article>
        <article>
          <span className="label">pot</span>
          <strong>{state.pot}</strong>
        </article>
        <article>
          <span className="label">action seq</span>
          <strong>{state.actionSeq}</strong>
        </article>
      </section>

      <section className="panel">
        <span className="label">PixiJS Canvas/WebGL table prototype</span>
        <PixiTable />
      </section>

      <section className="actions">
        <button onClick={() => send("START_HAND")} disabled={!connected}>
          Start hand
        </button>
        <button onClick={() => send("ADVANCE_STREET")} disabled={!connected}>
          Advance street
        </button>
      </section>

      <section className="panel">
        <span className="label">hand id</span>
        <code>{state.handId}</code>
      </section>

      <section className="panel">
        <span className="label">recent events</span>
        <ol>
          {events.length === 0 ? <li>Waiting for server events…</li> :
            events.map((event, i) => <li key={event + i}>{event}</li>)}
        </ol>
      </section>
    </main>
  );
}