import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { WebSocketServer } from "ws";
import { createDeck, secureShuffle } from "./shuffle.js";
import { TableState, advanceStreet } from "./stateMachine.js";

const server = createServer();
const wss = new WebSocketServer({ server });

let state: TableState = {
  handId: randomUUID(),
  street: "WAITING",
  pot: 0,
  actionSeq: 0,
  players: []
};

function broadcast(payload: unknown) {
  const body = JSON.stringify(payload);
  for (const client of wss.clients) {
    if (client.readyState === client.OPEN) client.send(body);
  }
}

wss.on("connection", socket => {
  socket.send(JSON.stringify({ type: "STATE", state }));

  socket.on("message", raw => {
    const msg = JSON.parse(String(raw));

    if (msg.type === "START_HAND") {
      const deck = secureShuffle(createDeck());
      state = {
        ...state,
        handId: randomUUID(),
        street: "PREFLOP",
        pot: 0,
        actionSeq: state.actionSeq + 1
      };

      // For the lab, only a commitment hash surrogate is exposed instead of the deck.
      // Production design should use auditable server-side seed handling and independent certification.
      broadcast({ type: "HAND_STARTED", state, cardsRemaining: deck.length });
      return;
    }

    if (msg.type === "ADVANCE_STREET") {
      state = advanceStreet(state);
      broadcast({ type: "STATE", state });
    }
  });
});

server.listen(8080, () => {
  console.log("Hold'em real-time lab listening on ws://localhost:8080");
});
