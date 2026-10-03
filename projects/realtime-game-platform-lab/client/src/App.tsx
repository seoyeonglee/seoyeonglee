import { useEffect, useMemo, useRef, useState } from "react";
import { PixiTable } from "./PixiTable";

type MatchState = {
  matchId: string;
  phase: string;
  pool: number;
  actionSeq: number;
};

const EMPTY: MatchState = {
  matchId: "—",
  phase: "WAITING",
  pool: 0,
  actionSeq: 0
};

export function App() {
  const socketRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [state, setState] = useState<MatchState>(EMPTY);
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
      if (message.state) setState(message.state);
    });

    return () => socket.close();
  }, [wsUrl]);

  function send(type: "START_MATCH" | "ADVANCE_PHASE") {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type }));
    }
  }

  return (
    <main>
      <header>
        <p className="eyebrow">REAL-TIME GAME PLATFORM LAB</p>
        <h1>Authoritative multiplayer state</h1>
        <p className="muted">
          React + PixiJS client for observing WebSocket-driven room state.
        </p>
      </header>

      <section className="grid">
        <article><span className="label">connection</span><strong>{connected ? "CONNECTED" : "DISCONNECTED"}</strong></article>
        <article><span className="label">phase</span><strong>{state.phase}</strong></article>
        <article><span className="label">pool</span><strong>{state.pool}</strong></article>
        <article><span className="label">action seq</span><strong>{state.actionSeq}</strong></article>
      </section>

      <section className="panel">
        <span className="label">PixiJS Canvas/WebGL multiplayer surface</span>
        <PixiTable />
      </section>

      <section className="actions">
        <button onClick={() => send("START_MATCH")} disabled={!connected}>Start match</button>
        <button onClick={() => send("ADVANCE_PHASE")} disabled={!connected}>Advance phase</button>
      </section>

      <section className="panel">
        <span className="label">match id</span>
        <code>{state.matchId}</code>
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