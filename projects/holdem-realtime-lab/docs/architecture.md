# Architecture Notes

## Purpose

This lab demonstrates how I would approach the two areas that are newest to me for a production Hold'em platform: real-time multiplayer server state and fairness-aware card shuffling.

## Proposed production topology

```text
Browser (React/Vue)
      |
   WSS/API
      |
Gateway / Auth
      |
Table Session Service  <----> Redis
      |
Authoritative Game Engine
      |
PostgreSQL ---- Hand History / Audit Log
      |
Risk Signals / Anti-Abuse Pipeline
```

## Design choices

- **Authoritative server:** clients submit intentions; the server owns legal state transitions.
- **Ordered actions:** each table state carries an action sequence to reject stale/replayed actions.
- **Redis:** table presence, ephemeral session state, distributed locks, reconnect tokens.
- **PostgreSQL:** durable hand history, player/account events, sanctions, audit records.
- **WebSocket:** low-latency bidirectional table events; REST remains appropriate for account/admin workflows.
- **CSPRNG:** Node's `crypto.randomInt` backs the Fisher-Yates shuffle prototype.
- **Fairness:** production readiness would additionally require documented seed lifecycle, entropy monitoring, tamper-resistant audit logging and independent RNG certification where applicable.
- **Abuse controls:** device/account correlation, action-timing features, repeated co-play graphs, unusual betting coordination, and investigation workflows should be separated from the authoritative game engine.

## Scaling direction

A production implementation would shard by table ID so that all actions for one table are serialized through one logical owner. Horizontal WebSocket gateways can route events to the table owner through Redis Streams, NATS, Kafka, or an equivalent event layer. Reconnect uses a durable hand/event sequence rather than trusting client state.

## What this prototype does not claim

This repository does not claim previous live-service Hold'em operation, certified RNG implementation, or large-scale concurrent-user benchmarks. It is a focused technical lab showing architecture reasoning and a working TypeScript/WebSocket/CSPRNG starting point.
