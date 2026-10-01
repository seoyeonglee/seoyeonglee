CREATE TABLE hand_history (
  hand_id UUID PRIMARY KEY,
  table_id TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  rng_version TEXT NOT NULL,
  event_count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE hand_events (
  hand_id UUID NOT NULL REFERENCES hand_history(hand_id),
  seq BIGINT NOT NULL,
  event_type TEXT NOT NULL,
  actor_id TEXT,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (hand_id, seq)
);

CREATE INDEX hand_events_actor_idx ON hand_events(actor_id, created_at);

CREATE TABLE risk_signals (
  signal_id UUID PRIMARY KEY,
  hand_id UUID REFERENCES hand_history(hand_id),
  account_id TEXT NOT NULL,
  signal_type TEXT NOT NULL,
  score NUMERIC(6,2) NOT NULL,
  evidence JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
