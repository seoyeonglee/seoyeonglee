# WebSocket Load-Test Plan

The target is not simply "can open a WebSocket." The useful questions are fan-out latency, room ownership, reconnect behavior, ordering, backpressure, and resource pressure.

## Scenarios

1. 100 rooms × 8 participants
2. 1,000 concurrent sockets with steady action traffic
3. reconnect storm after a gateway restart
4. slow-client/backpressure behavior
5. stale or replayed action sequence rejection
6. room-owner failover
7. Redis degradation and recovery

## Metrics

- p50 / p95 / p99 action-to-broadcast latency
- event ordering violations
- dropped or duplicated messages
- reconnect completion time
- memory per socket
- event-loop lag
- Redis round-trip latency
- PostgreSQL append latency
- CPU utilization by active room

## Reporting principle

Measured results should always include test environment, payload size, concurrency assumptions, and limitations rather than claim a generic "large-scale" capability.
