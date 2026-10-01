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
- React observer client for live WebSocket table state
- explainable pair-level collusion-risk prototype with tests
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

Server:

```bash
cd projects/holdem-realtime-lab
npm install
npm run dev
```

React client:

```bash
cd projects/holdem-realtime-lab/client
npm install
npm run dev
```

The client connects to `ws://localhost:8080` by default. You can override it with `?ws=<url>`.

Example messages:

```json
{"type":"START_HAND"}
{"type":"ADVANCE_STREET"}
```

## Next implementation steps

1. legal-action validation and betting-round closure
2. hand evaluator
3. reconnect/session recovery with Redis
4. append-only hand-history persistence implementation
5. load test for table fan-out and reconnect storms
6. multi-account/device correlation expansion
7. hand-level behavioral features for collusion analysis
8. authenticated admin investigation workflow

## Important scope note

This is a learning and portfolio prototype. It is not presented as a production-certified poker engine, an RNG certification artifact, or evidence of prior live Hold'em operations.
