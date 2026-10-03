# Real-Time Multiplayer Systems Lab

A TypeScript/Node.js engineering lab for reusable real-time multiplayer platform components.

Rather than model one specific commercial game, the project focuses on technical problems shared by browser-based table and turn-based games:

- server-authoritative state
- ordered WebSocket events
- reconnectable sessions
- fairness-sensitive randomization
- layered contribution / settlement logic
- Canvas/WebGL rendering
- rule-based strategy agents
- collusion / abuse-risk signals
- persistent match history
- concurrency and reconnect testing

## Implemented

- TypeScript + Node.js WebSocket server
- explicit match-phase state machine
- action-sequence tracking
- CSPRNG-backed Fisher-Yates deck randomization using Node `crypto.randomInt`
- generic layered contribution-pool settlement
- React observer client
- PixiJS Canvas/WebGL multiplayer surface
- Redis reconnect-session store prototype
- PostgreSQL match-history and integrity-event schema
- explainable pair-level collusion-risk scoring
- explainable rule-based strategy agent
- load-test plan for room fan-out and reconnect storms
- automated tests for deterministic logic

## Architecture

```text
React + PixiJS Client
        |
      WebSocket
        |
Authoritative Game Engine
        |
   Redis Session State
        |
PostgreSQL Event History
        |
Integrity / Anti-Abuse Layer
```

## Why I built it

My earlier work spans JavaScript/Python game development, Node.js/web development, fraud/abuse monitoring, security logging, and data-driven risk controls. This project brings those areas together in a domain-neutral real-time platform prototype.

The design is intentionally generic so the same primitives can be adapted to different multiplayer table or turn-based games.

## Scope

This is a portfolio prototype using synthetic assumptions. It is not presented as a production-certified gaming engine or evidence of operating a large-scale live multiplayer service.
