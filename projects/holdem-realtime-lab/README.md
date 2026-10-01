# Hold'em Real-Time Server Lab

A focused TypeScript/Node.js prototype created to demonstrate how I approach a browser-based real-time Hold'em architecture.

The project deliberately targets two areas I have **not previously owned as a production specialization**: authoritative multiplayer game-server state and CSPRNG-backed card shuffling. It complements my prior JavaScript/Python game-development work, Node.js/web development experience, and fraud/abuse monitoring background.

## What is implemented

- WebSocket server skeleton with server-authoritative state
- explicit Hold'em street state machine
- action sequence tracking
- CSPRNG-backed Fisher-Yates shuffle using Node `crypto.randomInt`
- 52-card uniqueness/preservation tests
- production architecture notes for Redis + PostgreSQL
- clear separation between game engine and fraud/anti-abuse controls

## Why this design

For a real-money-adjacent or regulated card-game product, gameplay correctness is only one layer. The system also needs replayable hand history, account controls, investigation tooling, fairness evidence, and abuse detection.

That makes the architecture a natural intersection of my prior experience in:

- JavaScript/Python game development
- Node.js and web application development
- React/Vue front-end work
- PostgreSQL/MySQL
- fraud/abuse monitoring
- security logging and rule-based detection

## Run

```bash
cd projects/holdem-realtime-lab
npm install
npm run dev
```

Connect a WebSocket client to `ws://localhost:8080`.

Example messages:

```json
{"type":"START_HAND"}
{"type":"ADVANCE_STREET"}
```

## Next implementation steps

1. legal-action validation and betting-round closure
2. side-pot calculation
3. hand evaluator
4. reconnect/session recovery with Redis
5. PostgreSQL hand-history schema and append-only audit events
6. React table client
7. load test for table fan-out and reconnect storms
8. collusion / multi-account risk feature prototype

## Important scope note

This is a learning and portfolio prototype. It is not presented as a production-certified poker engine, an RNG certification artifact, or evidence of prior live Hold'em operations.
