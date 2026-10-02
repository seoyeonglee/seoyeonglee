CREATE TABLE match_history (
  match_id UUID PRIMARY KEY,
  room_id TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  randomization_version TEXT NOT NULL,
  event_count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE match_events (
  match_id UUID NOT NULL REFERENCES match_history(match_id),
  seq BIGINT NOT NULL,
  event_type TEXT NOT NULL,
  actor_id TEXT,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (match_id, seq)
);

CREATE INDEX match_events_actor_idx ON match_events(actor_id, created_at);

CREATE TABLE integrity_signals (
  signal_id UUID PRIMARY KEY,
  match_id UUID REFERENCES match_history(match_id),
  account_id TEXT NOT NULL,
  signal_type TEXT NOT NULL,
  score NUMERIC(6,2) NOT NULL,
  evidence JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
