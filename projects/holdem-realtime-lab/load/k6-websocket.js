import ws from "k6/ws";
import { check } from "k6";

export const options = {
  scenarios: {
    table_fanout: {
      executor: "constant-vus",
      vus: 100,
      duration: "30s"
    }
  }
};

export default function () {
  const url = __ENV.WS_URL || "ws://localhost:8080";

  const response = ws.connect(url, {}, socket => {
    socket.on("open", () => {
      socket.send(JSON.stringify({ type: "START_HAND" }));
    });

    socket.on("message", message => {
      const event = JSON.parse(message);
      if (event.type === "HAND_STARTED") {
        socket.send(JSON.stringify({ type: "ADVANCE_STREET" }));
      }
    });

    socket.setTimeout(() => socket.close(), 3000);
  });

  check(response, {
    "websocket upgraded": r => r && r.status === 101
  });
}
