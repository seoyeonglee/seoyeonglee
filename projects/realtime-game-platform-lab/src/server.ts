import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { WebSocket, WebSocketServer } from "ws";
import { createDeck, secureShuffle } from "./deck.js";
import { MatchState, advancePhase } from "./stateMachine.js";

const server = createServer();
const wss = new WebSocketServer({ server });

let state: MatchState = {
  matchId: randomUUID(),
  phase: "WAITING",
  pool: 0,
  actionSeq: 0,
  players: []
};

function broadcast(payload: unknown) {
  const body = JSON.stringify(payload);
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) client.send(body);
  }
}

wss.on("connection", socket => {
  socket.send(JSON.stringify({ type: "STATE", state }));

  socket.on("message", raw => {
    const msg = JSON.parse(String(raw));

    if (msg.type === "START_MATCH") {
      const deck = secureShuffle(createDeck());
      state = {
        ...state,
        matchId: randomUUID(),
        phase: "ROUND_1",
        pool: 0,
        actionSeq: state.actionSeq + 1
      };
      broadcast({ type: "MATCH_STARTED", state, itemsRemaining: deck.length });
      return;
    }

    if (msg.type === "ADVANCE_PHASE") {
      state = advancePhase(state);
      broadcast({ type: "STATE", state });
    }
  });
});

server.listen(8080, () => {
  console.log("Real-time game platform lab listening on ws://localhost:8080");
});
