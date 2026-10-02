# Architecture Notes

## Purpose

This lab explores reusable building blocks for a browser-based real-time multiplayer game platform: authoritative server state, reconnectable sessions, fairness-sensitive randomization, settlement logic, rendering, and game-integrity controls.

## Proposed topology

```text
Browser Client (React + PixiJS)
          |
        WSS/API
          |
    Gateway / Auth
          |
 Room Session Service <----> Redis
          |
 Authoritative Game Engine
          |
 PostgreSQL ---- Match History / Audit Events
          |
 Integrity / Anti-Abuse Pipeline
```

## Design choices

- **Authoritative server:** clients submit intentions; the server owns legal state transitions.
- **Ordered actions:** each match carries an action sequence to reject stale or replayed actions.
- **Redis:** presence, reconnect snapshots, ephemeral room/session state, distributed coordination.
- **PostgreSQL:** durable match history, account events, integrity signals, audit records.
- **WebSocket:** low-latency bidirectional room events; REST remains useful for account/admin workflows.
- **CSPRNG:** Node's `crypto.randomInt` backs a Fisher-Yates randomization module.
- **Integrity controls:** device/account correlation, co-play frequency, asymmetric behavior, value transfer, and investigation workflows are kept separate from the authoritative game engine.

## Scaling direction

A production implementation would shard by room ID so all actions for one room are serialized through one logical owner. Horizontal WebSocket gateways can route events to the room owner through Redis Streams, NATS, Kafka, or an equivalent event layer.

## Scope

This is a portfolio lab showing architecture reasoning and working prototypes. It does not claim prior ownership of a large-scale live multiplayer platform.
