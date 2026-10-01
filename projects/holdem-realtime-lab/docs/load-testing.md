# WebSocket Load-Test Plan

The production requirement is not merely "can open a WebSocket." The relevant questions are fan-out latency, table ownership, reconnect behavior, ordering, and resource pressure.

## Scenarios

1. 100 tables × 9 seated players
2. 1,000 concurrent sockets with steady action traffic
3. reconnect storm after a gateway restart
4. slow-client/backpressure behavior
5. stale or replayed action sequence rejection
6. table-owner failover
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
- CPU utilization by active table

## Acceptance philosophy

A portfolio benchmark should report measured results, environment, payload size and concurrency assumptions rather than claim a generic "large-scale" capability. Production targets should be defined with the team after expected CCU and table distribution are known.
